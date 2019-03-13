import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './front-end/MapContainer'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Map: {
    screen: MapContainer, 
    navigationOptions:{
      header:null}
    }
  }, 
);

const App = createAppContainer(MainNavigator); 

export default App;