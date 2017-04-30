import React, { Component, PropTypes } from "react";

import {
  AsyncStorage,
  Button,
  Dimensions,
  Picker,
  Text,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";

const window = Dimensions.get('window');

import SideBar from '../components/SideBar';
import SettingRow from '../components/SettingRow';

import STORAGE_KEYS from '../utils/keys';
import PROMOS from '../utils/promo';

import CheckBox from 'react-native-icon-checkbox';

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#FFFFFF',
    width: window.width,
    height: window.height,
  },

  bottomAction: {
    position: 'absolute',
    bottom: 0,
  }
});

const AUTOLOG_ON = "Activer";
const AUTOLOG_OFF = "Désactiver";

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      group: this.props.route.group,
      nom: this.props.route.nom,
      autologEnabled: false,
      autologText: AUTOLOG_OFF,
      settingsApplyed: false,
      selectedItem: '',
    };

    AsyncStorage.getItem(STORAGE_KEYS.STORED_AUTOLOG).then((stored_autolog) => {
      this.setState({
        autologEnabled: (stored_autolog && stored_autolog === "true") ? true : false,
        autologText: (stored_autolog && stored_autolog === "true") ? AUTOLOG_ON : AUTOLOG_OFF,
      })
    });
  }

  applySettings() {
    var disableAutoLogin = this.state.autologEnabled;

    if(!disableAutoLogin)
      AsyncStorage.removeItem(STORAGE_KEYS.STORED_AUTOLOG).then(() => {
        ToastAndroid.show('Les paramètres ont bien été mis à jour !', ToastAndroid.LONG);
      }).catch((err) => {
        ToastAndroid.show('Les paramètres n\'ont pas été mis à jour !', ToastAndroid.LONG);
      });

    if(disableAutoLogin)
      AsyncStorage.setItem(STORAGE_KEYS.STORED_AUTOLOG, "true").then(() => {
        ToastAndroid.show('Les paramètres ont bien été mis à jour !', ToastAndroid.LONG);
      }).catch((err) => {
        ToastAndroid.show('Les paramètres n\'ont pas été mis à jour !', ToastAndroid.LONG);
      });
  }

  renderDropdown() {
    var items = Object.keys(PROMOS);

    return items.map((key, index) => {
      return (
        <Picker.Item label={ PROMOS[key] } key={ index } value={ items[index] }/>
      );
    });
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
              onPress={ () => { return false; } }>
              <Text>Changer de groupe</Text>
              <Picker
                style={ { width: 300 } }
                selectedValue={ this.state.selectedItem }
                onValueChange={ (promo) => { this.setState({ selectedItem: promo }); } }
                mode="dropdown">
                { this.renderDropdown() }
              </Picker>
            </SettingRow>


            <SettingRow style={ styles.bottomAction }>
              <Button title="Appliquer" onPress={ this.applySettings.bind(this) } />
            </SettingRow>

          </ScrollView>
        </SideBar>
      );
  }
}
