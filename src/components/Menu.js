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
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

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

  render() {
    return (
      <ScrollView scrollsToTop={ false } contentContainerStyle={ styles.menu }>
        <View style={ styles.avatarContainer }>
          <Image
            style={ styles.avatar }
            source={ { uri, } } />
            <Text style={ styles.name }> { this.props.nom } </Text>
            <Text style={ styles.group }> { this.props.group } </Text>
        </View>

        <View style={ styles.selectionContainer }>

          <Text
            onPress={ () => { this.props.onItemSelected('Dashboard') } }
            style={ styles.item }>
              Dashboard
          </Text>

          <Text
            onPress={ () => { this.props.onItemSelected('Flow') } }
            style={ styles.item }>
              Absences / Retards
          </Text>

        <Text
          onPress={ () => { this.props.onItemSelected('Settings') } }
          style={ styles.item }>
            Paramètres
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
