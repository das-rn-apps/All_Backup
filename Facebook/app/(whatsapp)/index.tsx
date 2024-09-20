import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const Index = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Iloremabhjabjhbjbbdbb</Text>
            <Pressable
                onPress={() => {
                    router.push("home");
                }}
            >
                <Text>
                    Go to country_page
                </Text>
            </Pressable>
        </View>
    )
}
export default Index

const styles = StyleSheet.create({})