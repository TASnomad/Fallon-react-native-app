import React, { Component } from "react";

import {
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

const window = Dimensions.get('window');

import SideBar from '../components/SideBar';

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#FFFFFF',
    width: window.width,
    height: window.height,
  }
});

export default class Settings extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      group: this.props.route.group,
      nom: this.props.route.nom,
    };
  }

  render() {
      return(
        <SideBar group={ this.state.group } nom={ this.state.nom } navigator={ this.props.navigator }>
          <ScrollView style={ styles.cont }>
            <Text>dqsdfqfds
            </Text>
            <Text>cdqsfcwdvsf
            </Text>
          </ScrollView>
        </SideBar>
      );
  }
}
