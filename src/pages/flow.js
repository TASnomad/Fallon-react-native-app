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
    borderColor: 'red',
  },

  flowContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
      urlToRetrieve: 'http://fallon.16mb.com/Fallon/webservices/flow.php',
      group: __that__.props.route.group,
      nom: __that__.props.route.nom,
      refresh: false,
    };

    this.retrieveFlow();
  }

  retrieveFlow() {

    var __that__ = this;

    this.setState({ requestPending: true });

    fetch(this.state.urlToRetrieve).then((data) => {
      this.setState({
        requestPending: false,
        refresh: false,
      });

      return data.json();
    }).then((res) => {
      this.setState({
        data: res.data,
        asData: true
      });

      __that__.forceUpdate();
    }).catch(function(error) {
      this.setState({
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
        <Text style={ flowSheet.nothingText }>Wow. Aucune absences ou retards !</Text>
        <Button style={ flowSheet.retryBtn } title="Réessayer" onPress={ this.retrieveFlow.bind(this) }/>
      </View>
    );
  }

  renderFlow() {

    return this.state.data.map((chunck, index) => {
      /* Dummy way to capitalize the first letter ... */
      chunck.type_imprevu = chunck.type_imprevu.charAt(0).toUpperCase() + chunck.type_imprevu.slice(1);
      return (
        <View key={ index } style={ flowSheet.flowBlox }>
          <Text>
            { chunck.type_imprevu }  le { chunck.date_mes }
          </Text>

          <Text style={ flowSheet.flowContent }>
            { chunck.nom_prof }
          </Text>

        </View>
      );
    });
  }

  render() {

    let toRender = null;

    console.log(this.state);

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
