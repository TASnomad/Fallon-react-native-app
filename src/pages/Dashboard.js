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

import SideBar from '../components/SideBar';
import PROMOS from '../utils/promo';

const styles = StyleSheet.create({

  container: {
      flex: 2,
      width: window.width,
      height: window.height,
      // marginLeft: 100,
      // backgroundColor: 'red',
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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    var grp = props.route.group;
    var nom = props.route.nom;

    let update = this.calculateDate(grp);

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
    let date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    let onejan = new Date(date.getFullYear(), 0, 1);
    let week = Math.ceil( (((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);

    week += 18;

    let dayOfWeek = date.getDay();

    if(dayOfWeek === 0)
      dayOfWeek = 1;

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
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);

    // We had 18 weeks because of the beginning od the school year
    week += 18;

    let dayOfWeek = now.getDay();

    /**
     * Sunday handling case
     * IDEA: JS sunday for some reasons begins a new week,
     * so we don't need to increment the week counter but only set the day to monday
     */
    if(dayOfWeek === 0)
      dayOfWeek = 1;

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
    }

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
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#2196F3', '#FFFFFF', '#F44336']}
              progressBackgroundColor="#69F0AE"
              />
        }>
        <Text style={ styles.welcome }> Bonjour { this.state.nom.toUpperCase() } ! </Text>
        <Text style={ styles.text }> Voici ton emploi du temps pour aujourd'hui</Text>
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
          style={ { alignSelf: "center", marginBottom: 10 } }/>
        <Image
        resizeMode="cover"
        source={{ uri: this.state.url }}
        style={ styles.img } />
      </ScrollView>
      </SideBar>
    );
  }
}
