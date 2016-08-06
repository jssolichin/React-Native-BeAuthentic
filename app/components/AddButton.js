//TODO: 
// - set up share settings
// - create a new collection button
// - create collection view with change description and add cover image

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
  'Add to New Collection',
];
var cancelIndex = 0;

var AddButton = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function() {
		var Collection = Parse.Object.extend("Collection");
		var query = new Parse.Query(Collection)
			.equalTo('createdBy', Parse.User.current());

	  return {
			collections: query 
		  };
	},
	getInitialState: function (){
		return {};
	},
	_handleCreateCollection: function (){
		var batch = new ParseReact.Mutation.Batch();

		var postACL = new Parse.ACL(Parse.User.current());
		postACL.setPublicReadAccess(true);

		ParseReact.Mutation.Create('Collection', {
			ACL: postACL,
			createdBy: Parse.User.current(),
			name: this.state.newCollectionTitle,
		})
		.dispatch()
		.then((newRow) => {
		 	ParseReact.Mutation.AddRelation(newRow, 'questions', this.props.data);
		});
	},
	_createCollectionPromptTitle: function (){
		AlertIOS.prompt(
		  'New Collection Title',
		  'Enter a name for the new collection',
		  [
		      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'Create', onPress: name => {
				  this.setState({newCollectionTitle: name})	 
				  this._handleCreateCollection();
			  }},
		    ],
		);
	},
	_handleAddToCollection: function (index){

		var object = this.data.collections[index - 2];

		var mutator = ParseReact.Mutation.AddRelation(object, 'questions', this.props.data);

		mutator.dispatch()
			.then((question) => {
				AlertIOS.alert('Added to Collection!')
			})

	},
	_handleAdd: function (){
		var options = standardButtons.concat(this.data.collections.map((collection) => collection.name))

		ActionSheetIOS.showActionSheetWithOptions({
		      options: options,
		      cancelButtonIndex: cancelIndex,
		    },
		 (buttonIndex) => {
			 switch (buttonIndex){
				 case 0: 
					 break;
				 case 1:
					this._createCollectionPromptTitle();
					 break;
				 default:
					 this._handleAddToCollection(buttonIndex)
					 break;
			 }
	   });	
	},
	_handleShare: function (){
		ActionSheetIOS.showShareActionSheetWithOptions({
		  subject: 'A great question from BeAuthentic',
		  message: this.props.data.text,
		},
		(error) => {
		  console.error(error);
		},
		(success, method) => {
		  if (success)
			  AlertIOS.alert(`Shared via ${method}`);
		  else
			  console.log('Not Shared');
		});	
	},
	render() {
		return (
			<View style={[globalStyles.flexRow, styles.container]}>
				<TouchableOpacity onPress={this._handleAdd}>
					<Icon
						name='ion|ios-plus-empty'
						size={35}
						color='#fff'
						style={styles.icon}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._handleShare}>
					<Icon
						name='ion|ios-upload-outline'
						size={30}
						color='#fff'
						style={styles.iconShare}
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
	iconShare: {
		marginTop: 3,
		width: 30,
		height: 30,
	}
});

module.exports = AddButton;
