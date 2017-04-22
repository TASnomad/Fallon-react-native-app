import React, { Component } from 'react';

import {
  AsyncStorage,
  View,
  Text,
  ScrollView,
} from 'react-native';

import SideBar    from '../components/SideBar';

export default class flow extends Component {
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
    };
  }

  retrieveFlow() {
    this.setState({ requestPending: true });

    fetch(this.state.urlToRetrieve).then(function(data) {
      console.log(data.data);
    }).error(function(error) {
      this.setState({
        data: [],
        asData: false,
        requestPending: false,
      });
    });
  }

  renderEmptyFlow() {
    return (
      <ScrollView>
        <h1>Wow. Aucune absences ou retatrds !</h1>
      </ScrollView>
    );
  }

  renderFlow() {
    return this.state.data.map((chunck, index) => {
      /* Dummy way to capitalize the first letter ... */
      chunck.type_imprevu = chunck.type_imprevu.charAt(0).toUpperCase() + chunck.type_imprevu.slice(1);
      return (
        <View key={ index }>
          <Text>
            { chunck.type_imprevu } de  { chunck.nom_prof } le { chunck.data_mes }
          </Text>
        </View>
      );
    });
  }

  render() {
    var t = null;
    (!this.state.asData && this.state.data.length === 0) ?
      t = (<ScrollView><h1>Wow. Aucune absences ou retatrds !</h1></ScrollView>) : t = this.renderFlow();
      console.dir(t);
    return (
      <SideBar group={ this.state.group } nom={ this.state.nom } navigator={ this.props.navigator }>
        { t }
      </SideBar>
    );
  }
}
