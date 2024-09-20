import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';


const Header = ({ prop }) => {
    // console.log("Proppp is ---",  prop.email)
    const email = prop.email;
    return (
        <View style={{ marginBottom: 7 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
            }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white',
                }}>Instagram</Text>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => { router.push("/(content)/home/notifications") }}>
                        <AntDesign name="hearto" size={24} color="white" style={{ marginRight: 20 }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        console.log("Hekkkkokoo")
                        router.push({ pathname: "/(content)/home/messages", params: { email } })
                    }}>
                        <AntDesign name="message1" size={24} color="white" style={{ marginRight: 0 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})