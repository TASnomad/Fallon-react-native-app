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
import KEYS from '../utils/keys';

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
    backgroundColor: '#FFFFFF'
  }
});

/**
 * TODO: add automatic login if enabled
 */

export default class Bootsplash extends Component {

  constructor(props) {
    super(props);

    console.log(KEYS);
  }

  /**
   * Fonction a utiliser s'il on veut faire des préparations avant le render
   * NOTE: react-native recommande constructor au lieu de componentWillMount
   * mais dans l'effet les 2 sont appelés
   */
  componentWillMount() {
    var nav = this.props.navigator;

    this.automaticLogin(() => {
      setTimeout(() => {
        nav.push({
          name: 'login',
          token: gcmToken
        });
      }, 500);
    });
  }

  async automaticLogin(errCB) {
    try
    {
      const loginInfos = await AsyncStorage.getItem('Login');
      if(loginInfos !== null) login(loginInfos);
      else errCB();
    } catch(error)
    {
      console.error(error);
      console.info("Automatic not enabled ...");
      errCB();
    }
  }

  async login(infos) {
    var req = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infos)
    };

    try
    {
      let response = await fetch('http://fallon.16mb.com/Fallon/webservices/connexion.php', req);
      let data = await response.json();

      if(data.hasOwnProperty("session"))
        this.props.navigator.push({ name: "test" });
    }
    catch(error)
    {
      console.error(error);
    }
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
