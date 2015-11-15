'use strict';

var React = require('react-native');
var {
	StyleSheet,
	TabBarIOS,
	Text,
	View,
	StatusBarIOS,
	TouchableOpacity,
} = React;
var { Icon, } = require('react-native-icons');
var Router = require('react-native-router');
var Parse = require('parse/react-native');

var globalStyles = require("../globalStyles.js");

StatusBarIOS.setStyle('default');

var BackButton = require('../components/BackButton.js');
var HomePage = require('./homepage.js');

var firstRoute = {
	name: 'My Heart',
	component: HomePage
};

var LogoutButton = React.createClass({
	_onPress () {
		Parse.User.logOut();	
	},
	render() {
		return (
			<TouchableOpacity onPress={this._onPress}>
				<Text style={styles.rightButton}>LOG OUT</Text>
			</TouchableOpacity>
		)
	}
}); 

var Navigator = React.createClass({
	render: function() {
		return (
			<Router firstRoute={firstRoute} backButtonComponent={BackButton} headerStyle={styles.routerHeader} titleStyle={[styles.routerTitle, globalStyles.text.heading]} 
				//rightCorner={LogoutButton}
			/>
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
	},
	rightButton: {
		marginTop: -32,	
		marginRight: 7,
		color: '#000',
		borderWidth: 0,
		padding: 5,
		paddingHorizontal: 7,
		borderColor: '#000'
	}
}

module.exports = Navigator;
