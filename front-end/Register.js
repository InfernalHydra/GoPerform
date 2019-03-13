import React from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import NavigationIcon from './NavigationIcon'
export default class Register extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      email: "",
      phoneNum: "",
      response: ""
    };
  }

  componentWillUnmount()
  {
  }

  render() {
    console.log(this.state);
    if(this.state.status == "success")
    {
      this.props.navigation.navigate('Home');
    }
    else
    {
      return (
        <View style={styles.container}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
              style={styles.input}
              placeholder = "Enter Name"
              onChangeText={(text) => this.setState({name: text})}
              value={this.state.name}
          />
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({username: text})}
              placeholder = "Enter Username"
              value={this.state.userName}
          />
  
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
              placeholder = "Enter Password"
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
          />
  
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
              style={styles.input}
              placeholder = "Enter Email"
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
          />
  
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            placeholder = "Enter Phone Number"
              style={styles.input}
              onChangeText={(text) => this.setState({phoneNum: text})}
              value={this.state.phoneNum}
          />
          {this.state.response.error && <Text style={styles.inputLabel}>{this.state.response.error}</Text>}
          <Button
          onPress={this.handleSubmit.bind(this)}
          title = "Submit"
          >
          </Button>
          <NavigationIcon navigation={this.props.navigation}/>
  
        </View>
      );
    }

  }

  handleSubmit()
  {
    //console.log(this.state)
    var payload = this.state;
    //console.log(payload);
    fetch('http://10.11.17.55:3000/register', {
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
  .then(response => response.json()).then((payload) => {this.setState({
    response : payload,
    name: "",
    username: "",
    password: "",
    email: "",
    phoneNum: "",
  })}); 
  }

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
