import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const FlashScreen = () => {
    return (
        <View style={styles.container} >
            <StatusBar style='auto' backgroundColor="#668cff" />
            <View style={styles.background} />
            <View style={styles.logo}>
                <Image source={require('../../../assets/logoDas.png')} style={styles.image} />
                <Text style={styles.text}>Messaging App</Text>
            </View>
        </View>
    )
}

export default FlashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: "relative",
        height: "100%",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#668cff"
    },
    logo: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        position: "absolute",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
    },
    image: {
        height: 150,
        width: 150
    }
})