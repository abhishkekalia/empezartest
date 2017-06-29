import React, { Component } from 'react';
import {
  Image,
  ListView,
  TouchableOpacity,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
  Picker,
  Navigator,
  ActivityIndicator
} from 'react-native';

var REQUEST_URL = 'http://abhishekkalia1792.esy.es/index.php/api/rest/question';
import UIExplorerPage from './UIExplorerMain'


var QuestilList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSource2: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      language : 'question_e',
      actionText: 'Experts',
      toggle : false
    };
  },

    componentDidMount: function() {
        this.fetchData();
    },
    
    fetchData:function (){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.que_ans),
          loaded: true,
        });
      })
      .done(); 
    },

    render: function() {
   
    var que = this.state.language;
    var scrChange = this.state.actionText;
                if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
        <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
        />
    );
  },
  
  
  renderScene: function() {
           return (
                <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderFeed}
               // style={{paddingTop : 50}}
                renderSeparator={this._renderSeparator}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}

              /> 
              );
  },





  renderLoadingView: function() {
    return (
     <ActivityIndicator
      style={[styles.centering]} //styles.gray]}
       color="#1e90ff"
       size="large"
 //       size={50}

        />
    );
  },

  renderFeed: function(que_ans, rowData, sectionID, rowID, index) {

    return (
       <TouchableOpacity key={rowID} data={rowData} >
        <View>
          <View style={styles.row}>
            <Text style={styles.textQue}>{que_ans.feed}</Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  },
   

    _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
});
var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
         <View style= {{width: 50, height:20, alignItems : 'center'}}>
              <Image style={{width: 20, height:20 }} source={require('./Icone/back.png')} />
        </View>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return ( <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={ null }>
         <View style= {{width: 50, height:35, alignItems : 'center'}}>
              <Image style={{width: 35, height:35 }} source={require('./Icone/_0002_Vector-Smart-Object.png')} />
        </View>
        </TouchableOpacity>
        );
  },
  Title(route, navigator, index, navState) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems : 'center'}}>
        <Text style={{color: 'white', fontSize: 16,     fontWeight: '400',
}}>
          Questions
        </Text>
      </View>
    );
  }
};
var styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 50,
    height: 50,
  },
 textQue :{
  flex: 1,
  fontSize: 18,
  fontWeight: '400',
  left : 5
  },
   centering: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
module.exports = QuestilList;
