import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import VideoRecording from './scripts/VideoRecording'
import GetVideosFromGallery from './scripts/GetVideosFromGallery'


const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="VideoRecording">
        <Stack.Screen name="VideoRecording" component={VideoRecording}  options={{headerShown: false }} />
        <Stack.Screen name="GetVideosFromGallery" component={GetVideosFromGallery}  options={{headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

