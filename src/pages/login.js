import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';
import Label from '../components/Label';

var styles = StyleSheet.create({
  scroll: {
    //backgroundColor: '#4CAF50',
    padding: 30,
    flexDirection: 'column'
  },

  label: {
    color: '#0D8898',
    fontSize: 20
  },

  alignRight: { alignSelf: 'flex-end' },
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
    };
  }

  handlerLoginError(msg) {
    this.setState({ error: true, errorTxt: (msg === NO_NETWORK) ? "Tu n'as pas de réseau pour te connecter !" : msg });
  }

  submit() {

    let login = this.state.login;
    let password = this.state.password;

    this.setState({ pendingLoginRequest: true });

    var req = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ log: login, pass: password })
    };

    return fetch('http://cirrusjs.me:9865/login', req)
    .then((response) => {
      this.setState({ pendingLoginRequest: false });

      if(!response.ok)
        return;
      return response.json();
    })
    .then((data) => {
      if(data.hasOwnProperty("session"))
        this.props.navigator.push({ name: "test" });
    })
    .catch((error) => { this.handlerLoginError(error.message); });
  }

  render() {
    return (
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
    );
  }
}
