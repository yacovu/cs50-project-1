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

const workTime = 25 * 60 //25 minutes
const restTime = 5 * 60 //5 minutes

class Counter extends React.Component {
  constructor() {
    super()    
  }

 render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.time.minutes}:{this.props.time.seconds}</Text> 
      </View>
    );
  }
}


export default class App extends React.Component{
   constructor() {
    super()
    this.state = {
      seconds: 0,
      timerIsRunning: true,
      needToWork: true
    }
  }

  componentDidMount() {   
    if (this.state.timerIsRunning){
      this.initTimer()
      this.interval = setInterval(this.startTimer, 1000)
      this.stopClick()
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
      this.setState(() => ({seconds: workTime}))
    }
    else {
      this.setState(() => ({seconds: restTime}))
    }
  }

  decreaseTimerByOneSecond = () => {
    this.setState(prevState => ({seconds: prevState.seconds - 1}))
  }

  changeTimerType = () => {
    this.setState(prevState => ({needToWork: !prevState.needToWork}))
    this.initTimer()
  }

  startTimer = () => {
    this.decreaseTimerByOneSecond()
    if (this.state.seconds === 0) {    
      vibrate()
      this.changeTimerType() 
    }
  }

  convertToMinutesAndSeconds = (totalSeconds) => {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60

    if (seconds < 10) {
      seconds = "0" + seconds
    }
    if (minutes < 10) {
      minutes = "0" + minutes
    }

    return {minutes: minutes, seconds: seconds}    
  }

  startClick = () => {
    if (!this.state.timerIsRunning) {
      this.setState(() => ({timerIsRunning: true}))
      clearInterval(this.interval)
      this.interval = setInterval(this.startTimer, 1000)
    }
  }

  resetClick = () => {
    this.initTimer()
    this.stopClick()
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
          time={this.convertToMinutesAndSeconds(this.state.seconds)}/>
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
