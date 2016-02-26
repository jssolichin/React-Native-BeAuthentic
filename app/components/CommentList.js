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
	AlertIOS,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var CommentItem = require('../components/CommentItem.js');

var CommentList = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function (){

		var query = new Parse.Query('Answer')
			.include('questions');

		if(this.props.query.answersByUserId){
			var user = new Parse.User();
			user.id = this.props.query.answersByUserId;

			query.equalTo('createdBy', user);
		}

		if(this.props.query.answersByQuestionId){
			var Question = new Parse.Object.extend('Question');
			var question = new Question();
			question.id = this.props.query.answersByQuestionId;

			query.equalTo('question', question);
		}
				
		return {
			answer: query,
		}	

	},
	render: function() {

		var defaultValue, publicallyShared;
		if(this.data.answer){
			var existingAnswer = this.data.answer.filter(function(d){return d.createdBy.objectId == Parse.User.current().id});
			if(existingAnswer.length >0){
				defaultValue = existingAnswer[0].text;
				publicallyShared = existingAnswer[0].publicallyShared;
			}
		}

		return (
			<ScrollView
				automaticallyAdjustContentInsets={false}
				style={styles.container}
				>

				{this.data.answer.map((answer, i) =>
									  //TODO: make sure visibility is right
					 <CommentItem key={i} visibleUser={publicallyShared} visibleComment={publicallyShared} data={answer} hideUsername={this.props.hideUsername}/>
					 //<CommentItem key={i} hideUsername={true} visibleUser={this.state.visible} visibleComment={this.state.visible} data={comment} />
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

module.exports = CommentList;
