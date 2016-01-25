'use strict';

var React = require('react-native');

var {
	StyleSheet,
	TouchableHighlight,
	Image,
	View,
} = React;
var { Icon, } = require('react-native-icons');

var BackButton = React.createClass({
	render() {
		return (
			<Icon
				name='ion|ios-arrow-back'
				size={35}
				color='#bbb'
				style={styles.icon}
			/>
		)
	}
}); 

var styles = StyleSheet.create({
	icon: {
		width: 35, 	
		height: 35, 
	},
});

module.exports = BackButton;
