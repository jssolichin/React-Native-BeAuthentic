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
var Parse = require('parse').Parse;

var EachDetail = require('../components/EachDetail.js');
var TagInput = require('../components/TagInput.js');
var Button = require('../components/Button.js');
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
		};
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
				<TagInput />
				<TouchableHighlight onPress={this.props.callback} underlayColor='#fff'>
					<View>
						<Button text="Share My Heart" invert={true} />
					</View>
				</TouchableHighlight>
			</View>
		)
	}
});
var HeartPage = React.createClass({
	getInitialState: function (){
		return {
			writingComment: false,
		};
	},
	_onStartResponse: function (){
		this.setState({
			writingComment: true,	
		});	
	},
	_onSubmitResponse: function (){
		var Question = new Parse.Object.extend('Question');
		var Tag = new Parse.Object.extend('Tag');

		var tag1 = new Tag(); tag1.set('text', 'hello');
		var tag2 = new Tag(); tag2.set('text', 'love');
		var tag3 = new Tag(); tag3.set('text', 'helxlo');

		var question = new Question();
		question.set('text', 'hello world');
		question.set('tag_1', tag1);
		question.set('tag_2', tag2);
		question.set('tag_3', tag3);

		question.save({
			success: (question) => {
				AlertIOS.alert('submitted');
			}	
		})
	},
	render: function() {
		if(this.state.writingComment == false)
			response = <WritePrompt callback={this._onStartResponse}/>
		else 
			response = <WriteBox callback={this._onSubmitResponse}/>

		return (
			<ScrollView style={styles.container} contentInset={{bottom: 80,}} automaticallyAdjustContentInsets={false}>
				<EachDetail column={true} padding={20} invert={true}>
					{response}
				</EachDetail>

				<EachDetail column={true} style={{marginTop: 30, alignItems: 'flex-start'}}>
					<Text style={globalStyles.text.weight.bold}>QUESTIONS HEARTED</Text>
					<Text style={[globalStyles.text.size.small, {marginTop: 2, color: '#999'}]}>You should ask IRL, or share your heart and answer!</Text>
				</EachDetail>
				{topQuestions.slice(0,5).map(
					(question) => 
					<EachDetail >
						<Text style={{width: width-20}}>{question}</Text>	
					</EachDetail>
					)
				}
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
