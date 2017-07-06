import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat')}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text style = {{ paddingTop : 15, paddingBottom : 15 ,backgroundColor : 'red'}}>Chat with Lucy</Text>
        <Text>GST launch in India: The Goods and Services Tax (GST), one of India’s biggest reform in tax structure will, at last, become a reality from July 1. The tax reform will be launched tonight when the clock strikes 12 on June 30, and the Goods and Services Tax will irreversibly impact the price of all kinds of products. GST will change the indirect tax landscape of India from tomorrow, subsuming various state and central taxes. Though the real impact of the government’s big-bang reform can be assessed only after a full year of its implementation, let us gauge the immediate impact on the prices of various products. In many cases, it may weigh heavily on your pockets while in others it may soothe your frayed nerves.
The GST Council has bracketed all the goods and services in the country in five categories – 0 per cent, 5 per cent, 12 per cent, 18 per cent and 28 per cent. While some of these products had higher effective tax rates before the GST and the new tax regime will reduce the burden on consumers, some of the items will now be taxed at higher rate. While 7 percent of the items come under the exempted list, 14 per cent fall in the 5 percent tax slab, 17 per cent in the 12 per cent slab, 43 per cent under 18 per cent tax rate and only 19 percent of the items will fall under the highest 28 per cent tax slab in the new regime.
Cheaper under GST: Government has exempted tax on most of the food items. Similarly, many will come under the low tax category of 5 percent or 12 percent. Unpacked foodgrains, unbranded atta, maida, besan, fresh vegetables and fruits, and salt have been exempted from tax. Even most of the processed food items will come under the 5 percent tax bracket. In terms of restaurants, eating out at small restaurants will also cost less after implementation of GST, since those earning less than Rs 75 lakh in a year have been placed in the 5 percent tax bracket under the new GST rates.
Costlier under GST: Tax on tea and coffee has been increased from 3-4 percent to 5 percent. In terms of restaurants, fine dining restaurants or those inside five-star hotels will now get pricier </Text>
      </ScrollView>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});

module.exports = SimpleApp;
