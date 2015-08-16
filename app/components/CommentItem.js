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

var globalStyles = require("../globalStyles.js");

var ListItem = React.createClass({
	render: function() {
		var hiddenComment = '';
		for(var i = 0; i < this.props.data.comment.length; i++)
			hiddenComment += '█';

		return (
			<EachDetail>
				<Text style={styles.eachDetailLead}>
					{this.props.visibleUser ? this.props.data.name : '█████'}
				</Text>
				<Text style={styles.eachDetailText} numberOfLines="3">
					{this.props.visibleComment ? this.props.data.comment : hiddenComment}
				</Text>
			</EachDetail>
		);
	}
});


var styles = StyleSheet.create({
	eachDetailLead: {
		width: width*.3 - 10, 
		fontWeight: 'bold',
	},
	eachDetailText: {
		width: width*.7 - 10, 
		fontSize: 12,
	},
});

module.exports = ListItem;
