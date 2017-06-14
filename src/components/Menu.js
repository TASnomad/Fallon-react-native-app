import React, { Component } from 'react';

import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const window = Dimensions.get('window');

let face = 0;
let src = null;

const styles = StyleSheet.create({
  menu: {
    height: window.height,
    backgroundColor: '#4CAF50',
  },
  avatarContainer: {
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderBottomColor: '#FFFFFF',
    marginBottom: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    paddingRight: 15,
  },

  selectionContainer: {
      paddingTop: 15,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 20
  },

  group: {
    color: "#FFFFFF",
    fontSize: 15
  },

  item: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    height: 50,
    fontWeight: '300',
    paddingBottom: 15,
    color: "#FFFFFF",
  },
});

export default class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    face =  Math.floor(Math.random() * 9);
        
    switch(face) {
      case 0: src = require("../res/faces/0.png"); break;
      case 1: src = require("../res/faces/1.png"); break;
      case 2: src = require("../res/faces/2.png"); break;
      case 3: src = require("../res/faces/3.png"); break;
      case 4: src = require("../res/faces/4.png"); break;
      case 5: src = require("../res/faces/5.png"); break;
      case 6: src = require("../res/faces/6.png"); break;
      case 7: src = require("../res/faces/7.png"); break;
      case 8: src = require("../res/faces/8.png"); break;
      case 9: src = require("../res/faces/9.png"); break;
    }
  }

  render() {
    return (
      <ScrollView scrollsToTop={ false } contentContainerStyle={ styles.menu }>
        <View style={ styles.avatarContainer }>
          <Image style={ styles.avatar } source={ src } />
            <Text style={ styles.name }> { this.props.nom } </Text>
            <Text style={ styles.group }> { this.props.group } </Text>
        </View>

        <View style={ styles.selectionContainer }>

          <Text
            onPress={ () => { this.props.onItemSelected('Dashboard') } }
            style={ styles.item }>
              EDT
          </Text>

          <Text
            onPress={ () => { this.props.onItemSelected('Flow') } }
            style={ styles.item }>
              Infos des profs
          </Text>

          <Text
            onPress={ () => { this.props.onItemSelected('Myflow') } }
            style={ styles.item }>
            Mes infos
          </Text>

          <Text
            onPress={ () => { this.props.onItemSelected('Fichiers') } }
            style={ styles.item }>
            Fichiers
          </Text>

          <Text
            onPress={ () => { this.props.onItemSelected('Settings') } }
            style={ styles.item }>
              Paramètres
          </Text>

          <Text
            onPress={ () => { this.props.onItemSelected('Infos') } }
            style={ styles.item }>
            A propos
            </Text>
        </View>

        <Text
          onPress={ () => { this.props.onItemSelected('Logout') } }
          style={ styles.item }>
            Se déconnecter
        </Text>

      </ScrollView>
    );
  }
};
