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

var HomePage = require('./app/HomePage/index.js');

var GetToKnow = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home',
      notifCount: 0,
      presses: 0,
    };
  },
  render: function() {
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
			<HomePage />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="hearts"
            iconName={'ion|ios-heart'}
            title={''}
            iconSize={32}
            accessibilityLabel="My Hearts Tab"
            selected={this.state.selectedTab === 'hearts'}
            onPress={() => {
            this.setState({
              selectedTab: 'hearts',
            });
          }}>
			<HomePage />
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
			<HomePage />
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
			<HomePage />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
});

AppRegistry.registerComponent('GetToKnow', () => GetToKnow);
