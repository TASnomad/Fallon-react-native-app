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
    backgroundColor: '#01579B',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#01579B',
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
      flex: 2,
      backgroundColor: "#FFFFFF"
  },

  name: {
    position: 'absolute',
    left: 50,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
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
            <Text style={ styles.name }> { this.props.group } </Text>
        </View>

        <View style={ styles.selectionContainer }>
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
