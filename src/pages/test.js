import React, { Component } from 'react';
import {
  BackAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Test extends Component {
  constructor(props) {
    super(props);

    BackAndroid.removeEventListener('hardwareBackPress', () => {
      if(this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1)
      {
        this.props.navigator.pop();
        return true;
      }
      return false;
    });

    setTimeout(() => { this.props.navigator.pop(); }, 7500);
  }

  render() {
    return (
      <View>
        <Text> Fallon rules !!!</Text>
      </View>
    );
  }
}
