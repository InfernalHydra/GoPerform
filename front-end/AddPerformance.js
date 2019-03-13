import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { Container, Header, Content, Form, Item, Input, Label, Button, Card, CardItem } from 'native-base';

import NavigationIcon from './NavigationIcon';
export default class AddPerformance extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data : "",
      title: "",
      address: "",
      password: "",
      latitude: "",
      longitude: "",
    };
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //console.log(status)
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }    
    

    let location = await Location.getCurrentPositionAsync({maximumAge:3000});    
            
    this.setState({ locationResult: JSON.stringify(location) });
    
    // Center the map on the location we just fetched.
     this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude});
     //console.log("I fell")
   };

   _reverseGeocode = async (address) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //console.log(status)
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }
    let coords = await Location.geocodeAsync(address);
    //console.log(coords);
    this.setState({latitude : coords[0].latitude, longitude: coords[0].longitude});
   }

  render() {
    return (
      <Container> 
      <Text style={styles.top}>Add a Preformance</Text>             
      <Card style={styles.card}>
        <Form style={{marginBottom:'10%'}}> 
          <Item floatingLabel>
            <Label>Title</Label>
            <Input onChangeText={(text) => this.setState({title: text})}
            value={this.state.title}/>
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input 
              onChangeText={(text) => this.setState({address: text})}
              value={this.state.address}/>
          </Item>          
        </Form>
        <Button block light onPress={this.handleSubmit.bind(this)}>
            <Text>Submit</Text>
        </Button>
      </Card>  
      <NavigationIcon navigation={this.props.navigation}/>            
  </Container>      
    );
  }
  handleSubmit = async () =>
  {
    //console.log(this.state)
    var payload = this.state;
    //console.log(payload)
    if(this.state.address != "")
    {
      await this._reverseGeocode(payload.address);
      payload = this.state;
      // console.log(this.state.latitude + " " + this.state.longitude);
    }
    //console.log(payload);
    fetch('http://10.11.17.55:3000/add', {
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
  .then(response => response.json()).then(payload => {
      if(payload.status == "success")
      {
        this.props.navigation.navigate('Map');
      }
  }); 
  }

}

const styles = StyleSheet.create({
  card: {
  },
  top: {
    textAlign: 'center',  
    marginTop:"30%",    
  
  }
});