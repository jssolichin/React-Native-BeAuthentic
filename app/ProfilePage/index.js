'use strict';

var React = require('react-native');
var {
	StyleSheet,
	TabBarIOS,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
} = React;
var { Icon, } = require('react-native-icons');
var Router = require('gb-native-router');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');

var globalStyles = require("../globalStyles.js");

StatusBar.setBarStyle('default');

var BackButton = require('../components/BackButton.js');
var ProfileSettingsButton = require('../components/ProfileSettingsButton.js');
var HomePage = require('./homepage.js');

var Navigator = React.createClass({
	
	render: function() {

		var firstRoute = {
			name: Parse.User.current().getUsername(),
			component: HomePage,
			data: {
				userId: Parse.User.current().id,
			}
		};

		var profileSettingsButtonGenerator = function (){
			return <ProfileSettingsButton data={firstRoute.data} />
		}

		return (
			<Router firstRoute={firstRoute} backButtonComponent={BackButton} headerStyle={globalStyles.router.header} titleStyle={[globalStyles.router.title, globalStyles.text.heading]} 
				rightCorner={profileSettingsButtonGenerator}
			/>
		);
	},

});

var styles = {
}

module.exports = Navigator;
