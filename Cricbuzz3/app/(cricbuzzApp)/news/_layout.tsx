import { Stack, router } from 'expo-router'
import React from 'react'
// import { Image, TouchableOpacity, View } from 'react-native'
// import { AntDesign } from '@expo/vector-icons';

const _layout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#009170',
            },
            headerTintColor: "white",
            headerTitleStyle: {
                color: 'white',
                fontWeight: "400"
            },
            headerTitleAlign: "center",
            statusBarColor: "black",
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="(header)" options={{
                title: "News",
            }} />

        </Stack>
    )
}

export default _layout;