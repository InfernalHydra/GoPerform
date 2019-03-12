import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data : ""
    };
  }

  componentDidMount()
  {
    this.tick();
    this.timer = setInterval(() => this.tick(), 5000);
  }

  tick()
  {
    var self = this;
    fetch('http://10.11.17.55:3000/')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
      console.log(responseJson);
      return self.setState({data : responseJson.text});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillUnmount()
  {
    clearInterval(timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.data}</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
