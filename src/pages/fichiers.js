import  React, { Component } from 'react';

import {
  Dimensions,
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

import SideBar from '../components/SideBar';

import PROMOS from '../utils/promo';
import AJAX from '../utils/ajaxURL';

import PDF from '../res/img/pdf.png';
import IMG from '../res/img/jpg.png';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#FFFFFF',
    width: window.width,
    height: window.height,
  },
});

export default class Fichiers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalGroup: this.props.route.group,
      nom: this.props.route.nom,
      group: PROMOS[this.props.route.group],
      files: [],
    };

    this.fetchFiles();
  }

  fetchFiles() {

    var __that__ = this;

    var req = {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "group": __that__.state.group })
    };

    fetch(AJAX.INFOS, req)
    .then((res) => {
        if(res.ok) return res.json();
    })
    .then((data) => {
      var tmp = [];
      var t = JSON.parse(data.files);

      for(var i = 0, len = t.length; i < len; i++) tmp.push(t[i]);

      __that__.setState({ files: tmp });
      __that__.renderFiles();
    })
    .catch((error) => {
      console.error(error);
      __that__.setState({ files: [] });
    });
  }

  renderFiles() {
    console.log(this.state.files);
    console.log(Object.keys(this.state.files));
    return this.state.files.map((chunck, index) => {
      // var mime = chunck[];
    });
  }

  render() {
    return (
      <SideBar group={ this.state.originalGroup } nom={ this.state.nom } navigator={ this.props.navigator }>
        <ScrollView style={ styles.cont }>
        </ScrollView>
      </SideBar>
    );
  }
}
