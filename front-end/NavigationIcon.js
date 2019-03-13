import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Card, CardItem } from 'native-base';

const navigationTargets = ['Login', 'Register', 'Map', 'AddPerformance', 'Recommendations']
export default class NavigationIcon extends React.Component {
    constructor (props){
        super(props)
        this.state = {open:false}
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        //console.log("I was clicked")
        this.setState({open:!this.state.open})
    }

    onNav (val) {

        this.props.navigation.navigate(val);
        this.onClick()
    }

    logout()
    {
        fetch('http://10.11.17.55:3000/logout', {credentials : 'include'})
      .then((response) => {
        return response.json();
      }).then((payload => console.log(payload)));
      this.props.navigation.navigate("Map");
    }

    render() {
        if (this.state.open) {
            return(
                <View style={styles.opened}>
                    <View style={styles.container}>
                    <Button block light onPress={this.logout.bind(this)} style={styles.button}>
                        <Text>Logout</Text>
                    </Button>
                    {navigationTargets.map((val, ind) => {
                        return (
                            <Button key={ind} block light onPress={this.onNav.bind(this, val)} style={styles.button}>
                                <Text>{val}</Text>
                            </Button>                              
                        )
                    })}                    
                    </View>
                    
                    <TouchableHighlight style={styles.circleInv} onPress={this.onClick}>
                        <View/>
                    </TouchableHighlight>
                </View>
            )
        }
        else {
            return(
                <TouchableHighlight style={styles.circle} onPress={this.onClick}>
                    <View/>
                </TouchableHighlight>

            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        top:50,
        
    },
    inner: {
        marginLeft: 10,
        marginRight: 10,

    },
    opened:{
        backgroundColor: "rgba(100,100,100,0.5)",        
        zIndex: 100000000000000,
        position:"absolute",
        width:"100%",
        height:"100%",
        elevation:5,
    },
    text: {
        top:"50%",
        color:"white",
        textAlign:'center',
    },
    circle: {
        zIndex: 10000,
        borderRadius:40,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "cyan",
        backgroundColor: "grey",
        width:50,
        height:50,
        bottom: 20,
        right: 20,
        position:"absolute"
    },
    circleInv: {
        zIndex: 10000,
        borderRadius:40,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "grey",
        backgroundColor: "cyan",
        width:50,
        height:50,
        bottom: 20,
        right: 20,
        position:"absolute"
    },
    button: {
        margin:10
    }
  });
