var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
} = React;

var globalStyles = require("../globalStyles.js");

var EachDetail = React.createClass({
	render: function() {
		return (
			<View style={[styles.button, this.props.style, this.props.invert && styles.invertButton]}>
				<Text style={this.props.invert && styles.invertText}>
					{this.props.text}
				</Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	button: {
		padding: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
	},
	invertButton: {
		borderColor: '#fff',
	},
	invertText: {
		color: '#fff',
	}
});

module.exports = EachDetail;
