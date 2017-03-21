import React, { Component } from 'react';

import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#4CAF50',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: '#4CAF50',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },

  selectionContainer: {
      flex: 1,
      // backgroundColor: "#FFFFFF",
      paddingTop: 15,
  },

  name: {
    position: 'absolute',
    left: 50,
    top: 20,
    color: "#FFFFFF",
    fontSize: 20
  },

  group: {
    position: "absolute",
    left: 175,
    top: 25,
    color: "#FFFFFF",
    fontSize: 15
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: '300',
    paddingBottom: 15,
    paddingRight: 150,
    color: "#FFFFFF",
  },
});

export default class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={ false } style={ styles.menu }>
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
            onPress={ () => { this.props.onItemSelected('Settings') } }
            style={ styles.item }>
              Settings
            </Text>
        </View>
      </ScrollView>
    );
  }
};
