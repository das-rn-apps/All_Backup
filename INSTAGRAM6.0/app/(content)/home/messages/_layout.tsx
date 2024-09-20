import { Stack } from 'expo-router'
import React from 'react'
import { View, Text, Image } from 'react-native';
import logoDas from '../../../../assets/logoDas.png';


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
            <Stack.Screen name="chat" options={({ route }) => ({
                headerTitle: () => (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <Image
                            source={route.params.message.profilePicture ? { uri: route.params.message.profilePicture } : logoDas}
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                        />
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
                            {route.params.message.username}
                        </Text>
                    </View>
                )
            })} />
        </Stack>
    )
}

export default _layout;
