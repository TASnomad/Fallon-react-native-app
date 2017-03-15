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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);


      let d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate()+4-(d.getDay()||7));
      let week = Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);

      this.state = {
        dayOfWeek: d.getDay() - 1,
        weekNumber: week + 18,
      };
  }

  getCurrentWeek() {
    let date = new Date();
    let day = date.getDay();
    console.log(day.getWeekNumber());
  }

  render() {
    return(
      <View>
        <Image
         style={{width: 450, height: 500}}
         source={{ uri: 'http://www.iut-fbleau.fr/EDT/consulter/EDT/'+ this.state.weekNumber + '-' + this.state.dayOfWeek + '-DUTFA2.gif' }}/>
      </View>
    );
  }
}
