import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome6 } from '@expo/vector-icons';
import { color } from 'react-native-elements/dist/helpers';
// import OTPTextInput from "react-native-otp-textinput";


const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");



    return (
        <View style={styles.container} >
            <StatusBar style='auto' />
            <View style={styles.background} />
            <View style={styles.content}>
                <View style={{ marginTop: 44, height: 22, width: 117, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        Phone Number
                    </Text>
                    <TouchableOpacity style={{ left: 100 }} disabled={loading} onPress={() => {
                        console.log("Phone number is -", phoneNumber);
                    }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: loading ? "gray" : "#007AFF" }}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 100, width: "100%", backgroundColor: "white", marginTop: 90 }}>
                    <View style={{ height: 47, borderBottomWidth: 1, borderTopWidth: 1, borderColor: "#ebebe0", justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 22, color: "#007AFF", fontWeight: "500" }}>
                            India
                        </Text>
                        <TouchableOpacity onPress={() => { console.log("Arrow") }}>
                            <FontAwesome6 name="arrow-right" size={24} color="#007AFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 53, borderBottomWidth: 1, borderColor: "#ebebe0", justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 30, borderRightWidth: 1, borderColor: "#ebebe0", textAlign: "center", flex: 1 }}>
                            +91
                        </Text>
                        <TextInput
                            style={{ fontSize: 30, flex: 4, backgroundColor: `red`, borderRightWidth: 1, borderColor: "#ebebe0", paddingLeft: 30 }}
                            placeholder='Enter your number' keyboardType='numeric'
                            maxLength={10}
                            onChangeText={(value) => {
                                if (value.length == 10) {
                                    setLoading(false);
                                    console.log("Yessssssss");
                                    setPhoneNumber(value);
                                }
                                else {
                                    setLoading(true);
                                    console.log("No");
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: "relative",
        height: "100%",
        width: "100%",
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    content: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        position: "absolute",
    },
    text: {
        color: "orange",
        fontSize: 30,
        fontWeight: "bold",
    },
    image: {
        height: 150,
        width: 150
    }
})