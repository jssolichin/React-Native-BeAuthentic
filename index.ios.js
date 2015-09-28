/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
} = React;
var { TabBarIOS, } = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;
var Parse = require('parse').Parse;
Parse.initialize(
	'N5En87e1m9jZbT2dX9BJQm0yGnoQ8LGtYPP9KDwd',
	'TbgrWR8WAIF9vk9Cbs01Y81L43UZqt9Fb3Ykm53d'
);
var ParseReact = require('parse-react');

var LoginPage = require('./app/LoginPage/index.js');
var HomePage = require('./app/HomePage/index.js');
var ExplorePage = require('./app/ExplorePage/index.js');
var ProfilePage = require('./app/ProfilePage/index.js');
var HeartPage = require('./app/HeartPage/index.js');
var NotificationPage = require('./app/NotificationPage/index.js');

var GetToKnow = React.createClass({
	mixins: [ParseReact.Mixin],
	observe: function(props, state) {
		//refresh after log in or log out
	  return { currentUser: ParseReact.currentUser };
	},
	getInitialState: function() {
		return {
			selectedTab: 'home',
			notifCount: 0,
			presses: 0,
		};
	},
	render: function() {

		if(this.data.currentUser) {

			return (
				<TabBarIOS
					selectedTab={this.state.selectedTab}
					tintColor={'#fff'}
					barTintColor={'#000000'}
					translucent={false}
					>
					<TabBarItemIOS
						name="home"
						iconName={'ion|home'}
						title={''}
						iconSize={32}
						accessibilityLabel="Home Tab"
						selected={this.state.selectedTab === 'home'}
						onPress={() => {
							this.setState({
								selectedTab: 'home',
							});
						}}>
						<HomePage />
					</TabBarItemIOS>
					<TabBarItemIOS
						name="explore"
						iconName={'ion|earth'}
						title={''}
						iconSize={32}
						accessibilityLabel="Explore Tab"
						selected={this.state.selectedTab === 'explore'}
						onPress={() => {
							this.setState({
								selectedTab: 'explore',
							});
						}}>
						<ExplorePage />
					</TabBarItemIOS>
					<TabBarItemIOS
						name="heart"
						iconName={'ion|ios-heart'}
						title={''}
						iconSize={32}
						accessibilityLabel="My Heart Tab"
						selected={this.state.selectedTab === 'heart'}
						onPress={() => {
							this.setState({
								selectedTab: 'heart',
							});
						}}>
						<HeartPage />
					</TabBarItemIOS>
					<TabBarItemIOS
						name="notification"
						iconName={'ion|chatbox'}
						title={''}
						iconSize={32}
						accessibilityLabel="Notification Tab"
						selected={this.state.selectedTab === 'notification'}
						onPress={() => {
							this.setState({
								selectedTab: 'notification',
							});
						}}>
						<NotificationPage />
					</TabBarItemIOS>
					<TabBarItemIOS
						name="profile"
						iconName={'ion|person'}
						title={''}
						iconSize={32}
						accessibilityLabel="My Profile Tab"
						selected={this.state.selectedTab === 'profile'}
						onPress={() => {
							this.setState({
								selectedTab: 'profile',
							});
						}}>
						<ProfilePage />
					</TabBarItemIOS>
				</TabBarIOS>
			);
		}
		else {
			return <LoginPage />;
		}
	}
});

AppRegistry.registerComponent('GetToKnow', () => GetToKnow);
