'use strict';

var React = require('react-native');
var {
	StyleSheet,
	TabBarIOS,
	Text,
	View,
	StatusBar,
} = React;
var Router = require('gb-native-router');
var globalStyles = require("../globalStyles.js");

StatusBar.setBarStyle('default');

var BackButton = require('../components/BackButton.js');
var HomePage = require('./homepage.js');

var firstRoute = {
	name: 'Explore',
	component: HomePage
};
var Navigator = React.createClass({
	render: function() {
		return (
			<Router firstRoute={firstRoute} backButtonComponent={BackButton} headerStyle={globalStyles.router.header} titleStyle={[globalStyles.router.title, globalStyles.text.heading]} />
		);
	},

});

module.exports = Navigator;
