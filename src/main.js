import React, { Component } from 'react';
import {
  BackAndroid,
  Navigator,
  StyleSheet
} from 'react-native';

import bootsplash from './pages/bootsplash';
import login from './pages/login';
import dashboard from './pages/Dashboard';
import settings from './pages/settings';
import flow from './pages/flow';
import infos from './pages/infos';

var styles = StyleSheet.create({ container: { flex: 1 } });

// Toutes les routes de l'application
const ROUTES = {
  bootsplash: bootsplash,
  login: login,
  dashboard: dashboard,
  settings: settings,
  flow: flow,
  infos: infos,
};

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {

  if(_navigator && _navigator.getCurrentRoutes().length > 1)
  {
    _navigator.pop();
    return true;
  }
  else return false;
});

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

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
