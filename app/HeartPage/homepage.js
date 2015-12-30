var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableHighlight,
	AlertIOS,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Parse = require('parse/react-native');

var EachDetail = require('../components/EachDetail.js');
var TagInput = require('../components/TagInput.js');
var Button = require('../components/Button.js');
var MiniItem = require('../components/MiniItem.js');
var globalStyles = require('../globalStyles.js');

var topQuestions = [
	"Given the choice of anyone in the world, whom would you want as a dinner guest?",
	"Would you like to be famous? In what way?",
	"Before making a telephone call, do you ever rehearse what you are going to say? Why?",
	"What would constitute a “perfect” day for you?",
	"When did you last sing to yourself? To someone else?",
	"If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
	"Do you have a secret hunch about how you will die?",
]

var PostSuccess = React.createClass({
	render: function (){
		return (
			<View style={globalStyles.centerContent}>
				<Text style={[globalStyles.text.center, styles.hintText]}>
					Thanks for submitting a question! We will let you know when people answer in the activity tab.
				</Text>
				<TouchableHighlight onPress={this.props.callback} underlayColor='#fff'>
					<View>
						<Button text="Ask Another Question" invert={true} />
					</View>
				</TouchableHighlight>
			</View>
		);
	}
});

var WritePrompt = React.createClass({
	render: function (){
		return (
			<View style={globalStyles.centerContent}>
				<Text style={[globalStyles.text.center, styles.hintText]}>
					Want a heart to heart?	
				</Text>
				<TouchableHighlight onPress={this.props.callback} underlayColor='#fff'>
					<View>
						<Button text="Ask a Question" invert={true} />
					</View>
				</TouchableHighlight>
			</View>
		);
	}
});

var WriteBox = React.createClass({
	getInitialState: function (){
		return {
			tags: []
		};
	},
	setTags: function (tags){
		this.setState({tags: tags});
	},
	_onSubmitResponse: function (){
		var that = this;

		var Tag = new Parse.Object.extend('Tag');
		var Question = new Parse.Object.extend('Question');

		var tagQuery = new Parse.Query('Tag');

		var question = new Question();

		var postACL = new Parse.ACL(Parse.User.current());
		postACL.setPublicReadAccess(true);
		question.setACL(postACL);

		question.set('text', this.state.text);

		var promises = [];
		this.state.tags.forEach((tag, i) => {
			promises.push(tagQuery.equalTo('text', tag.text).first());
		})
		Parse.Promise.when(promises).then(function(tag1,tag2,tag3){
			var tags = [tag1, tag2, tag3];

			tags.forEach(function(tag,i){
				if(tag)	{
					question.set('tag_'+(i+1), tag);
				}
				else {
					if(that.state.tags[i]){
						//tag doesnt exist yet so we need to make
						var theTag = new Tag(); 
						theTag.set('text', that.state.tags[i].text);

						question.set('tag_'+(i+1), theTag);
					}
				}

			})

			//save everything 
			question.save({
				success: (question) => {
					AlertIOS.alert('submitted');
					that.props.callback(true);
				}	
			})
		})

	},
	render: function (){
		return (
			<View style={globalStyles.centerContent}>
				<TextInput
					style={styles.inputText}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
					placeholder="Example: What are three verbs that describes you? Why?"
					placeholderTextColor='#aaa'
					multiline={true}
				/>
				<TagInput callback={this.setTags}/>
				<TouchableHighlight onPress={this._onSubmitResponse} underlayColor='#fff'>
					<View>
						<Button text="Ask this Question" invert={true} />
					</View>
				</TouchableHighlight>
			</View>
		)
	}
});
var HeartPage = React.createClass({
	getInitialState: function (){
		return {
			writingQuestion: false,
			postSuccess: false,
		};
	},
	_onStartResponse: function (){
		this.setState({
			writingQuestion: true,	
		});	
	},
	_onPostSuccess: function(){
		this.setState({
			postSuccess: true,	
		})	
	},
	_resetWriting: function(){
		this.setState({
			postSuccess: false,	
			writingQuestion: true,	
		})	
	},
	render: function() {
		var response;

		if(this.state.postSuccess){
			response = <PostSuccess callback={this._resetWriting}/>
		}
		else {
			if(this.state.writingQuestion == false)
				response = <WritePrompt callback={this._onStartResponse}/>
			else
				response = <WriteBox callback={this._onPostSuccess}/>
		}

		return (
			<ScrollView style={styles.container} contentInset={{bottom: 80,}} automaticallyAdjustContentInsets={false}>
				<EachDetail column={true} padding={20} invert={true}>
					{response}
				</EachDetail>

				<EachDetail heading={true} style={[{flexDirection: 'column'}]}>
					<Text style={globalStyles.text.roman}>Questions hearted</Text>
					<Text style={[globalStyles.text.size.small, {marginTop: 2, marginBottom: 5, color: '#999'}]}>You should ask IRL, or share your heart and answer!</Text>
				</EachDetail>

				<View style={globalStyles.flexRow}>
					{topQuestions.slice(0,5).map(
						(question) => 
						<MiniItem question={question} />
						)
					}
				</View>
			</ScrollView>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	hintText: {
		margin: 20,
		marginTop: 0,
		color: '#fff',
	},
	thanksText: {
		margin: 10,
		color: '#fff',
	},
	inputText: {
		width: width - 30,
		height: height*.2, 
		padding: 10,
		fontSize: 15,
		backgroundColor: '#fff',
		marginBottom: 20,
	}
});

module.exports = HeartPage;
