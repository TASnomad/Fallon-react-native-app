import React, { Component } from 'react';

import {
  AsyncStorage,
  Button,
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import SideBar    from '../components/SideBar';
import URLS from '../utils/ajaxURL';

const flowSheet = StyleSheet.create({

  scrollContainer: {
      flexGrow: 1,
  },

  nothingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nothingText: {
    fontSize: 24,
  },

  retryBtn: {
    marginTop: 30,
  },

  flowBlox: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0F0F2',
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },

  flowContent: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  flowHeader: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
  }

});

export default class Flow extends Component {
  constructor(props) {
    super(props);

    var __that__ = this;

    this.state = {
      data: [],
      asData: false,
      requestPending: false,
      urlToRetrieve: URLS.MYFLOW,
      group: __that__.props.route.group,
      nom: __that__.props.route.nom,
      refresh: false,
    };

    this.retrieveFlow();
  }

  retrieveFlow() {

    var __that__ = this;

    this.setState({ requestPending: true });

    fetch(this.state.urlToRetrieve, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.props.route.nom })
    }).then((data) => {
      this.setState({
        requestPending: false,
        refresh: false,
      });
      if(data.ok)
        return data.json();
      else
        return null;
    }).then((res) => {
      __that__.setState({
        data: res.data,
        asData: true
      });
      __that__.forceUpdate();
    }).catch(function(error) {
      __that__.setState({
        data: [],
        asData: false,
        requestPending: false,
        refresh: false
      });
    });
  }

  renderEmptyFlow() {
    return (
      <View
        style={ flowSheet.nothingContainer }
        refreshControl= {
          <RefreshControl
            refreshing={ this.state.refresh }
            onRefresh={ this.retrieveFlow.bind(this) }
            tintColor="#00FF00"
            title="Chargement..."
            titleColor="#FFFFFF"
            colors={['#000000', '#FFFFFF', '#F44336']}
            progressBackgroundColor="#FFFFFF" />
        }>
        <Text style={ flowSheet.nothingText }>Pas de messages pour le moment !</Text>
        <Button style={ flowSheet.retryBtn } title="Réessayer" onPress={ this.retrieveFlow.bind(this) }/>
      </View>
    );
  }

  renderFlow() {

    return this.state.data.map((chunck, index) => {
      /* Dummy way to capitalize the first letter ... */
      // chunck.type_imprevu = chunck.type_imprevu.charAt(0).toUpperCase() + chunck.type_imprevu.slice(1);
      return (
        <View key={ index } style={ flowSheet.flowBlox }>
          <Text style={ flowSheet.flowHeader }>
            Envoyé le { chunck.date_mes } par { (chunck.envoye_par == "") ? "l'administrateur" : chunck.envoye_par }
          </Text>

          <Text style={ flowSheet.flowContent }>
            { chunck.message }
          </Text>

        </View>
      );
    });
  }

  render() {

    let toRender = null;

    (this.state.asData && this.state.data.length !== 0)
      ? toRender = this.renderFlow() : toRender = this.renderEmptyFlow();

    return (
      <SideBar group={ this.state.group } nom={ this.state.nom } navigator={ this.props.navigator }>
      <ScrollView
        contentContainerStyle={ flowSheet.scrollContainer }
        refreshControl= {
          <RefreshControl
            refreshing={ this.state.refresh }
            onRefresh={ this.retrieveFlow.bind(this) }
            tintColor="#00FF00"
            title="Chargement..."
            titleColor="#FFFFFF"
            colors={['#000000', '#FFFFFF', '#F44336']}
            progressBackgroundColor="#FFFFFF" />
        }>
          { toRender }
        </ScrollView>
      </SideBar>
    );
  }
}
