import React from 'react';
import { StyleSheet, Text, View , TextInput} from 'react-native';
import NavigationIcon from './NavigationIcon';
import { Container, Header, Content, Form, Item, Input, Label, Button, Card, CardItem } from 'native-base';

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
        <Container> 
          <Text style={styles.top}>Register</Text>             
          <Card style={styles.card}>
            <Form style={{marginBottom:'10%'}}> 
              <Item floatingLabel>
                <Label>Name</Label> 
                <Input onChangeText={(text) => this.setState({name: text})} value={this.state.name}/>
              </Item>
              <Item floatingLabel>
                <Label>UserName</Label> 
                <Input  onChangeText={(text) => this.setState({username: text})}
                 value={this.state.userName}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input 
                  secureTextEntry
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}/>
              </Item>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}/>
              </Item>
              <Item floatingLabel>
                <Label>Phone Number</Label>
                <Input onChangeText={(text) => this.setState({phoneNum: text})}
               value={this.state.phoneNum}/>
              </Item>
            </Form>
            {this.state.response.error && <Text style={styles.inputLabel}>{this.state.response.error}</Text>}

            <Button block light onPress={this.handleSubmit.bind(this)}>
                <Text>Submit</Text>
            </Button>

          </Card>  
          <NavigationIcon navigation={this.props.navigation}/>      
         
          </Container>

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
      credentials : 'include',
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
  card: {
    zIndex:-1,
  },
  top: {
    textAlign: 'center',  
    marginTop:"30%",    
  
  }
});

