import React, { Component } from "react";

import {
  AsyncStorage,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import SideMenu from "react-native-side-menu";

import STORAGE_KEYS from '../utils/keys';
import Menu from './Menu';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 0,
    padding: 10,
  },

  appName: {
    fontSize: 35,
    paddingBottom: 9,
    paddingTop: 5,
    color: '#4CAF50',
  },

  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

class Button extends Component {
  handlePress(e) {
    if(this.props.onPress) this.props.onPress(e);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={ this.handlePress.bind(this) }
        style={ this.props.style }>
        <Text>{ this.props.children }</Text>
      </TouchableOpacity>
    );
  }
}

export default class SideBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      seletectItem: 'Settings',
      nom: this.props.nom,
      group: this.props.group,
      nav: this.props.navigator,
    };
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  udpateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    if(item === "Logout")
    {
      this.setState({ isOpen: false, selectedItem: "login" });
      AsyncStorage.removeItem(STORAGE_KEYS.STORED_AUTOLOG).then(() => {
        this.props.navigator.popToTop();
        this.props.navigator.replace({ name: "login", token: " " });
      });
    }
    else
    {
      this.setState({ isOpen: false, selectedItem: item });
      this.props.navigator.push({ name: item.toLowerCase(), group: this.state.group, nom: this.state.nom });
    }
  }

  render() {
    const menu = <Menu nom={ this.props.nom.toUpperCase() } group={ this.props.group.toUpperCase() } onItemSelected={ this.onMenuItemSelected } />;
    return (
      <SideMenu
        menuPosition={ "left" }
        menu={ menu }
        isOpen={ this.state.isOpen }
        onChange={ (isOpen) => this.udpateMenuState(isOpen) }>
        <View>
        </View>
        <View style={ styles.container }>
          <View>
            <Text style={ styles.appName }>
              fal!on
            </Text>
          </View>
          { this.props.children }
        </View>
          <Button
            style={ styles.button }
            onPress={ () => this.toggle() }>
            <Image
              source={ require('../res/img/menu.png') } style={{ width: 32, height: 32 }}/>
          </Button>
      </SideMenu>
    );
  }
}
