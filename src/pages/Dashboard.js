import React, { Component } from 'react';
import {
  AsyncStorage,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from 'react-native';

const window = Dimensions.get('window');

import DatePicker from 'react-native-datepicker';
import LightBox from 'react-native-lightbox';

import Icon from '../res/img/calendar.png';

import SideBar    from '../components/SideBar';
import PROMOS     from '../utils/promo';
import CALENDAR   from '../utils/dashboardUtils';

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

var toPickerFormat = (date) => {
  return date.toLocaleDateString().split("/").reverse().join("-");
};

var formatDate = (date)  => {
    var d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

var _navigator = null;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

    _navigator = props.route.navRef;

    var grp = props.route.group;
    var nom = props.route.nom;

    let update = this.calculateDate(grp);

    console.log(update);

    this.state = {
      dayOfWeek: update.day,
      weekNumber: update.week,
      group: grp,
      nom: nom,
      url: update.url,
      date: formatDate(new Date()),
      refresh: false,
    };
  }

  refreshController()
  {
    this.setState({ refresh: true });
    this.calculateCustomDate(formatDate(new Date()));
    this.setState({ refresh: false });
  }

  calculateCustomDate(dateStr)
  {
    const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    let date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    let dayOfWeek = date.getDay();
    let schoolBeginning = new Date(CALENDAR.BEGINNIG_CALENDAR);
    let diff = Math.abs(date.getTime() - schoolBeginning.getTime());
    let week = Math.round(diff / ONE_WEEK);

    if(dayOfWeek === 0)
    {
      dayOfWeek = 1;
      week += 1;
    }

      else if(dayOfWeek === 6)
      {
        dayOfWeek = 1;
        week += 1;
      }

      this.setState({
        date: dateStr,
        day: dayOfWeek,
        week: week,
        url: 'http://www.iut-fbleau.fr/EDT/consulter/EDT/'+ week.toString() + '-' + dayOfWeek.toString() + '-' + PROMOS[this.state.group] + '.gif',
      });
  }

  calculateDate(grp) {

    /* Calculating the week count between execution date and the beggining of the year school */
    const ONE_WEEK = 1000 * 60 * 60 *  24 * 7;
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    let dayOfWeek = now.getDay();
    let schoolBeginning = new Date(CALENDAR.BEGINNIG_CALENDAR); /* Date stored in a configuration file */
    let diff = Math.abs(now.getTime() - schoolBeginning.getTime());

    let week = Math.round(diff / ONE_WEEK) + 1;

    /**
     * Sunday handling case
     * IDEA: JS sunday for some reasons begins a new week,
     * so we don't need to increment the week counter but only set the day to monday
     */
    if(dayOfWeek === 0)
    {
      dayOfWeek = 1;
      week += 1;
    }

    /**
      * Saturday handling case
      * IDEA: Saturday is the last day of a week in JS for some reasons,
      * so we need to increment the week counter and set dayOfWeek at 1
      */
    else if(dayOfWeek === 6)
    {
      dayOfWeek = 1;
      week += 1;
    }

    let obj = {
      date: toPickerFormat(now),
      day: dayOfWeek,
      week: week,
      url: 'http://www.iut-fbleau.fr/EDT/consulter/EDT/'+ week.toString() + '-' + dayOfWeek.toString() + '-' + PROMOS[grp] + '.gif',
    };

    return obj;
  }

  render() {
    return(
      <SideBar group={ this.state.group } nom={ this.state.nom } navigator={ this.props.navigator }>
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
        <Text style={ styles.welcome }> Bonjour { this.state.nom.toUpperCase() } ! </Text>
        <Text style={ styles.text }> Voici l'emploi du temps du jour</Text>
        <DatePicker
          date={ this.state.date }
          mode="date"
          placeholder="Choisir une date"
          format="YYYY-MM-DD"
          minDate="2016-01-01"
          maxDate="2020-01-01"
          confirmBtnText="Changer"
          cancelBtnText="Annuler"
          onDateChange={ (date) => { this.calculateCustomDate(date); } }
          style={ { alignSelf: "center", marginBottom: 10 } }
          iconSource={ Icon }/>

          <LightBox navigator={ _navigator }>
            <Image resizeMode="cover" source={{ uri: this.state.url }} style={ styles.img } />
          </LightBox>
      </ScrollView>
      </SideBar>
    );
  }
}
