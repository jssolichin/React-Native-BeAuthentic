var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var EachDetail = require('./EachDetail.js');
var globalHelpers = require("../globalHelpers.js");
var globalStyles = require("../globalStyles.js");

var CommentItem = React.createClass({
	_goToProfilePage: function() {
		if(this.props.visibleUser) {
			var ProfilePage = require('../ProfilePage/homepage.js');
			console.log(this.props.data.createdBy.username, this.props.data.createdBy)
			this.props.toRoute({
				  name: this.props.data.createdBy.username, 
				  component: ProfilePage,
				  data: {
					  userId: this.props.data.createdBy.objectId,
					  toRoute: this.props.toRoute,
				  },
				});
		}
  	},
	_addToCollection: function () {
		var AddButton = require('./AddButton.js');
		return 	<AddButton data={this.props.data}/>;
	},
	_goToSinglePage: function() {
		var SinglePageView = require('../SinglePage/view.js');
	    this.props.toRoute({
		      name: "A Heart Question",
			  component: SinglePageView,
			  rightCorner: this._addToCollection,
			  data: {
				  question: this.props.data.question,
				  toRoute: this.props.toRoute,
			  },
		    });
  	},
	render: function() {
		var username = null,
			question = null;

		if(!this.props.hideUsername)
			username = (
				<Text style={styles.eachDetailLead} onPress={this._goToProfilePage} >
					{globalHelpers.censorship(this.props.data.createdBy.username, this.props.visibleUser)}
				</Text>
			)

		if(!this.props.hideQuestion)
			question = (
				<Text style={[globalStyles.text.heading]} onPress={this._goToSinglePage} >
					{this.props.data.question.text}
				</Text>
			)

		return (
			<EachDetail>
				{username}
				<View>
				{question}
				<Text style={[styles.eachDetailText, this.props.hideUsername && {width: width-40}]} numberOfLines={2}>
					{globalHelpers.censorship(this.props.data.text, this.props.visibleComment)}
					</Text>
				</View>
			</EachDetail>
		);
	}
});


var styles = StyleSheet.create({
	eachDetailLead: {
		width: width*.3 - 15, 
		fontWeight: 'bold',
	},
	eachDetailText: {
		width: width*.7 - 20, 
	},
});

module.exports = CommentItem;
