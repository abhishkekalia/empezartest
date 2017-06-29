import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import Button from 'app/common/Button';
import Loader from 'app/common/Loader';
import {container, content, input, errorText} from 'app/common/commonStyles';

var styles = StyleSheet.create({
    container,
    content,
    input,
    errorText
});

class Login extends Component {
    static propTypes = {
        errorStatus: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            username : '',
            email   : '',
            loading: true,
        }    }

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
//                    onSubmitEditing={() => this.onSubmit()}
                    onChangeText={(username) => this.setState({username: username})} />
                <TextInput style={styles.input}
                    value={this.state.email}
                    autoCorrect={false}
                    underlineColorAndroid = 'transparent'
                    placeholder="email"
                    maxLength={140}
//                    onSubmitEditing={() => this.onSubmit()}
                    onChangeText={(email) => this.setState({email: email})}/>
                <Button onPress={() => this.onSubmit(this.state.username, this.state.email)}>
                    Login
                </Button>
                {errorStatus ? <Text style={styles.errorText}>{errorStatus}</Text> : undefined}
                {loading ? <Loader/> : undefined}
            </View>
        );
    }

    onSubmit(username, email) {
        this.props.login(this.state.username);
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
              //  var u_id = obj.status.msg;
                console.warn(obj['msg']);
            } else {
                    ToastAndroid.show("Network Error", ToastAndroid.LONG);
             }};
        http.send(params);
    }
}
export default Login;