import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Button,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import PROMOS from '../utils/promo.js';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    var grp = props.route.group;

    let update = this.calculateDate(grp);

    this.state = {
      dayOfWeek: update.day,
      weekNumber: update.week,
      group: grp,
      url: update.url
    };

    console.log(this.state.url);
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

    console.log(dayOfWeek)
    console.log(week);

    let obj = {
      day: dayOfWeek,
      week: week,
      url: 'http://www.iut-fbleau.fr/EDT/consulter/EDT/'+ week.toString() + '-' + dayOfWeek.toString() + '-' + PROMOS[grp] + '.gif'
    }

    return obj;
  }

  render() {
    return(
      <View>
        <Image
         style={{width: 450, height: 500}}
         source={{ uri: this.state.url }}/>
      </View>
    );
  }
}
