import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
 

export default class Login extends Component {
    static propTypes = {
        errorStatus: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired
    };
    constructor(props){
    super(props);
        this.state = {
            username : '',
            email   : '',
            loading: false,
        }
    }
    render() {
        const {errorStatus, loading} = this.props;
    return (
        <View style={[styles.container, styles.content]}>
                <TextInput style={styles.input}
                    value={this.state.username}
                    autoCorrect={false}
                    placeholder="username"
                    underlineColorAndroid = 'transparent'
                    maxLength={140}
                    onSubmitEditing={() => this.onSubmit()}
                    onChangeText={(username) => this.setState({username: username})} />
                <TextInput style={styles.input}
                    value={this.state.email}
                    autoCorrect={false}
                    underlineColorAndroid = 'transparent'
                    placeholder="email"
                    maxLength={140}
                    onSubmitEditing={() => this.onSubmit()}
                    onChangeText={(email) => this.setState({email: email})}/>
                    
                <TouchableOpacity style={this.state.loading ? styles.buttonDisabled : styles.button} underlayColor={'#2bbbad'} onPress={() => this.onSubmit(this.state.username, this.state.email)}>
                    <Text style={styles.buttonText}>{this.state.loading ? 'Please Wait . . .' : 'login'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    onSubmit(username, email) {
        this.setState({loading : true});
        var http = new XMLHttpRequest();
        var REQUEST_URL = `http://abhishekkalia1792.esy.es/index.php/api/rest/register`;

        var params = "email"+'='+ email +','+ "&username"+'='+ username ;

        http.open("POST", REQUEST_URL, true);

        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = (e) => {
            if (http.readyState !== 4) {
                return;
            }

            if (http.status === 200) {
                obj = JSON.parse(http.responseText);
                var u_id = obj.userid;
                console.warn(http.responseText);
      /* this.setState({
        ses_mail : obj.email,
        ses_id  : obj.userid
       })*/
      //  ToastAndroid.show(obj.userid, ToastAndroid.LONG);
   // this.gotoRoute('Questions', u_id); 

            } else {
       //   ToastAndroid.show("Network Error", ToastAndroid.LONG);
            console.warn('error');
            }};
        http.send(params);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150
    },
    heading :{
        width : windowWidth,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'orange'
    },
    
    buttonDisabled: {
        backgroundColor: '#808080',
        padding: 15,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'stretch'
    }, 
    content: {
        flex: 1,
        padding: 50
    },
    
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0
    },
    
    input: {
        height: 40,
        padding: 10,
        marginBottom: 10,
        borderColor: 'orange',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    
    label: {
        color: 'orange',
        padding: 5,
        fontWeight: "700",
        fontStyle: 'italic'
    },
    
    errorText: {
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        fontWeight: "700",
        fontStyle: 'italic'
    }

});

