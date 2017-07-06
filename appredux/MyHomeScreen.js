import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import SimpleApp from './questionlist/questionlist';
import ProfilePage from './profile/ProfilePage';

import { TabNavigator, TabBarBottom } from 'react-navigation';

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
  };

  render() {
    return (
      <View>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Notifications')}
      />
      <Text>hello home</Text>
      </View>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Chat',
  };

  render() {
    return (
    <View>
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
      />
      <Text>this is Notifications</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const MyApp = TabNavigator({
  Home: {
    screen: SimpleApp,
  },
  Notifications: {
    screen: ProfilePage,
  },
},
{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
},
{
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
module.exports = MyApp;
