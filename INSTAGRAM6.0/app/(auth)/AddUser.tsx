import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Alert,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const adddetails = () => {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [mobileNo, setMobileNo] = useState("");

    const handleRegister = () => {
        const userData = {
            userName: name,
            userId: userId,
            phoneNumber: mobileNo,
        };
        console.log("UserData is ---", userData)
        axios
            .post("http://192.168.12.209:8000/addUser", userData)
            .then((response) => {
                Alert.alert(
                    "Registration Successful",
                    "You have been registered successfully"
                );
                setName("");
                setUserId("");
                setMobileNo("");
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Fail",
                    "An error occurred during registration"
                );
                console.log("register failed", error);
            });
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 20 }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        User Full Name
                    </Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="enter your name"
                        placeholderTextColor={"black"}
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>User Id</Text>
                    <TextInput
                        value={userId}
                        onChangeText={(text) => setUserId(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="User Id"
                        placeholderTextColor={"black"}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        Mobile Number
                    </Text>
                    <TextInput
                        value={mobileNo}
                        onChangeText={(text) => setMobileNo(text)}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                        placeholder="Mobile No"
                        placeholderTextColor={"black"}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                        backgroundColor: "#ABCA78",
                        padding: 10,
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                        Add Employee
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default adddetails;

const styles = StyleSheet.create({});
