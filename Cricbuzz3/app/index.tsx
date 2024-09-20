import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const index = () => {
    return (
        // <Redirect href="/(auth)/PersonalChatBox" />
        <Redirect href="/(cricbuzzApp)/home/(header)/featured" />
    )
}

export default index

const styles = StyleSheet.create({});