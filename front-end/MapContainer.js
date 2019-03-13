import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './Map/Map'
import NavigationIcon from './NavigationIcon';
export default class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {"acc":null}
    }

    render() {
        return (
            <View style={styles.container}>
                <Map/>
                <NavigationIcon navigation={this.props.navigation}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
  });