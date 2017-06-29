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

var toolbarActions = [
  {title: 'English', value: 'ChangeQuestions', lang :'question_e' },
  {title: 'हिन्दी', value: 'ChangeQuestions', lang :'question_h' },
  {title: 'ગુજરાતી', value: 'ChangeQuestions', lang :'question_g' },
  {title: 'experts', value: 'Experts' , icon: require('./Icone/_0002_Vector-Smart-Object.png'), show: 'always' }
];

var Questions = React.createClass({
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
  /*     <UIExplorerPage
        noSpacer={true}
        toolbarActions = {toolbarActions}
        language={this.state.language}
        changeLanguage = {(position) =>  { this.setState({
              actionText:  toolbarActions[position].value,
              language : toolbarActions[position].lang,
              toggle : ! this.state.toggle
            });
          //   this.fetchData();
//             this.goExperts(que, scrChange)
        this.props.navigator.push({
      id: scrChange,
     name:'Experts' ,
    passProps: { que }


   });

           }
          }
        noScroll={true}>
*/
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderData.bind()}
       // style={{paddingTop : 50}}
        renderSeparator={this._renderSeparator}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}

      /> 
// </UIExplorerPage>
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

  renderData: function(que_ans, rowData, sectionID, rowID, index) {

    return (
       <TouchableOpacity key={rowID} data={rowData} onPress={this.gotoNextEnglish.bind(this, que_ans)}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('./Icone/q.png')} />
            <Text style={styles.textQue}>{que_ans.feed}</Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  },

  
   gotoNextEnglish(que_ans, rowID ) {
    this.props.navigator.push({
      id: 'Answer',
      name:'Answer' ,
     passProps: { q_id: que_ans.id, que_e :que_ans.question_e , ans_e : que_ans.answer_e }

    });
  
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
module.exports = Questions;

/*
https://reactnavigation.org/docs/intro/
*/