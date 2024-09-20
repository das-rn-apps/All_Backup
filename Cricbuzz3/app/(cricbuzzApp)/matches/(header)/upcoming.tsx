import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text>HomePage</Text>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})