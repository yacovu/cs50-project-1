/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {vibrate} from './utils';

class Counter extends React.Component {
  constructor() {
    super()
    
  }

 render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.minutes}:{this.props.seconds}</Text> 
      </View>
    );
  }
}


export default class App extends React.Component{
   constructor() {
    super()
    this.state = {
      //TODO: change from seconds to minutes
      minutes: 0,
      seconds: 0,
      fixedSeconds: 0,
      runTimer: true,
      needToWork: true
    }
  }

  componentDidMount() {   
    if (this.state.runTimer){
      this.initTimer()
      this.interval = setInterval(this.startTimer, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.runTimer
  }

  initTimer = () => {
    if (this.state.needToWork) {
      this.setState(prevState => ({minutes: 25, seconds: 0}))
      this.fixSeconds()
    }
    else {
      this.setState(prevState => ({minutes: 5, seconds: 0}))
    }
    this.setState(prevState => ({needToWork: !prevState.needToWork}))
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

 checkIfTimeIsUp = () => {
    if (this.state.minutes === 0 && this.state.seconds === 0) {
      vibrate()
      changeTimerType()
    }
  }

  changeTimerType = () => {
    
  }

  startTimer = () => {
    if (this.state.seconds < 10) {
      this.fixSeconds()
      // alert(this.state.fixedSeconds)
      if (this.state.seconds === 0) {
        this.decreaseTimerByOneMinute()
        this.checkIfTimeIsUp()
      }    
    }
    this.decreaseTimerByOneSecond()
  }


render() {
  return (
    <View 
      style={styles.container}
    >
      <Counter
        minutes={this.state.minutes}
        seconds={this.state.fixedSeconds}
      />
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
