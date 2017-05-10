import  React, { Component } from 'react';

import {
  Image,
  ScrollView,
  View,
} from 'react-native';

import SideBar from '../components/SideBar';

import PROMOS from '../utils/promo';
import AJAX from '../utils/ajaxURL';

export default class Fichiers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group: PROMOS[this.props.route.group],
      files: [],
    };
  }
}
