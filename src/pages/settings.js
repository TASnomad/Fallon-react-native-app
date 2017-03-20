import React, { Component } from "react";

import {
  Text,
} from "react-native";

import SideBar from '../components/SideBar';

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
          <Text>This is a test !</Text>
        </SideBar>
      );
  }
}
