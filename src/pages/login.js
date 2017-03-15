import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Button,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

import logo from '../res/img/fallon.png';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent:'center',
      backgroundColor: '#FFFFFF'
   },

   loginContainer: {
     flex: 1,
     marginTop: 50,
     alignItems: 'center',
   },

   logoContainer: {
     justifyContent: 'center',
     alignItems: 'center',
   },

   logo: {
     justifyContent: 'center',
     alignItems: 'stretch'
   },

   footer: {
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'red',
     height: 75,
   },

   input: {
      width: 300,
      color: '#555555',
      padding: 10,
      height: 50,
      borderColor: '#32C5E6',
      borderWidth: 1,
      borderRadius: 4,
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      marginBottom: 10
   },

   button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderColor: '#4CAF50',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
   },

   label: {
     width: 275,
     alignSelf: 'center',
     textAlign: 'center',
     fontSize: 20,
     fontWeight: '600',
     color: '#FFFFFF',
   },

   error: {
     alignSelf: 'center',
     textAlign: 'center',
     fontSize: 20,
     color: 'white',
     backgroundColor: 'red',
     fontWeight: '600'
   },

});

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      pendingLoginRequest: false,
      result: null,
      error: false,
      errorTxt: '',
      remember: false,
      gcmToken: this.props.route.token || '',
      btnOpcaity: 1,
    };
  }

  handlerLoginError(msg) {
    this.setState({ error: true, errorTxt: msg });
  }

  submit() {

    let login = this.state.login;
    let password = this.state.password;

    this.setState({ pendingLoginRequest: true, error: false, errorTxt: ' ' });

    var req =
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "log": login, "pass": password, "token": this.state.gcmToken })
    };

    return fetch('http://fallon.16mb.com/Fallon/webservices/connexion.php', req)
    .then((response) => {
      this.setState({ pendingLoginRequest: false });

      if(response.status === 200)
        return response.json();

      if(response.status === 500)
         return response.json().then((data) => { throw data; });

    })
    .then((data) => {
        this.props.navigator.push({ name: "dashboard", id: data.id });
    })
    .catch((error) => { this.handlerLoginError(error.error); });
  }

  render() {
    return(
      <View style = {styles.container}>
      <View style={ styles.logoContainer }>
        <Image style={ styles.logo } source={ logo } />
      </View>
        <View style={ styles.loginContainer}>
            <TextInput
              placeholder = 'Entre ton login'
              style = {styles.input}
              multiline={ false }
              underlineColorAndroid = { 'transparent' }
              onChangeText={ (text) => { this.setState({ login: text }) } } />

            <TextInput
              placeholder='Mot de passe'
              secureTextEntry={ true }
              style = { styles.input }
              underlineColorAndroid = { 'transparent' }
              onChangeText={ (text) => { this.setState({ password: text }) } } />

            <TouchableOpacity
              style={[ styles.button, { opacity: this.state.btnOpcaity } ]}
              onPressIn={ () => { this.setState({ btnOpcaity: 0.5 }); } }
              onPress={ () => { this.submit(); } }
              onPressOut={ () => { this.setState({ btnOpcaity: 1 }); } }>

              <Text style={ styles.label }> { 'Connexion'.toUpperCase() } </Text>
            </TouchableOpacity>

        </View>

        <View style={ styles.footer }>
          <Text style={ styles.error }>{ this.state.errorTxt }</Text>
        </View>
      </View>
    );
  }
}
