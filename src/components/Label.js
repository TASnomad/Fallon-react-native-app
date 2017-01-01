import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  textLabel: {
    alignItems: 'center',
    color: '#595856',
    fontFamily: 'Verdana',
    fontSize : 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

const Label = (props) => {
  return (
    <Text
      style = { props.styles && props.styles.textLabel ? props.styles.textLabel : styles.textLabel }
    >
      { props.text }
    </Text>
  );
}

export default Label;
