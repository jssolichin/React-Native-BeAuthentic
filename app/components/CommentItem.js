var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
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
		return 	<AddButton emitter={this.props.emitter} data={this.props.data}/>;
	},
	_goToSinglePage: function() {
		var SinglePageView = require('../SinglePage/view.js');
	    this.props.toRoute({
		      name: "A Heart Question",
			  component: SinglePageView,
			  rightCorner: this._addToCollection,
			  passProps: {
				  emitter: this.props.emitter,
			  },
			  data: {
				  question: this.props.data.question,
				  toRoute: this.props.toRoute,
			  },
		    });
	},
	_navigateEverything: function (){
		if(this.props.hideUsername)	
			this._goToSinglePage();
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
			<TouchableOpacity onPress={this._navigateEverything}>
			<EachDetail>
				{username}
				<View>
				{question}
				<Text style={[styles.eachDetailText, this.props.hideUsername && {width: width-40}]} numberOfLines={2}>
					{globalHelpers.censorship(this.props.data.text, this.props.visibleComment)}
					</Text>
				</View>

				{this.props.showArrow ?
					<Text style={styles.buttonText}>›</Text>
					: null}

				</EachDetail>
			</TouchableOpacity>
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
	buttonText: {
		fontSize: 20,
		marginTop: 5,
		lineHeight: 15,
	    color: '#000',
	  },
});

module.exports = CommentItem;
