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
        >
        <TabBarItemIOS
          name="home"
          iconName={'ion|ios-home-outline'}
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
            name="articles"
            iconName={'ion|ios-paper-outline'}
            title={''}
            iconSize={32}
            accessibilityLabel="Articles Tab"
            selected={this.state.selectedTab === 'articles'}
            onPress={() => {
            this.setState({
              selectedTab: 'articles',
            });
          }}>
			<HomePage />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
});

AppRegistry.registerComponent('GetToKnow', () => GetToKnow);
