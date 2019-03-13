import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './front-end/MapContainer'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Register from './front-end/Register';
import Login from './front-end/Login';


const MainNavigator = createStackNavigator({
 
  Map: {
    screen: MapContainer, 
    navigationOptions: {
      header:null
    }
  },
  Register: {
    screen: Register, 
    navigationOptions:{
      header:null
    }
  },  Login: {
    screen: Login, 
    navigationOptions:{
      header:null
    }
  },
});

const App = createAppContainer(MainNavigator); 

export default App;