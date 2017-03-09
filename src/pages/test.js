import React, { Component } from 'react';
import {
  Alert,
  BackAndroid,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithFeedBack,
  View
} from 'react-native';

import Container from '../components/Container';
import Label from '../components/Label';

import Icon from 'react-native-vector-icons/FontAwesome';

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

    this.state = {
      id: this.props.route.id
    };
  }

  render() {
    return (
      <ScrollView>
        <Container>
          <Label text={ this.state.id } />
        </Container>
      </ScrollView>
    );
  }
}
