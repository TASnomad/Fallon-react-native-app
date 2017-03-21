import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Container from '../components/Container';
import Label from '../components/Label';

import Img from '../res/img/bootsplash.png';
import STORAGE_KEYS from '../utils/keys';

/**
 * We could create the token on the main script
 * but to send the token in the DB it's better to do this
 */
import PushNotification from 'react-native-push-notification';

var gcmToken = null;

PushNotification.configure({
  onRegister: function(token) {
    gcmToken =  token.token;
    console.log("GCM token: " + gcmToken);
  },

  onNotification: function(notification) { console.log("New notification: " + notification); },

  // Change if using a new GCM
  senderID: "571301329457",
  popInitialNotification: true,
  requestPermissions: true
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  }
});

var _navigator = null;

/**
 * TODO: add automatic login if enabled
 */

export default class Bootsplash extends Component {

  constructor(props) {
    super(props);

    _navigator = this.props.navigator;

    this.automaticLogin(() => {
      setTimeout(() => {
        _navigator.push({
          name: 'login',
          token: gcmToken
        });
      }, 500);
    });
  }

  /**
   * Fonction a utiliser s'il on veut faire des préparations avant le render
   * NOTE: react-native recommande constructor au lieu de componentWillMount
   * mais dans l'effet les 2 sont appelés
   */

  automaticLogin(errCB) {
    var login = null;
    var password = null;
    var token = null;
    var autolog = null;

    var sub_fct = this.submit;

    AsyncStorage.getItem(STORAGE_KEYS.STORED_LOGIN).then((stored_login) => {
      if(stored_login) login = stored_login;

      return AsyncStorage.getItem(STORAGE_KEYS.STORED_PASSWORD);
    })
    .then((stored_pass) => {

      if(stored_pass) password = stored_pass;

      return AsyncStorage.getItem(STORAGE_KEYS.STORED_TOKEN);
    })
    .then((stored_token) => {
      if(stored_token) token = stored_token;

      return AsyncStorage.getItem(STORAGE_KEYS.STORED_AUTOLOG);
    })
    .then((stored_autolog) => {

      (stored_autolog) ? autolog = true : false;

      return (login && password && autolog) ? sub_fct(login, password, token, errCB) : errCB();
    }).catch((error) => { console.log(error); });
  }

  submit(login, password, token, errCB) {
    token = token || ""; // Just in case

    var req = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "log": login, "pass": password, "token": token })
    };

    return fetch('http://fallon.16mb.com/Fallon/webservices/connexion.php', req)
    .then((res) => {

      // Success case !!!
      if(res.status === 200) return res.json().then((data) => {
        _navigator.push({ name: "dashboard", group: data.group, nom: data.nom });
      });

      // Error case ...
      if(res.status() === 500) return res.json().then((data) => { errCB(); });

      // Unknown case ?!
      else errCB();
    });
  }
  render() {
    return (
      <View style={ styles.container }>
        <Image source={ Img } />
        <Container>
          <Text> Projet Fallon </Text>
        </Container>
      </View>
    );
  }
}
