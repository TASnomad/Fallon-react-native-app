import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Button,
  Text,
  Picker,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-icon-checkbox';

import logo from '../res/img/fallon.png';

import STORAGE_KEYS from '../utils/keys';
import PROMOS from '../utils/promo';

import URLS from '../utils/ajaxURL';


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent:'center',
      backgroundColor: '#FFFFFF'
   },

   loginContainer: {
     flex: 1,
     marginTop: 50,
     alignItems: 'center',
   },

   logoContainer: {
     justifyContent: 'center',
     alignItems: 'center',
   },

   logo: {
     justifyContent: 'center',
     alignItems: 'stretch'
   },

   footer: {
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#FFFFFF',
     height: 75,
   },

   input: {
      width: 300,
      color: '#555555',
      padding: 10,
      height: 50,
      borderColor: '#32C5E6',
      borderWidth: 1,
      borderRadius: 4,
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      marginBottom: 10
   },

   button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderColor: '#4CAF50',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
   },

   label: {
     width: 275,
     alignSelf: 'center',
     textAlign: 'center',
     fontSize: 20,
     fontWeight: '600',
     color: '#FFFFFF',
   },

   error: {
     alignSelf: 'center',
     textAlign: 'center',
     fontSize: 20,
     color: 'red',
     backgroundColor: '#FFFFFF',
     fontWeight: '600'
   },

});

var _navigator = null;

export default class Login extends Component {

  constructor(props) {
    super(props);

    _navigator = props.navRef;

    this.state = {
      login: '',
      password: '',
      pendingLoginRequest: false,
      result: null,
      error: false,
      errorTxt: '',
      remember: false,
      gcmToken: this.props.route.token || '',
      btnOpcaity: 1,
      selectedItem: '',
    };

    if(this.state.gcmToken === ' ')
    {
      AsyncStorage.getItem(STORAGE_KEYS.STORED_TOKEN).then((data) => {
        this.setState({ gcmToken: data });
      });
    }

  }

  renderDropdown() {
    var items = Object.keys(PROMOS);

    return items.map((key, index) => {
      return (
        <Picker.Item label={ PROMOS[key] } key={ index } value={ items[index] }/>
      );
    });
  }

  handlerLoginError(msg) {
    this.setState({ error: true, errorTxt: msg });
  }

  submit() {

    let login = this.state.login;
    let password = this.state.password;

    this.setState({ pendingLoginRequest: true, error: false, errorTxt: ' ' });

    var req =
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "log": login, "pass": password, "token": this.state.gcmToken, "group": this.state.selectedItem })
    };

    return fetch(URLS.CONNEXION, req)
    .then((response) => {
      this.setState({ pendingLoginRequest: false });

      if(response.status === 200)
        return response.json();

      if(response.status === 500)
         return response.json().then((data) => { throw data; });

    })
    .then((data) => {
      if(this.state.remember)
      {
          try
          {
            AsyncStorage.setItem(STORAGE_KEYS.STORED_LOGIN, this.state.login, () => {
              AsyncStorage.setItem(STORAGE_KEYS.STORED_PASSWORD, this.state.password, () => {
                AsyncStorage.setItem(STORAGE_KEYS.STORED_TOKEN, this.state.gcmToken, () => {
                  AsyncStorage.setItem(STORAGE_KEYS.STORED_AUTOLOG, "true", () => {
                    AsyncStorage.setItem(STORAGE_KEYS.STORED_GROUP, data.group, () => {
                      this.props.navigator.push({ name: "dashboard", group: data.group, nom: data.nom, navRef: _navigator });
                    });
                  });
                });
              });
            });
          } catch (e) {
            console.log(e);
          }
      }
      this.props.navigator.push({ name: "dashboard", group: data.group, nom: data.nom });
    })
    .catch((error) => { this.handlerLoginError(error.error); });
  }

  render() {
    return(
      <View style = {styles.container}>
      <View style={ styles.logoContainer }>
        <Image style={ styles.logo } source={ logo } />
      </View>
        <View style={ styles.loginContainer}>
            <TextInput
              placeholder = 'Entre ton login'
              returnKeyTpe={ 'next' }
              style = {styles.input}
              multiline={ false }
              underlineColorAndroid = { 'transparent' }
              onChangeText={ (text) => { this.setState({ login: text }) } }
              onSubmitEditing={ (event) => { this.refs.mdp.focus(); } }/>

            <TextInput
              ref='mdp'
              placeholder='Mot de passe'
              multiline={ false }
              secureTextEntry={ true }
              style = { styles.input }
              underlineColorAndroid = { 'transparent' }
              onChangeText={ (text) => { this.setState({ password: text }) } } />

            <Picker
              style={ { width: 300 } }
              selectedValue={ this.state.selectedItem }
              onValueChange={ (promo) => { this.setState({ selectedItem: promo }); } }
              mode="dropdown">
              { this.renderDropdown() }
            </Picker>

            <TouchableOpacity
              style={[ styles.button, { opacity: this.state.btnOpcaity } ]}
              onPressIn={ () => { this.setState({ btnOpcaity: 0.5 }); } }
              onPress={ () => { this.submit(); } }
              onPressOut={ () => { this.setState({ btnOpcaity: 1 }); } }>

              <Text style={ styles.label }> { 'Connexion'.toUpperCase() } </Text>
            </TouchableOpacity>

            <CheckBox
              label="Connexion automatique"
              size={ 30 }
              checked={ this.state.remember }
              onPress={ (checked) => { this.setState({ remember: checked }); } }
              checkedIconName="check-box"
              uncheckedIconName="check-box-outline-blank"
            />

        </View>

        <View style={ styles.footer }>
          <Text style={ styles.error }>{ this.state.errorTxt }</Text>
        </View>
      </View>
    );
  }
}
