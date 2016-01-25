var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableHighlight,
	SwitchIOS,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var ListItem = require('../components/ListItem.js');
var EachDetail = require('../components/EachDetail.js');
var Button = require('../components/Button.js');
var CommentItem = require('../components/CommentItem.js');
var globalStyles = require('../globalStyles.js');

var rowData = {
	authorName: 'Jonathan',
	question: "What are three verbs that describes your life? Why?",
	tags: ["Ice Breaker", "Love", "Adventurous"],
};
var comments = [ 
	{
		name: "Jonathan",
		comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
	},
	{
		name: "Jonathan",
		comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
	}
];

var WritePrompt = React.createClass({
	render: function (){
		return (
			<View >
				<View style={[styles.hintText]}>

					<Text style={[globalStyles.text.center, styles.oneLine]}>
						Interested in how people respond?
					</Text>

					<Text style={[globalStyles.text.center, styles.oneLine]}>
					To read people's heart, you must first share yours. 
					</Text>

				</View>

					<TouchableHighlight onPress={this.props.callback} underlayColor='#fff'>
						<View>
							<Button text="Share My Heart" />
						</View>
					</TouchableHighlight>

				</View>
		);
	}
});

var WriteBox = React.createClass({
	getInitialState: function (){
		return {
			privateResponse: false,
		};
	},
	render: function (){
		return (
			<View style={globalStyles.centerContent}>
				<TextInput
					style={styles.inputText}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
					placeholder="What are your thoughts?"
					placeholderTextColor='#aaa'
					multiline={true}
				/>


					<View style={styles.submitSettings}>
						<View style={[styles.submitSettings, styles.privacyToggle]} >
				<Text style={[globalStyles.text.color.white]}>
					Share Publically
				</Text>
				<SwitchIOS
				  onValueChange={(value) => this.setState({privateResponse: value})}
				  style={{marginLeft: 10}}
				  value={this.state.privateResponse} />
		  </View>

				<TouchableHighlight onPress={this.props.callback} underlayColor='#fff'>
					<View>
						<Button text="Save" invert={true}/>
					</View>
				</TouchableHighlight>
	  </View>
			
			</View>
		)
	}
});

var SinglePage = React.createClass({
	getInitialState: function (){
		console.log(this.props.data)
		return {
			visible: false,
			writingComment: false,
			comments: comments
		};
	},
	_onStartResponse: function (){
		this.setState({
			writingComment: true,	
		});	
	},
	_onSubmitResponse: function (){
		this.setState({
			visible: true,	
		});	
	},
	render: function() {
		var response = undefined;
		if(this.state.visible)
			response = (
				<Text style={[globalStyles.text.center, styles.thanksText]}>
					Thanks for sharing!
				</Text>
			);
			else {
				if(this.state.writingComment == false)
					response = <WritePrompt callback={this._onStartResponse}/>
				else 
					response = <WriteBox callback={this._onSubmitResponse}/>
			}

			return (
				<ScrollView
					automaticallyAdjustContentInsets={false}
					contentInset={{bottom: 50}}
					style={styles.container}
					>

					<View style={{padding: 20, paddingBottom: 0, backgroundColor: '#000'}} >
						<Text style={[globalStyles.text.color.white, ]}>
							{this.props.data.question.text}
						</Text>
					</View>

					<EachDetail style={{paddingBottom: 20,}} invert={true}>
						<WriteBox callback={this._onSubmitResponse}/>
					</EachDetail>

					<EachDetail heading={true} style={[{flexDirection: 'column'}]}>
						<Text style={globalStyles.text.roman}>Responses from others</Text>
						<Text style={globalStyles.text.eachDetailSubheading}>To see other's hearts, you must share yours</Text>
					</EachDetail>

					{this.state.comments.map((comment, i) =>
						 <CommentItem key={i} visibleUser={this.state.visible} visibleComment={this.state.visible} data={comment} />
					 )}

			 </ScrollView>
			);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1, 
		marginBottom: -1, 
		backgroundColor: '#fff',
	},
	oneLine: {
	},
	hintText: {
		margin: 20,
		marginTop: 0,
	},
	thanksText: {
		margin: 10,
	},
	submitSettings: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: width - 40,
	},
	privacyToggle: {
		width: 100,	
	},
	inputText: {
		width: width - 40,
		height: height*.3, 
		padding: 10,
		fontSize: 15,
		marginBottom: 20,
		borderWidth: 1,
		backgroundColor: '#fff',
	},
	writeHint: {
		marginTop: 10,	
	}
});

module.exports = SinglePage;
