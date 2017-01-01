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

  componentWillMount() {
    var nav = this.props.navigator;

    automaticLogin(() => {
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
      body: JSON.stringify(infos);
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
