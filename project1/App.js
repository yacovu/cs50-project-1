/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
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
      timerIsRunning: true,
      needToWork: true
    }
  }

  componentDidMount() {   
    if (this.state.timerIsRunning){
      this.initTimer()
      this.fixSecondsLayout()
      this.interval = setInterval(this.startTimer, 1000)
      this.setState(() => ({timerIsRunning: false}))
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.timerIsRunning
  }

  initTimer = () => {
    if (this.state.needToWork) {
      this.setState(prevState => ({minutes: 25, seconds: 1, fixedSeconds: "00"}))
      // this.setState(prevState => ({minutes: 0, seconds: 10, fixedSeconds: "00"}))
    }
    else {
      this.setState(prevState => ({minutes: 5, seconds: 1, fixedSeconds: "00"}))
      // this.setState(prevState => ({minutes: 0, seconds: 5, fixedSeconds: "00"}))
    }
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

 fixSecondsLayout = () => {
   this.setState(() => ({fixedSeconds: "0" + this.state.seconds}))
 }

 timeIsUp = () => {
    return this.state.minutes === 0 && this.state.seconds === 0
  }

  changeTimerType = () => {
    this.setState(prevState => ({needToWork: !prevState.needToWork}))
    this.initTimer()
  }

  startTimer = () => {
    this.decreaseTimerByOneSecond()
    if (this.state.seconds < 10) {
      this.fixSecondsLayout()
      if (this.state.seconds === 0) {    
        if (this.timeIsUp()) { 
          vibrate()          
          this.changeTimerType()
        }
        else {
          this.decreaseTimerByOneMinute() 
        }
      }
    }
  }

  startClick = () => {
    if (!this.state.timerIsRunning) {
      this.setState(() => ({timerIsRunning: true}))
      clearInterval(this.interval)
      this.interval = setInterval(this.startTimer, 1000)
    }
  }

  resetClick = () => {
    clearInterval(this.interval)
    this.setState(() => ({timerIsRunning: false}))
    this.initTimer()
    this.interval = setInterval(this.startTimer, 1000)
  }

  stopClick = () => {
    this.setState(() => ({timerIsRunning: false}))
    clearInterval(this.interval)
  }


render() {
    return (
      <View 
        style={styles.container}>
        <Counter
          minutes={this.state.minutes}
          seconds={this.state.fixedSeconds}/>
          <SafeAreaView>
            <Button title="start" onPress={this.startClick} />
            <Button title="stop" onPress={this.stopClick} />
            <Button title="reset" onPress={this.resetClick} />
          </SafeAreaView>
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
