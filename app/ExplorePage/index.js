'use strict';

var React = require('react-native');
var {
	StyleSheet,
	TabBarIOS,
	Text,
	View,
	StatusBarIOS,
} = React;
var Router = require('react-native-router');
var globalStyles = require("../globalStyles.js");

StatusBarIOS.setStyle('default');

var BackButton = require('../components/BackButton.js');
var HomePage = require('./homepage.js');

var firstRoute = {
	name: 'Explore Hearts',
	component: HomePage
};
var Navigator = React.createClass({
	render: function() {
		return (
			<Router firstRoute={firstRoute} backButtonComponent={BackButton} headerStyle={styles.routerHeader} titleStyle={[styles.routerTitle, globalStyles.text.heading]} />
		);
	},

});

var styles = {
	routerHeader: {
		backgroundColor: 'rgba(0,0,0,.0)',
		marginBottom: -20,
		paddingBottom: -20,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		borderTopWidth: 20,

	},
	routerTitle: {
		marginTop: -17,
		fontSize: 22,
		color: '#000'
	}
}

module.exports = Navigator;
