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
	render: function() {
		var username = null;

		if(!this.props.hideUsername)
			username = (
				<Text style={styles.eachDetailLead}>
					{globalHelpers.censorship(this.props.data.name, this.props.visibleUser)}
				</Text>
			)

		return (
			<EachDetail>
				{username}
				<Text style={[styles.eachDetailText, this.props.hideUsername && {width: width-40}]} numberOfLines={2}>
					{globalHelpers.censorship(this.props.data.comment, this.props.visibleComment)}
				</Text>
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
		width: width*.7 - 10, 
	},
});

module.exports = CommentItem;
