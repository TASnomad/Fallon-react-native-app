import React, { Component } from 'react';
import {
  BackAndroid,
  Navigator,
  StyleSheet
} from 'react-native';

import bootsplash from './pages/bootsplash';
import login from './pages/login';
// import test from './pages/test';
import dashboard from './pages/dashboard';
import settings from './pages/settings';

var styles = StyleSheet.create({ container: { flex: 1 } });

// Toutes les routes de l'application
const ROUTES = {
  bootsplash: bootsplash,
  login: login,
  // test: test,
  dashboard: dashboard,
  settings: settings,
};

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if(_navigator && _navigator.getCurrentRoutes().length > 1)
  {
    if(_navigator.route.name === "bootsplash" || _navigator.route.name === "login")
      return false;

    _navigator.pop();
    return true;
  }
  else return false;
});

export default class Main extends Component {

  // La classe du Main n'a pour le moment besoin d'autre chose
  constructor(props) {
    super(props);
  }

  // Handler assez propre pour gérer toute les routes
  navRenderScene(route, navigator) {
    _navigator = navigator;
    var Component = ROUTES[route.name];
    return <Component route={ route } navigator={ navigator } />;
  }

  render() {
    return (
      <Navigator
        style={ styles.container }
        initialRoute={ { name: 'bootsplash' } }
        renderScene={ this.navRenderScene }
        configureScene={ () => { return Navigator.SceneConfigs.FadeAndroid; } }
      />
    );
  }
}
