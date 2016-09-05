'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
} = React;
var { Icon, } = require('react-native-icons');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var LinearGradient = require('react-native-linear-gradient');
var PushNotification = require('react-native-push-notification');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var globalStyles = require("../globalStyles.js");
var EachTag = require('../components/EachTag.js');
var Button = require('../components/Button.js');
var Banner = require('../components/Banner.js');
var LargeItem = require('../components/LargeItem.js');

var NewHome = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function() {
		var Activity = Parse.Object.extend("Activity");
		var query = new Parse.Query(Activity);
		var lastQuotd = query
			.equalTo('type', 'quotd')
			.descending("updatedAt")
			.limit(1)
			.include(['question', 'question.createdBy', 'question.tag_1', 'question.tag_2', 'question.tag_3']);

	  return {
			lastQuotd: lastQuotd 
		  };
	},
	getInitialState: function (){
		return {
		}
	},
	componentDidMount: function(){
		this._getShowPushRequest();	
	},
	_getShowPushRequest: function (){
		var User = Parse.Object.extend("User");
		var query = new Parse.Query(User)
		.equalTo('objectId', Parse.User.current().id);

		query.first({
			success: (user)	=> {
				var showPushRequest = user.get('showPushRequest');
				if(showPushRequest == undefined)
					showPushRequest = true;

				this.setState({showPushRequest: showPushRequest});
			},
			error: (error) => {
				console.log(error)	
			}
		})
	
	},
	_closeHint: function (){

		var object = new Parse.User
		object.objectId = Parse.User.current().id;

		var mutator = ParseReact.Mutation.Set(object, {showPushRequest: false});

		mutator.dispatch()
			.then((error,data) => {
				console.log(error, data)
			})

		this.setState({'showPushRequest': false});
	},
	_requestPermissions: function (){
		PushNotification.requestPermissions();
		this._closeHint();
	},
	_addNewQuestion: function (){
		this.props.changeTab('heart');
	},
	render: function() {
		var lastQuotdData;
		if(this.data.lastQuotd[0])
			lastQuotdData = this.data.lastQuotd[0].question;

		return (
			<ScrollView 
				automaticallyAdjustContentInsets={false}
				contentInset={{bottom: 50}}
				style={styles.container}
				>

		  {this.state.showPushRequest ? 
			  <Banner 
				  title='Learn About Yourself Everyday' 
				  body='Sometimes life gets too busy and we forget the most important things. We can remind you to answer the question of the day to help you continually learn about yourself. ' 
				  onPress={this._closeHint}> 
					<TouchableOpacity onPress={this._requestPermissions}>
						<Button text="Turn On Notifications" style={{marginTop: 20}} />
					</TouchableOpacity>
			  </Banner>
				  : null
		  }

				<LargeItem data={lastQuotdData} toRoute={this.props.toRoute} emitter={this.props.emitter}/>

				{lastQuotdData ?
				<View style={styles.actionContainer}>
					<TouchableOpacity onPress={this._addNewQuestion} style={styles.actionItem}>
						<Button text="Ask a Question" noBorder={true}/>
					</TouchableOpacity>
				</View>
				: null }

	</ScrollView>
		);
	},

});

var imageHeight = height - height*0.33;
var styles = {
	container: {
		backgroundColor: '#fff',
	},
	actionContainer: {
		width: width - 50,
		margin: 25,
		marginLeft: 20,
		marginTop: -20,
	},
	actionItem: {
		marginTop: 5,	
	},

}

module.exports = NewHome;
