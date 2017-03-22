import React, { Component, PropTypes } from "react";

import {
  AsyncStorage,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";

const window = Dimensions.get('window');

import SideBar from '../components/SideBar';
import SettingRow from '../components/SettingRow';

import STORAGE_KEYS from '../utils/keys';

import CheckBox from 'react-native-icon-checkbox';

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#FFFFFF',
    width: window.width,
    height: window.height,
  }
});

const AUTOLOG_ON = "Activer";
const AUTOLOG_OFF = "Désactiver";

export default class Settings extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      group: this.props.route.group,
      nom: this.props.route.nom,
      autologEnabled: false,
      autologText: AUTOLOG_OFF,
      settingsApplyed: false,
    };

    AsyncStorage.getItem(STORAGE_KEYS.STORED_AUTOLOG).then((stored_autolog) => {
      this.setState({
        autologEnabled: (stored_autolog && stored_autolog === "true") ? true : false,
        autologText: (stored_autolog && stored_autolog === "true") ? AUTOLOG_ON : AUTOLOG_OFF,
      })
    });
  }

  applySettings() {
    console.log("Test");
  }

  render() {
      return(
        <SideBar group={ this.state.group } nom={ this.state.nom } navigator={ this.props.navigator }>
          <ScrollView style={ styles.cont }>
            <SettingRow
              onPress={ () => { return false; } }>
              <Text>{ this.state.autologText } le login automatique</Text>
              <Switch
                onValueChange={ (value) => {
                  this.setState({
                    autologEnabled: value,
                    autologText: (value) ? AUTOLOG_ON : AUTOLOG_OFF,
                  });
                  }
                }
                value={ this.state.autologEnabled }>
              </Switch>
            </SettingRow>

            <SettingRow
              onPress={ () => { console.log("test 2"); } }>
              <Text> This is a test 2 ! </Text>
            </SettingRow>

          </ScrollView>
        </SideBar>
      );
  }
}
