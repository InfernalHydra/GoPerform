import React from 'react';
import { StyleSheet, Text, View , TextInput, Button, Image} from 'react-native';
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
      <View>
      <View style={styles.container}>

        <View style={styles.reeses}>

        <Text style={styles.inputLabel}>Email</Text>
        </View>
        <View style={styles.pb}>

        <TextInput
            style={{...styles.input , ...styles.pb}}
            onChangeText={(text) => this.setState({email: text})}
            placeholder = "Enter email"
            value={this.state.email}
        />
        </View>
        <View style={styles.MIDLMAO}></View>


        <View style={styles.reeses}>
        <Text style={styles.inputLabel}>Password</Text>
        </View>

        <View style={styles.pb}>

        <TextInput
            secureTextEntry
            placeholder = "Enter Password"
            style={{...styles.input , ...styles.pb}}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
        />
        </View>

        <View style={styles.BIGLMAO}></View>

        <View style={styles.bigB}>

          <Text style={styles.bigT}
            onPress={this.handleSubmit.bind(this)}
          >SUBMIT</Text>
        </View>



      </View>
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
    backgroundColor: '#D1CFE2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '0%',
    paddingLeft: '0%'
  },
  inputLabel: {
    fontSize: 60,
    color: 'white'
  },
  input: {height: "100%", borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 30, fontSize: 42},
  LMAO: {
    height: 20
  },
  MIDLMAO: {
    height: 70
  },
  BIGLMAO: {
      height: 320
    },
  reeses: {
    backgroundColor: '#9CADCE',
    width: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center'
  },
  pb: {
    width: 350,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    height: 50
  },
  bigB: {
    width: 300,
    backgroundColor: '#7EC4CF',
    alignItems: 'center',
    borderRadius: 10
  },
  bigT: {
    color: 'white',
    fontSize: 60
  }
});
