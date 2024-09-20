import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Messages = (props: any) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity>
                    <Image style={{ width: 60, height: 60, resizeMode: "contain", borderRadius: 30 }}
                        source={require('../assets/myself.jpeg')} />
                </TouchableOpacity>
            </View>
            <View style={styles.subContainer}>
                <Text>Messages of {props.index}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Messages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
    ,
    subContainer: {
        flex: 1,
        justifyContent: "center",
        // marginLeft: 10
    }
})