import React, { Component } from 'react';

import {
  AsyncStorage,
  DatePickerIOS,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from 'react-native';

const window = Dimensions.get('window');

import LightBox from 'react-native-lightbox';

import Icon from '../res/img/calendar.png';

import SideBarIOS    from '../iosComponents/SideBarIOS';
import PROMOS     from '../utils/promo';
import CALENDAR   from '../utils/dashboardUtils';
import URLS from '../utils/ajaxURL';

const styles = StyleSheet.create({

  container: {
      flex: 2,
      width: window.width,
      height: window.height,
  },

  img: {
    flex: 1,
    width: window.width,
    height: window.height / 2,
  },

  welcome: {
    alignSelf: "center",
    fontSize: 20,
  },

  text: {
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 10,
  },

});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    var str = this.retrieveDate();

    this.state = {
      group: this.props.route.group,
      nom: this.props.route.nom,
      date: new Date(),
      renderDate: new Date(),
      timeOffset: (-1) * (new Date()).getTimezoneOffset() / 60,
      url: str,
      refresh: false,
    };
  }

  retrieveDate(date) {
    let now = (date) ? date : new Date();
    let beginning = new Date(CALENDAR.BEGINNIG_CALENDAR);

    let diff = Math.abs(beginning.getTime() - now.getTime());
    let week = Math.floor(diff / (1000 * 3600 * 24 * 7)) + 1;
    let dayOfWeek = now.getDay();

    if(dayOfWeek === 0)
    {
      dayOfWeek = 1;
      week++;
    }

    if(dayOfWeek === 6)
    {
      dayOfWeek = 1;
      week++;
    }

    return 'http://www.iut-fbleau.fr/EDT/consulter/EDT/'+week.toString()+'-'+dayOfWeek.toString()+'-'+PROMOS[this.props.route.group]+'.gif';
  }

  onChangeDate(date) {
    //console.log("New date: " + date);
    this.setState({ date: date });
    this.retrieveDate(date);
  }

  refreshController() {
    this.setState({ refresh: true });
    this.retrieveDate();
    this.forceUpdate();
    this.setState({ refresh: false });
  }

  render() {
    return (
      <SideBarIOS group={ this.state.group } nom={ this.state.nom } navigator={ this.props.navigator }>
        <ScrollView style={ styles.container }
          refreshControl={
              <RefreshControl
                refreshing={ this.state.refresh }
                onRefresh={ this.refreshController.bind(this) }
                tintColor="#00FF00"
                title="Chargement..."
                titleColor="#FFFFFF"
                colors={['#000000', '#FFFFFF', '#F44336']}
                progressBackgroundColor="#FFFFFF"
                />
          }>
          <Text style={ styles.welcome }>Bonjour { this.state.nom.toUpperCase() } !</Text>
          <Text style={ styles.welcome }>Voici les cours de la journée !</Text>
          <DatePickerIOS
            date={ this.state.date }
            mode="date"
            timeZoneOffsetInMinutes={ this.state.timeOffset * 60 }
            onDateChange={ this.onChangeDate.bind(this) }/>

            <LightBox>
              <Image resizeMode="cover" source={{ uri: this.state.url }} style={ styles.img } />
            </LightBox>
        </ScrollView>
      </SideBarIOS>
    );
  }
}
