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
			<View style={[styles.eachDetail,
				this.props.padding != undefined && {padding: this.props.padding},
				this.props.column && styles.column,
				this.props.heading && {marginTop: 30, paddingBottom: 5,},
				this.props.invert && styles.invert,
				this.props.hideBorder && {borderBottomWidth: 0},
				this.props.subItem && {marginLeft: 20},
				this.props.style,
			]}>
				{this.props.children}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	eachDetail: {
		padding: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#979797',
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
	}
});

module.exports = EachDetail;
