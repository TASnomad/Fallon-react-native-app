import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';

import bootsplash from './pages/bootsplash';
import login from './pages/login';
import test from './pages/test';

var styles = StyleSheet.create({ container: { flex: 1 } });

// Toutes les routes de l'application
const ROUTES = {
  bootsplash: bootsplash,
  login: login,
  test: test
};

export default class Main extends Component {

  // La classe du Main n'a pour le moment besoin d'autre chose
  constructor(props) {
    super(props);
  }

  // Handler assez propre pour gérer toute les routes
  navRenderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={ route } navigator={ navigator } />;
  }

  render() {
    return (
      <Navigator
        style={ styles.container }
        initialRoute={ { name: 'login' } }
        renderScene={ this.navRenderScene }
        configureScene={ () => { return Navigator.SceneConfigs.FadeAndroid; } }
      />
    );
  }
}
