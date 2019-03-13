import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class Map extends React.Component {
  constructor (props) {
    super(props)

    this.state = {data : [], locationResult: "", hasLocationPermissions: false, mapRegion:{latitude:0, longitude:0, latitudeDelta:0,longitudeDelta:0}}
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this._getLocationAsync();
    this.timer = setInterval(() => this.fetchData(), 1000)
  }

  componentWillUnmount()
  {
    clearInterval(this.timer);
  }
  fetchData()
  {
    var self = this;
    fetch('http://10.11.17.55:3000/api/performances')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
      //console.log(responseJson);
      return self.setState({data : responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
  }
  ///SOON change to continuous call for location function
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
     this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
     //console.log("I fell")
   };
  render() {
    //console.log(this.state)

    if (this.state.hasLocationPermissions == false || this.state.locationResult == "") {
      return (<Text>Loading</Text>)
    }
    else {
      let {latitude, longitude, latitudeDelta, longitudeDelta} = this.state.mapRegion;
      console.log(this.state);
      return (
        <MapView
          style={{ flex: 1 , width: "100%", height: "100%"}}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          animateToViewingAngle={{angle:50, duration:1000}}
        >
        <MapView.Marker
          coordinate={{latitude, longitude}}
          title={"IT WAS ME DIO!"}
          description={"This is a DescriPtion"}
        />
        {this.state.data.map((performance, index) => {
                    console.log("I am pre");

          console.log(performance);
          let {latitude, longitude} = performance.location;
          console.log(latitude)
          return <MapView.Marker
          key = {index}
          coordinate={{latitude, longitude}}
          title={performance.title}
          description={"This is a DescriPtion"}
        />
        })}
        </MapView>

      );
    }
    
  }
}
