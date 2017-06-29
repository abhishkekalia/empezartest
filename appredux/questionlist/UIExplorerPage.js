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
          navIcon={require('./Icone/back.png')} 
          onIconClicked={this.props.onPress}
          actions={this.props.toolbarActions}
          onActionSelected={this.props.changeLanguage.bind(this)}
          style={[styles.toolbar]}
          titleColor={'white'}
          subtitleColor= {'#6a7180'}


          title="Questions"
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
module.exports = UIExplorerPage;
