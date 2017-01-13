import React, { Component } from 'react';
import {
  Alert,
  BackAndroid,
  Button,
  StyleSheet,
  Text,
  TouchableWithFeedBack,
  View
} from 'react-native';

import Container from '../components/Container';
import Icon from 'react-native-vector-icons/FontAwesome';

const PRESS_TIMER = 400;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    borderWidth: 3,
    borderColor: '#111',
    padding: 10
  },

  text: {
    backgroundColor: 'transparent',
    color: '#111'
  },

  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});

export default class Test extends Component {
  constructor(props) {
    super(props);

    /*BackAndroid.removeEventListener('hardwareBackPress', () => {
      if(this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1)
      {
        this.props.navigator.pop();
        return true;
      }
      return false;
    });

    setTimeout(() => { this.props.navigator.pop(); }, 7500);*/
  }

  render() {
    return (
      <ToolbarAndroid
        title="Navigator"
        actions= {
          [
            { title: 'Exit', show: 'always' }
          ]
        }
        onActionSelected={ this.toolbarSelected }
      />
    );
  }

  toolbarSelected(position) {
    if(position === 0) Alert.confirm("Test", "Envie de partir ?");
  }

  /*render() {
    return (
      <View style={ styles.container }>
        <TouchableWithoutFeedback
          onPressIn={ this.handleIn }
          onPressOut={ this.handleOut }
        >
        <View>
          <Animated.View />
          <Text>Press and hold</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }*/
}
