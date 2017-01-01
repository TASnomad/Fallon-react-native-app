import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

var styles = StyleSheet.create({
  labelContainer: { marginBottom: 20 }
});

const Container = (props) => {
  return (
    <View style={ styles.labelContainer }>
     { props.children }
    </View>
  );
}

export default Container;
