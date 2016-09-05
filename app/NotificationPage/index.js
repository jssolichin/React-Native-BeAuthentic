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
var Homepage = require('./homepage.js');

var Navigator = React.createClass({

	render: function() {
		var firstRoute = {
			name: 'Notifications',
			component: Homepage,
			passProps: {
				updateBadge: this.props.updateBadge,
				emitter: this.props.emitter,
			}

		};

		return (
			<Router firstRoute={firstRoute} backButtonComponent={BackButton} headerStyle={globalStyles.router.header} titleStyle={[globalStyles.router.title, globalStyles.text.heading]} />
		);
	},

});

module.exports = Navigator;
