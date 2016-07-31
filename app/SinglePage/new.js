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

var ListItem = require('../components/ListItem.js');
var EachDetail = require('../components/EachDetail.js');
var Button = require('../components/Button.js');
var CommentList = require('../components/CommentList.js');
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

var WriteBox = React.createClass({
	getInitialState: function (){
		return {
			publicallyShared: this.props.publicallyShared,
		};
	},
	componentDidUpdate(prevProps, prevState){
		if(this.props.publicallyShared != prevProps.publicallyShared)
		this.setState({publicallyShared: this.props.publicallyShared})	
	},
	_onSubmitResponse: function (){
		this.props.onSubmit({
			text: this.state.text,
			publicallyShared: this.state.publicallyShared,
		});
	},
	_confirmMakePublic: function (value){
		if(value){ //make sure we're turning private to public only

			AlertIOS.alert(
				'You can\'t undo this',
				'Our community is built on trust. Because you will see private answers that can\'t be unread, you can\'t make private your public responses',
				[
					{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
					{text: 'OK', onPress: () => {
							this.setState({publicallyShared: value});
							this._onSubmitResponse();
						}
					},
				],
			);

		}
	},
	render: function (){
		return (
			<View style={globalStyles.centerContent}>
				<TextInput
					style={styles.inputText}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
					defaultValue={this.props.defaultValue}
					placeholder="What are your thoughts?"
					placeholderTextColor='#aaa'
					multiline={true}
				/>


			<View style={styles.submitSettings}>
				
				<View style={styles.privacyToggle} >

					{(this.state.text && this.state.text.length > 0) || (this.props.defaultValue && this.props.defaultValue.length > 0) ?  
						<View style={[styles.submitSettings, styles.privacyToggle]}>
							<Text style={[globalStyles.text.color.white]}>
								Share Publically
							</Text>
							<SwitchIOS
								disabled={this.state.publicallyShared}
								onValueChange={(value) => {
									this._confirmMakePublic(value);
								}}
								style={{marginLeft: 10}}
								value={this.state.publicallyShared} />
						</View>
					: null}

				</View>

				<TouchableHighlight onPress={this._onSubmitResponse} underlayColor='#fff'>
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
	mixins: [ParseReact.Mixin],
	observe: function (){

		var query = new Parse.Query('Answer')
				.equalTo('question', this.props.data.question);
				
		return {
			answer: query,
		}	

	},
	getInitialState: function (){
		return {
			comments: comments
		};
	},
	componentDidUpdate: function(){

	},
	_saveCommentToServer: function (comment){
		var that = this;


		var postACL = new Parse.ACL(Parse.User.current());
		postACL.setPublicReadAccess(true);

		var batch = new ParseReact.Mutation.Batch();

		var whoToNotify = [this.props.data.question.createdBy];
		whoToNotify = whoToNotify.concat(this.data.answer.map(function(answer){return answer.createdBy}))

		whoToNotify.forEach((user) => {
			if(Parse.User.current().id != user.objectId) {
				var activityCreator = ParseReact.Mutation.Create('Activity', {
					ACL: postACL,
					fromUser: Parse.User.current(),
					toUser: user,
					question: this.props.data.question,
					type: 'comment',
				});

				activityCreator.dispatch({batch: batch});
			}
		})

		var answerCreator;
		var existingAnswer = this.data.answer.filter(function(d){return d.createdBy.objectId == Parse.User.current().id});

		if(existingAnswer.length > 0){
			answerCreator = ParseReact.Mutation.Set(existingAnswer[0], {
				text: comment.text,
				publicallyShared: comment.publicallyShared,
			})
		}
		else {
			answerCreator = ParseReact.Mutation.Create('Answer', {
				ACL: postACL,
				question: this.props.data.question,
				createdBy: Parse.User.current(),
				text: comment.text,
				publicallyShared: comment.publicallyShared,
			});
		}

		answerCreator.dispatch({batch: batch});

		batch.dispatch()
			.then((a,b,c)=>{
				AlertIOS.alert( "Answer Saved!");
				that.refreshQueries('answer');
			})
	},
	render: function() {

		var defaultValue, publicallyShared;
		if(this.data.answer){
			var currentUserExistingAnswer = this.data.answer.filter(function(d){return d.createdBy.objectId == Parse.User.current().id});
			if(currentUserExistingAnswer.length >0){
				defaultValue = currentUserExistingAnswer[0].text;
				publicallyShared = currentUserExistingAnswer[0].publicallyShared;
			}
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
					<WriteBox defaultValue={defaultValue} publicallyShared={publicallyShared} onSubmit={this._saveCommentToServer}/>
				</EachDetail>

				<EachDetail heading={true} style={[{flexDirection: 'column'}]}>
					<Text style={globalStyles.text.roman}>Responses from others</Text>
					<Text style={globalStyles.text.eachDetailSubheading}>To see other's hearts, you must share yours</Text>
				</EachDetail>

				<CommentList toRoute={this.props.toRoute} query={{answersByQuestionId: this.props.data.question.objectId}} hideQuestion={true} visibleUser={publicallyShared} visibleComment={publicallyShared} />

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
