import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

const navigationTargets = ['Home', 'Login', 'Register', 'Map', 'AddPerformance']
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
    render() {
        if (this.state.open) {
            return(
                <View style={styles.opened}>                    
                    <View style={styles.container}>
                        {navigationTargets.map((val, ind) => {
                            return <Button key={ind} title={val} style={styles.inner} onPress={this.onNav.bind(this, val)}/>                                                     
                        })}
                    </View>
                    <TouchableHighlight style={styles.circle} onPress={this.onClick}> 
                        <Text style={styles.text}>-</Text>         
                    </TouchableHighlight>
                </View>
            )
        }
        else {
            return(
                <TouchableHighlight style={styles.circle} onPress={this.onClick}> 
                    <Text style={styles.text}>+</Text>         
                </TouchableHighlight>
                
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        top:50
    },
    inner: {
        marginLeft: 10,
        marginRight: 10,

    },
    opened:{
        backgroundColor: "grey",
        opacity:0.5,
        zIndex:10000000,
        position:"absolute",
        width:"100%",
        height:"100%",
    },
    text: {
        top:"50%",
        color:"white",
        textAlign:'center',
    },
    circle: {
        zIndex: 10000,
        borderRadius:40,
        borderColor: "red",
        backgroundColor: "blue",        
        width:50,
        height:50,
        bottom: 20,
        right: 20,
        position:"absolute"
    },
  });