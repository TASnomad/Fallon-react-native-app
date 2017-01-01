import React, {  Component } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TouchableHightlight
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
});

const Button = (props) => {
  function getContent() {
    if(props.children) return props.children;
    return <Text style={ props.styles.label : '' }>{ props.label }</Text>
  }

  return (
    <TouchableHightlight
      underlayColor="#CCC"
      onPress={props.onPress}
      style={[
        props.noDefaultStyles ? '' : styles.button,
        props.styles ? props.styles.button : '' ]}
    >
      { getContent() }
    </TouchableHightlight>
  );
}

export default Button;
