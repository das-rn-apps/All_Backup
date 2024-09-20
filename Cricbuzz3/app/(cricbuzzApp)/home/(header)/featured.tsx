import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Pressable } from 'react-native'
import React from 'react'
import Match from '../../../../components/match';
// import { router } from 'expo-router';
// import Match from '../../../../components/match'
// import PagerView from 'react-native-pager-view'


const Feature = () => {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = screenWidth - 20;

    return (
        <ScrollView style={styles.container}>
            <View style={{ width: "100%", padding: 10 }}>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>MATCHES</Text>
            </View>
            <View>
                <Match />
            </View>
        </ScrollView>
    )
}

export default Feature

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // backgroundColor: "yellow",
    },
    match: {
        height: 200,
        width: '100%',
        // backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        gap: 30,
    },
    team: {
        fontSize: 18,
    }
})