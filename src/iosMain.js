import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';

import bootsplash from './iosPages/iosBootsplash';
import login from './pages/login';
import dashboard from './iosPages/Dashboard';
import settings from './pages/settings';
import flow from './pages/flow';

var styles = StyleSheet.create({ container: { flex: 1 } });

// Toutes les routes de l'application
const ROUTES = {
  bootsplash: bootsplash,
  login: login,
  dashboard: dashboard,
  settings: settings,
  flow: flow,
};

var _navigator;

console.log(...Navigator);

const noBackSwipe = {
  ...Navigator.SceneConfigs.HorizontalSwipeJump,
  gestures: {
    pop: {},
  },
};

export default class iosMain extends Component {

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
        configureScene={ () => { return noBackSwipe; } }/>
    );
  }
}
