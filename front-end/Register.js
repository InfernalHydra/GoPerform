import React from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import NavigationIcon from './NavigationIcon'
export default class Register extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      name: "",
      userName: "",
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
      return (
        <View>
        <View style={styles.container}>
          <View style={styles.reeses}>
            <Text style={styles.inputLabel}>Name</Text>
          </View>
          <View style={styles.pb}>
            <TextInput
              style={{...styles.input , ...styles.pb}}
                  placeholder = "Enter Name"
                  onChangeText={(text) => this.setState({name: text})}
                  value={this.state.name}
            />
          </View>

          <View style={styles.LMAO}></View>


          <View style={styles.reeses}>
            <Text style={styles.inputLabel}>Username</Text>
          </View>
          <View style={styles.pb}>

            <TextInput
            style={{...styles.input , ...styles.pb}}
                onChangeText={(text) => this.setState({username: text})}
                placeholder = "Enter Username"
                value={this.state.userName}
            />
          </View>
          <View style={styles.LMAO}></View>

          <View style={styles.reeses}>

          <Text style={styles.inputLabel}>Password</Text>
          </View>
          <View style={styles.pb}>

          <TextInput
              placeholder = "Enter Password"
              secureTextEntry
              style={{...styles.input , ...styles.pb}}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
          />
          </View>
          <View style={styles.LMAO}></View>


          <View style={styles.reeses}>

          <Text style={styles.inputLabel}>Email</Text>
          </View>
          <View style={styles.pb}>

          <TextInput
          style={{...styles.input , ...styles.pb}}
              placeholder = "Enter Email"
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
          />
          </View>
          <View style={styles.LMAO}></View>


          <View style={styles.reeses}>

          <Text style={styles.inputLabel}>Phone Number</Text>
          </View>
          <View style={styles.pb}>

          <TextInput
            placeholder = "Enter Phone Number"
            style={{...styles.input , ...styles.pb}}
              onChangeText={(text) => this.setState({phoneNum: text})}
              value={this.state.phoneNum}
          />
          </View>

          <View style={styles.LMAO}></View>
          <View style={styles.LMAO}></View>
          <View style={styles.LMAO}></View>
          <View style={styles.LMAO}></View>
          <View style={styles.LMAO}></View>
          <View style={styles.LMAO}></View>
          <View style={styles.LMAO}></View>

          {this.state.response.error && <Text style={styles.inputLabel}>{this.state.response.error}</Text>}

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
  .then(response => response.json()).then((payload) => {
    if(payload.status == 'success')
    {
      this.props.navigation.navigate('Map');
    }
    else
    {
      this.setState({
        response : payload,
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNum: "",
      })
    }
    }); 
  }
}
const styles = StyleSheet.create({
  container: {
    height:"100%",
    width:"100%",
    backgroundColor: '#D1CFE2',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '15%',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  inputLabel: {
    fontSize: 40,
    color: 'white'

  },
  input: {height: "100%", borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 30, fontSize: 42},
  LMAO: {
    height: 40
  },
  reeses: {
    backgroundColor: '#9CADCE',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center'
  },
  pb: {
    width: '100%',
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
