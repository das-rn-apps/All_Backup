import { Modal, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const ModalPhoto = ({ modalVisible, url, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ margin: 30 }}>
                    <Image source={url} style={{ borderRadius: 30, height: "75%", width: "100%" }} />
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={{ fontSize: 30, color: "red", textAlign: "right" }}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalPhoto;

const styles = StyleSheet.create({});
