import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './front-end/MapContainer'
import Recommendations from './front-end/Recommendations'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Register from './front-end/Register';
import Login from './front-end/Login';
import AddPerformance from './front-end/AddPerformance'


const MainNavigator = createStackNavigator({
  Map: {
    screen: MapContainer, 
    navigationOptions: {
      header:null
    }
  },
  Login: {
    screen: Login, 
    navigationOptions: {
      header:null
    }
  },
  Register: {
    screen: Register, 
    navigationOptions:{
      header:null
    }
  }, 
  Recommendations: {
    screen: Recommendations,
    navigationOptions: {
      header:null
    }
  },
  AddPerformance: {
    screen: AddPerformance,
    navigationOptions: {
      header:null
    }
  } 
});

const App = createAppContainer(MainNavigator); 

export default App;