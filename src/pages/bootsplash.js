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

import Img from '../res/img/test.png';
import STORAGE_KEYS from '../utils/keys';
import URLS from '../utils/ajaxURL';

/**
 * We could create the token on the main script
 * but to send the token in the DB it's better to do this
 */
import PushNotification from 'react-native-push-notification';

var gcmToken = null;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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

    /* fixing this mismatching */
    var __that__ = this;

    _navigator = this.props.navigator;

    PushNotification.configure({
      onRegister: function(token) {
        gcmToken =  token.token;

        __that__.automaticLogin(() => {
          setTimeout(() => {
            _navigator.push({
              name: 'login',
              token: gcmToken,
              navRef: _navigator,
            });
          }, 500);
        });
      },

      onNotification: function(notification) { console.log("New notification: " + notification); },

      // Change if using a new GCM
      senderID: "562572090701",
      popInitialNotification: true,
      requestPermissions: true
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
    var group = null;
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
      (stored_autolog || stored_autolog === "true") ? autolog = true : false;

      return AsyncStorage.getItem(STORAGE_KEYS.STORED_GROUP);
    }).then((stored_group) => {
      if(stored_group) group = stored_group;

      return (login && password && group && autolog) ? sub_fct(login, password, token, group, errCB) : errCB();
    }).catch((error) => { console.dir(error); });
  }

  submit(login, password, token, group, errCB) {
    token = token || ""; // Just in case

    var req = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "log": login, "pass": password, "token": token, "group": group })
    };

    return fetch(URLS.CONNEXION, req)
    .then((res) => {
      // Success case !!!
      if(res.status === 200) return res.json().then((data) => {
        AsyncStorage.setItem(STORAGE_KEYS.STORED_TOKEN, gcmToken).then(() => {
          let t = _navigator;
          _navigator.push({ name: "dashboard", group: data.group, nom: data.nom });
        });
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
      </View>
    );
  }
}
