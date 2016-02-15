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
  'Change Name',
  'Change Description',
];
var cancelIndex = 0;

var CollectionSettingsButton = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function() {
	  return {
	  };
	},
	_createPrompt: function (type){

		AlertIOS.prompt(
		  'Change Collection ' + type,
		  "Enter a new " + type + " for the collection ",
		  [
		      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'Change', onPress: desc => {
				  this._handleModifyType(type, desc);
			  }},
		  ],
		  'plain-text',
		  this.props.data[type]
		);
	},
	_collectionSettings: function () {
		return <CollectionSettingsButton data={this.state.data} replaceRoute={this.props.replaceRoute} toRoute={this.props.toRoute}/>;
	},
	_handleRefreshPage: function (changes){
	
		var newData = {
			objectId: this.props.data.objectId,
			name: changes.name || this.props.data.name,
			description: changes.description || this.props.data.description,
		};

		this.setState({data: newData});

		//reload with new information
		var GridView = require("./GridView.js");

		this.props.replaceRoute({
		  name: newData.name,
		  component: GridView,
		  rightCorner: this._collectionSettings,
		  data: {
			  collection: this.props.data, 
			  toRoute: this.props.toRoute,
			  description: newData.description,
		  }
		});

	},
	_handleModifyType: function (type, description){

		var changes = {};
		changes[type] = description;

		var object = new Parse.Object('Collection')
		object.objectId = this.props.data.objectId;

		var mutator = ParseReact.Mutation.Set(object, changes);

		mutator.dispatch()
			.then((error,data) => {
				this._handleRefreshPage(changes);
			})

	},
	_handleAdd: function (){
		var options = standardButtons;

		ActionSheetIOS.showActionSheetWithOptions({
		      options: options,
		      cancelButtonIndex: cancelIndex,
		    },
		 (buttonIndex) => {
			 switch (buttonIndex){
				 case 0: 
					 break;
				 case 1:
					this._createPrompt('name');
					 break;
				 default:
					 this._createPrompt('description')
					 break;
			 }
	   });	
	},
	render() {
		return (
			<View style={[globalStyles.flexRow, styles.container]}>
				<TouchableOpacity onPress={this._handleAdd}>
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
