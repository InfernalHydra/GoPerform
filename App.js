import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './front-end/Map'
export default class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data : ""
    };
  }

  componentWillUnmount()
  {
    clearInterval(timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Map/>
        <Text>Yo</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    height:"100%",
    width:"100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
