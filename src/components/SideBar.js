import React, { Component } from "react";

import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import SideMenu from "react-native-side-menu";

import Menu from './Menu';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 0,
    padding: 10,
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
  state = {
    isOpen: false,
    seletectItem: 'Settings',
    group: this.props.group,
    nav: this.props.navigation,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  udpateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    console.log("Nav : " + this.props.navigation);
    console.log(item.toLowerCase());
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

    this.props.navigation.push({ name: item.toLowerCase() });
  }

  render() {
    const menu = <Menu group={ this.props.group } onItemSelected={ this.onMenuItemSelected } />;
    return (
      <SideMenu
        menu={ menu }
        isOpen={ this.state.isOpen }
        onChange={ (isOpen) => this.udpateMenuState(isOpen) }>
        <View style={ styles.container }>
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
