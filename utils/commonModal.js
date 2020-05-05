import React from 'react';
import { Modal, Alert, Text, Button, StyleSheet, View } from 'react-native';

export default class CommonModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => { console.log("Modal has been closed.") }}>
                <View style={styles.centeredView}>
                    <Text>{this.props.modalText}</Text>
                    <Button onPress={this.props.closeModal} title={this.props.modalButtonText}></Button>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: "center",
        alignItems: "center"
    },
});
