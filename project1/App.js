/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
   constructor() {
    super()
    this.state = {
      //TODO: change from seconds to minutes
      minutes: 24,
      seconds: 59,
      fixedSeconds: 59,
      run: true,
      checkmark: 0,
    }
  }
   componentDidMount() {
    // if (this.state.run) {
      setInterval(this.runTimer, 1000)
    // }
    // else {
    //   return false
    // }
  }

  addCheckmark = () => {
    this.setState(prevState => ({checkmark: prevState.checkmark + 1}))
  }

  decreaseTimerByOneMinute = () => {
    this.setState(prevState => ({
        seconds: 59,
        fixedSeconds: 59,
        minutes: prevState.minutes - 1
      }))
  }

  decreaseTimerByOneSecond = () => {
    this.setState(prevState => ({seconds: prevState.seconds - 1, fixedSeconds: this.state.seconds}))
  }

 fixSeconds = () => {
   this.setState(prevState => ({fixedSeconds: "0" + this.state.seconds}))
 }

runTimer = () => {
  this.decreaseTimerByOneSecond()
  if (this.state.seconds < 10) {
    this.fixSeconds()
    if (this.state.seconds === 0) {
      this.decreaseTimerByOneMinute()
    }    
  }
}


render() {
  return (
    <View style={styles.container}>
      <Text>{this.state.minutes}:{this.state.fixedSeconds}</Text> 
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
