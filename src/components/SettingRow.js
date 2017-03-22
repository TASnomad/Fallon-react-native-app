import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const styles = StyleSheet.create({
  row: {
    borderBottomWidth : 1,
    borderColor: 'grey',
    margin: 5,
    padding: 20,
  },
});

export default class SettingRow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={ this.props.onPress }>

        <View style={ styles.row }>
          { this.props.children }
        </View>

      </TouchableWithoutFeedback>
    );
  }
}
