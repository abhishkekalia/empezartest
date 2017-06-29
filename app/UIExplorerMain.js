import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Picker,
  TouchableOpacity,
  Image
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class UIExplorerPage extends React.Component {

  props: {
    keyboardShouldPersistTaps?: boolean,
    noScroll?: boolean,
    noSpacer?: boolean,
  };

  static propTypes = {
    keyboardShouldPersistTaps: React.PropTypes.bool,
    noScroll: React.PropTypes.bool,
    noSpacer: React.PropTypes.bool,
  };

  render() {
    var ContentWrapper;
    var wrapperProps = {};
    if (this.props.noScroll) {
      ContentWrapper = (View: ReactClass<any>);
    } else {
      ContentWrapper = (ScrollView: ReactClass<any>);
      // $FlowFixMe found when converting React.createClass to ES6
      wrapperProps.automaticallyAdjustContentInsets = !this.props.title;
      wrapperProps.keyboardShouldPersistTaps = true;
      wrapperProps.keyboardDismissMode = 'interactive';
    }

    var spacer = this.props.noSpacer ? null : <View style={styles.spacer} />;
    return (
      <View style={styles.container}>
       
<ToolbarAndroid
          actions={this.props.toolbarActions}
          onActionSelected={this.props.changeLanguage.bind(this)}
          style={[styles.toolbar]}

//          title="Questions"
           />  
                 <ContentWrapper
          style={styles.wrapper}
          {...wrapperProps}>
            {
              // $FlowFixMe found when converting React.createClass to ES6
              this.props.children}
            {spacer}
        </ContentWrapper>

      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    height: 270,
  },
  wrapper: {
    flex: 1,
    paddingTop: 5,
  },
 toolbar: {
    backgroundColor: '#246dd5',
    height: 56,
  },
});

class UIExplorerTitle extends React.Component {

  render() {
    language = this.props.language
    return (
      <View style={{justifyContent:'space-between', flexDirection: 'row' }}>
     <View/>
         <TouchableOpacity style={{justifyContent: 'center'}}
          onPress={this.getList.bind(this , language)}>
         <View style= {{width: 50, height:35, alignItems : 'center'}}>
              <Image style={{width: 30, height:30 , top : 5}} source={require('./Icone/settings.png')} />
        </View>
        </TouchableOpacity>
   </View> );
  }
  getList(language){
    return(
    <Picker style={{width:100, color:'#fff'}}
  selectedValue= {language}
  onValueChange={this.props.changeLanguage}>
  <Picker.Item label="English" value="question_e" />
  <Picker.Item label="हिन्दी" value="question_h" />
  <Picker.Item label="ગુજરાતી" value="question_g" />
</Picker>

    );
  }
}


module.exports = UIExplorerPage;
/*
   <Picker style={{width:100, color:'#fff'}}
  selectedValue= {language}
  onValueChange={this.props.changeLanguage}>
  <Picker.Item label="English" value="question_e" />
  <Picker.Item label="हिन्दी" value="question_h" />
  <Picker.Item label="ગુજરાતી" value="question_g" />
</Picker>
*/