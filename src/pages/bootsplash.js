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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center'
  }
});

/**
 * TODO: add automatic login if enabled
 */

export default class Bootsplash extends Component {

  constructor(props) {
    super(props);
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
        nav.replace({ name: 'login' });
      }, 7500);
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
      let response = await fetch('http://cirrusjs.me:9865/login', req);
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
        <Image source={ require("../res/img/bootsplash.png") } />
        <Container>
          <Text> Projet Fallon </Text>
        </Container>
      </View>
    );
  }
}