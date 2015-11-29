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
var NewHome = require('../HomePage/new.js');

var firstRoute = {
	name: 'Latest Heart to Heart',
	component: NewHome
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
		backgroundColor: '#000',
	},
	routerTitle: {
		fontSize: 22,
		color: '#fff',
	}
}

module.exports = Navigator;
