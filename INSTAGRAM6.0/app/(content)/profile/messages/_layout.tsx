import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{
            headerTitleStyle: {
                color: 'white',
                fontWeight: "400",
            },
            headerStyle: {
                backgroundColor: '#000000',
            },
            statusBarColor: "black",
            headerTitleAlign: "center",
            headerTintColor: "white",
        }}>
            <Stack.Screen name="index" options={{
                headerTitle: "Messages"
            }} />
            <Stack.Screen name="chat" options={{
                // headerShown: false,
                headerTitle: "Chat"
            }} />
            {/* <Stack.Screen name="messages" options={{
                headerTitle: "Messages"
            }} />
            <Stack.Screen name="notifications" options={{
                headerTitle: "Notifications"
            }} /> */}

        </Stack>
    )
}

export default _layout;