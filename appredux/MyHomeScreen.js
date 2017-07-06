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

const MyApp = TabNavigator({
  Home: {
    screen: SimpleApp,
  },
  Logout: {
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
