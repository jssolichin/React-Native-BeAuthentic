//TODO: 
// - Add cover image

'use strict';

var React = require('react-native');

var {
	StyleSheet,
	TouchableOpacity,
	Image,
	View,
	ActionSheetIOS,
	AlertIOS,
} = React;
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var { Icon, } = require('react-native-icons');

var globalStyles = require("../globalStyles.js");

var standardButtons = [
  'Cancel',
  'Edit Name',
  'Edit Bio',
  'Log Out',
];
var cancelIndex = 0;
var destructiveIndex = 3;

var CollectionSettingsButton = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function() {
	  var query = new Parse.Query(Parse.User)
			.equalTo('objectId', this.props.data.userId);

		return {
			users: query,
		};
	},
	getInitialState: function (){
		return {
		
		}	
	},
	componentDidUpdate: function(){
		if(this.data.users[0]){
			if(!this.state.ranOnceName && (this.data.users[0].name == undefined || this.data.users[0].name.length < 1)) {
				this.setState({ranOnceName: true})
				this._createPrompt('name', 'Add');
			}
			if(!this.state.ranOnceBio && (this.data.users[0].bio == undefined || this.data.users[0].bio.length < 1)) {
				this.setState({ranOnceBio: true})
				this._createPrompt('bio', 'Add');
			}
		}
	},
	_logOut: function () {
		Parse.User.logOut();	
	},
	_createPrompt: function (type, verb){

		var currentInfo = this.props.data ? this.data.users[0][type] : '';

		AlertIOS.prompt(
		  verb + ' your ' + type,
		  "",
		  [
		      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: verb, onPress: desc => {
				  this._handleModifyType(type, desc);
			  }},
		  ],
		  'plain-text',
		  currentInfo
		);
	},
	_handleModifyType: function (type, description){

		var changes = {};
		changes[type] = description;

		var object = new Parse.User
		object.objectId = this.props.data.userId;

		var mutator = ParseReact.Mutation.Set(object, changes);

		console.log(mutator, object, changes)
		mutator.dispatch()
			.then((error,data) => {
				console.log(error, data)
			})

	},
	_handleClick: function (){
		var options = standardButtons;

		ActionSheetIOS.showActionSheetWithOptions({
		      options: options,
			  cancelButtonIndex: cancelIndex,
			  destructiveButtonIndex: destructiveIndex,
		    },
		 (buttonIndex) => {
			 switch (buttonIndex){
				 case 0: 
					 break;
				 case 1:
					this._createPrompt('name', 'Change');
					 break;
				 case 2:
					this._createPrompt('bio', 'Change');
					 break;
				 case 3:
					this._logOut();
					 break;
			 }
	   });	
	},
	render() {
		return (
			<View style={[globalStyles.flexRow, styles.container]}>
				<TouchableOpacity onPress={this._handleClick}>
					<Icon
						name='ion|ios-gear-outline'
						size={35}
						color='#fff'
						style={styles.icon}
					/>
				</TouchableOpacity>
			</View>
		)
	}
}); 

var styles = StyleSheet.create({
	container: {
		marginRight: 5,	
	},
	icon: {
		width: 35, 	
		height: 35, 
	},
});

module.exports = CollectionSettingsButton;
