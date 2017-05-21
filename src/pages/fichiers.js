import  React, { Component } from 'react';

import {
  Dimensions,
  Image,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import SideBar from '../components/SideBar';

import OpenFile from 'react-native-doc-viewer';

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

  previewContainer: {
    padding: 15,
    margin: 15,
  },

  preview: {
    width: 115,
    height: 115,
  },

  filename: {
    alignSelf: 'auto',
    fontSize: 20,
  }
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

  lookingFile(element, filename) {
    var URI = AJAX.UPLOAD_BASE + this.state.group + "/" + filename;
    var promptName = filename.split(".")[0];
    OpenFile.openDoc([{
        url: URI,
        fileName: promptName
      }], (error, url) => {
        if(error) console.error(error);
        else console.log("Opening URI: " + url);
    });
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

      if(Array.isArray(t))
        t.forEach(function(one) { tmp.push(JSON.parse(one)); });
      else
        tmp.push(t);

      __that__.setState({ files: tmp });
      __that__.forceUpdate();
    })
    .catch((error) => {
      console.error(error);
      __that__.setState({ files: [] });
    });
  }

  renderFiles() {
    var toReturn = [];

    this.state.files.forEach((chunck) => {
      var filename = Object.keys(chunck);
      var mime = (filename[0].split("."))[1];
      toReturn.push(
        <View style={ styles.previewContainer }>
          <TouchableOpacity onPress={ this.lookingFile.bind(this, chunck, filename[0]) }>
            <Image
              source={ (mime === "pdf") ? PDF : IMG }
              style={ styles.preview }
            />
          </TouchableOpacity>
          <Text style={ styles.filename }>{ filename }</Text>
        </View>
      );
      });

      return toReturn;
  }

  render() {
    console.log(this.state.files);
    let t = this.renderFiles();
    return (
      <SideBar group={ this.state.originalGroup } nom={ this.state.nom } navigator={ this.props.navigator }>
        <ScrollView style={ styles.cont }>
          { t }
        </ScrollView>
      </SideBar>
    );
  }
}
