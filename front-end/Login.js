import React from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import NavigationIcon from './NavigationIcon';
export default class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data : "",
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({email: text})}
            placeholder = "Enter email"
            value={this.state.email}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
            secureTextEntry
            placeholder = "Enter Password"
            style={styles.input}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
        />
        <Button
        onPress={this.handleSubmit.bind(this)}
        title = "Submit"
        >
        </Button>
        <NavigationIcon navigation={this.props.navigation}/>

      </View>
    );
  }
  handleSubmit()
  {
    //console.log(this.state)
    var payload = this.state;
    //console.log(payload);
    fetch('http://10.11.17.56:3000/login', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(payload), // body data type must match "Content-Type" header
  })
  .then(response => {
    response.json();
    console.log(response.json())}
    
  );}
}

const styles = StyleSheet.create({
  container: {
    height:"100%",
    width:"100%",
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '15%',
    paddingLeft: '5%'
  },
  inputLabel: {
    fontSize: 20
  },
  input: {height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 30}
});
