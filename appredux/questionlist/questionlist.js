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
      ActivityIndicator,
      ScrollView,
      Button,
      RefreshControl
  } from 'react-native';
import { StackNavigator } from 'react-navigation';

var REQUEST_URL = 'http://abhishekkalia1792.esy.es/index.php/api/rest/question';

var Questions = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }),
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }),
            loaded: false,
            toggle : false,
            refreshing: false,

        };
    },

    componentDidMount: function() {
        this.fetchData();
    },
     _onRefresh : function() {
    this.setState({refreshing: true});
            this.fetchData();
  },

    fetchData:function (){
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.que_ans),
            loaded: true,
            refreshing: false
        });
        }).done();
    },

    render: function() {
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
*/      <ListView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />
        }
        dataSource={this.state.dataSource}
        renderRow={this.renderData}
        renderSeparator={this._renderSeparator}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        /> 
        );
    },

    renderLoadingView: function() {
        return (
            <ActivityIndicator  
            style={[styles.centering]} //styles.gray]}
            color="#1e90ff" 
            size="large"/>
            );
    },

    renderData: function(que_ans, rowData, sectionID, rowID, index) {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity key={rowID} data={rowData} onPress={() => navigate('Detail', { feed: que_ans.feed, detail : que_ans.detail , source : que_ans.source, time : que_ans.time  })}>
            <View style={styles.row}>
            <View>
            <Image style={styles.thumb} source={require('./Icone/avatar.png')} />
            </View>
            <Text style={styles.textQue}>{que_ans.feed}</Text>
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
        }}/>
        );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6'
    },

    thumb: {
        width   :50,
        height  :50,
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
        padding: 20
    },

    heading: {
        paddingTop : 5,
        paddingBottom : 5,
        backgroundColor : '#fff',
        borderBottomWidth : 3,
        borderBottomColor : '#a9a9a9'
    },
    headline: {
        paddingTop : 10,
        paddingBottom : 10,
        marginLeft : 15,
        fontSize    : 15,
        color       : "#000",
        fontWeight  : 'bold'
    },
    detail: {
        padding : 10,
        backgroundColor : '#fff',
        minHeight : 500,
        fontWeight : 'bold'
    }
});

class DetailScreen extends React.Component {
    render() {
            const { params } = this.props.navigation.state;

        return (
            <ScrollView>
            <View style={styles.heading }>
            <Text style = {styles.headline}>{params.feed}</Text>
            <Text style={{ paddingLeft: 20, color : '#a9a9a9'}} >{params.source} {params.time}</Text>
            </View>

            <Text style={styles.detail}>Detail : {params.detail}</Text>
            </ScrollView>
        );
    }
}

const SimpleApp = StackNavigator({
    Question: { screen: Questions },
    Detail: { screen: DetailScreen },
});

module.exports = SimpleApp;
