import React, {Component} from 'react';
import {StyleSheet, Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import NavigationIcon from './NavigationIcon';
import { Container, Header, Content, Form, Item, Input, Label, Button, Card, CardItem } from 'native-base';

export default class Recommendations extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            popData : [],
        };
    }
    componentWillMount()
    {
        //fake api call omegalul
        var self = this;
        fetch('https://qsz08t9vtl.execute-api.us-east-1.amazonaws.com/production/recs?category=music/artists&sample=CF58BFC9-275B-401A-841C-C1A11756D80C')
        .then(res => res.json()).then(payload => self.setState({popData: payload.results}));
    }
  render() {
    //   console.log(this.props.data);
    //   console.log(this.props.index);
    //console.log(this.state)
    if(this.state.popData.length == 0)
    {
        return (<Text>Loading</Text>);
    }
    else
    {
        return (
            <View style = {{width : '100%', height : '100%', marginTop: "20%"}}>
                <Container>
                    <Text style = {{fontSize : 20, textAlign : 'center'}}>Recommendations</Text>
                    {/* <Text style = {{textAlign : 'center'}}>{this.props.data[this.props.index].username}</Text> */}
                    {this.state.popData.slice(0, 5).map((recommendation, index) => {
                        return <Card key={index} style={{textAlign : 'center'}}><Text>{recommendation.name}</Text></Card>;
                    })}
                </Container>
              <NavigationIcon navigation={this.props.navigation}/>
            </View>
          );
    }
  }
}