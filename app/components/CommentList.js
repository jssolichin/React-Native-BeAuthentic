var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var Spinner = require('react-native-spinkit');

var globalStyles = require("../globalStyles.js");
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

			query.equalTo('question', question)
				.notEqualTo('createdBy', Parse.User.current())
				.include('createdBy');
		}
				
		return {
			answer: query,
		}	

	},
	render: function() {

		var existingAnswer;

		if(this.data.answer){
			if(this.props.query.answersByQuestionId)
				existingAnswer = this.data.answer.filter(function(d){return d.createdBy ? d.createdBy.id.objectId !== Parse.User.current().id : false;});
			else 
				existingAnswer = this.data.answer;
		}

		return (
			<ScrollView
				automaticallyAdjustContentInsets={false}
				style={styles.container}
				>

				{existingAnswer ? 
					existingAnswer.length > 0 ?
						existingAnswer.map((answer, i) =>
									  //TODO: override visibleComment if comment is know 
										 <CommentItem 
											 key={i} 
											 data={answer} 
											 visibleUser={this.props.visibleUser} 
											 visibleComment={this.props.visibleComment} 
											 hideQuestion={this.props.hideQuestion} 
											 hideUsername={this.props.hideUsername}
											 toRoute={this.props.toRoute}
											 showArrow={this.props.showArrow}
										 />
										 ) 
						 :
						<View style={{padding: 20, paddingBottom: 0}}>
							<Text style={globalStyles.text.color.gray}>Looks like there's nothing here!</Text>
						</View>
				 : 
				<View style={[globalStyles.loadingSpinner]}>
					<Spinner isVisible={true} size={50} type='Arc' color='#000'/>
				</View>
			}

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
});

module.exports = CommentList;
