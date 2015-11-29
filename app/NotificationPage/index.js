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
var Homepage = require('./homepage.js');

var firstRoute = {
	name: 'Activity',
	component: Homepage
};
var Navigator = React.createClass({

	render: function() {
		return (
			<Router firstRoute={firstRoute} backButtonComponent={BackButton} headerStyle={globalStyles.router.header} titleStyle={[globalStyles.router.title, globalStyles.text.heading]} />
		);
	},

});

module.exports = Navigator;
