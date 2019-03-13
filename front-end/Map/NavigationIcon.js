import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NavigationIcon extends React.Component {
    constructor (props){
        super(props)
        this.state = {open:false}
    }
    onClick() {
        this.setState({open:!this.state.open})
    }
    render() {
        return(
            <View styles={styles.circle} />                
        )
    }
}

const styles = StyleSheet.create({
    all : {
        position:"absolute",
    },
    circle: {
        borderRadius:40,
        borderColor:"red",
        backgroundColor:"blue",
        top:100,
        right:100,
        width:100,
        height:100,
        position: "absolute"
    },
  });