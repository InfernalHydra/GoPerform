import React, {Component} from 'react';
import {StyleSheet, Button, Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

export default class UserModal extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: true,
        };
    }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    //   console.log(this.props.data);
    //   console.log(this.props.index);
    return (
      <View>
        <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style = {styles.container}>
                <View style = {styles.otherContainer}>
                <Text style = {{fontSize : 20, textAlign : 'center'}}>{this.props.data[this.props.index].title}</Text>
                <Text style = {{textAlign : 'center'}}>{this.props.data[this.props.index].username}</Text>
                <Text style = {{textAlign : 'center'}}>{this.props.data[this.props.index].email}</Text>
                <Text style = {{textAlign : 'center'}}>{this.props.data[this.props.index].phoneNumber}</Text>
                <Text style = {{textAlign : 'center'}}>{this.props.data[this.props.index].social}</Text>
                <TouchableHighlight
                    onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                </TouchableHighlight>
                </View>
            </View>
            </Modal>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'column',
        backgroundColor: '#00000080',
    },
    otherContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff',
        padding: 20
    },
    inputLabel: {
      fontSize: 20
    },
    input: {height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 30}
  });