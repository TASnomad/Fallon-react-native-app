import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';
import Label from '../components/Label';

import Ajax from '../utils.js';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent:'center',
      backgroundColor: '#E0E0E0'
   },

   loginContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
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
      backgroundColor: '#32C5E6',
      padding: 10,
      borderColor: '#32C5E6',
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
   }
});

const NO_NETWORK = "Network request failed";

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginFilled: false,
      passwordFilled: false,
      login: '',
      password: '',
      pendingLoginRequest: false,
      error: false,
      errorTxt: '',
      remember: false,
      gcmToken: this.props.route.token || "",
    };
  }

  handlerLoginError(msg) {
    this.setState({ error: true, errorTxt: msg });
  }

  submit() {

    let login = this.state.login;
    let password = this.state.password;

    this.setState({ pendingLoginRequest: true });

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

      if(response.status == 200)
        return response.json();
    })
    .then((data) => {
        this.props.navigator.push({ name: "test", id: data.id });
    })
    .catch((error) => { this.handlerLoginError(error.message); });
  }

  render() {
    /*return (
      <ScrollView style={ styles.scroll }>
        <Container>
          <Label text="Login" />
          <TextInput
            onChangeText={
              (txt) => {
                let enabled = txt.length > 3 ? true : false ;
                this.setState({ password : txt, passwordFilled : enabled });
              }
            }
            style={ styles.textInput }
          />
        </Container>

        <Container>
          <Label text="Mot de passe" />
          <TextInput
            onChangeText={
              (txt) => {
                let enabled = txt.length > 3 ? true : false ;
                this.setState({ login : txt, loginFilled : enabled });
              }
            }
            secureTextEntry={ true }
            style={ styles.textInput }
          />
        </Container>

        <Container>
          <Button
            title="Connexion"
            onPress={ this.submit.bind(this) }
            disabled={ !this.state.loginFilled || !this.state.passwordFilled }
          />
        </Container>

        <Container>
          <CheckBox
            label='Se souvenir de moi'
            checked={ this.state.remember }
            onChange={ (value) => { this.setState({ remember: !value }); } }
          />
        </Container>

        <Container>
          <Label style={ styles.scroll } text={ this.state.errorTxt }/>
        </Container>

      </ScrollView>
    );*/

    return(
      <View style = {styles.container}>
        <View style={ styles.loginContainer}>
            <TextInput
              placeholder = 'Entre ton login'
              style = {styles.input}
              multiline={ false }
              underlineColorAndroid = { 'transparent' }
            />
            <TextInput
              placeholder='Mot de passe'
              secureTextEntry={ true }
              style = { styles.input }
              underlineColorAndroid = { 'transparent' }
            />

            <TouchableHighlight style = { styles.button }>
              <Text style={ styles.label }> { 'Connexion'.toUpperCase() } </Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}
