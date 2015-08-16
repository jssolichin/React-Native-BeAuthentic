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
			<View style={[styles.eachDetail, this.props.style, 
				this.props.padding != undefined && {padding: this.props.padding},
				this.props.column && styles.column,
				this.props.invert && styles.invert
			]}>
				{this.props.children}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	eachDetail: {
		padding: 5,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		flexDirection: 'row',
	},
	column: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	invert: {
		backgroundColor: '#000',
		color: '#fff',
	}
});

module.exports = EachDetail;
