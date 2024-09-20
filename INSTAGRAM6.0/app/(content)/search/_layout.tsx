import { Stack } from 'expo-router'
import React from 'react'

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
            headerShown: false,
        }}>
            <Stack.Screen name="index" options={{
                title: "Current Matches",
            }} />

        </Stack>
    )
}

export default _layout;