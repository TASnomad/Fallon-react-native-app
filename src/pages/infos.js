import React, { Component, PropTypes } from "react";

import {
  Text,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import SideBar from '../components/SideBar';

const styles = StyleSheet.create({
  cont: {
    flexGrow: 1,
  },

  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txt: { fontSize: 18, },

  smtxt: { fontSize: 16, },
});

export default class Infos extends Component {
  constructor(props) { super(props); }

  render() {
    return (
      <SideBar group={ this.props.route.group } nom={ this.props.route.nom } navigator={ this.props.navigator }>
        <ScrollView style={ styles.cont }>
          <View style={ styles.inner }>
            <Text style={ styles.txt }>Cette application a été créée par les étudiants:</Text>
            <Text style={ styles.txt }>Jonathan Gosset</Text>
            <Text style={ styles.txt }>Martin Barreau</Text>
            <Text style={ styles.txt }>Thomas Nouvellon</Text>
            <Text style={ styles.smtxt }>L'application est open-source sous license GNU/GPL 2.0</Text>
            <Text style={ styles.smtxt }></Text>
            <Text style={ styles.smtxt }>En cas de bugs, veuillez contacter le mail suivant:</Text>
            <Text style={ styles.smtxt }> martin.barreau@etu.u-pec.fr</Text>
          </View>
        </ScrollView>
      </SideBar>
    );
  }
}
