import { Pressable, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const User = () => {
    const [user, setUser] = useState([]);
    const [input, setInput] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await axios.get("http://192.168.12.209:8000/users");
                setUser(response.data);
            } catch (error) {
                console.log("error fetching employee data", error);
            }
        };
        fetchUsersData();
    }, []);

    console.log("23", user);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "white",
                }}
            >
                <Ionicons
                    onPress={() => router.back()}
                    style={{ marginLeft: 10 }}
                    name="arrow-back"
                    size={24}
                    color="black"
                />
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 7,
                        gap: 10,
                        backgroundColor: "white",
                        borderRadius: 3,
                        height: 40,
                        flex: 1,
                    }}
                >
                    <AntDesign
                        style={{ marginLeft: 10 }}
                        name="search1"
                        size={20}
                        color="black"
                    />
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        style={{ flex: 1 }}
                        placeholder="Search"
                    />

                    {user.length > 0 && (
                        <View>
                            <Pressable onPress={() =>
                                router.push("/AddUser")
                            }>
                                <AntDesign name="pluscircle" size={30} color="#0072b1" />
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            </View>

            {user.length > 0 ? (
                <View style={{ padding: 10 }}>
                    <FlatList
                        data={user}
                        renderItem={({ item }) => {
                            if (item?.userName.toLowerCase().includes(input.toLowerCase())) {
                                return (
                                    <View
                                        style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}
                                    >
                                        <View
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 8,
                                                padding: 10,
                                                backgroundColor: "#4b6cb7",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text style={{ color: "white", fontSize: 16 }}>{item?.userName?.charAt(0)}</Text>
                                        </View>

                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.userName}</Text>
                                            <Text style={{ marginTop: 5, color: "gray" }}>
                                                {item?.userId} ({item?.phoneNumber})
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }
                        }}
                    />
                </View>
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text>No Data</Text>
                    <Text>Press on the plus button and add your Employee</Text>
                    <Pressable onPress={() => router.push("/AddUser")}>
                        <AntDesign
                            style={{ marginTop: 30 }}
                            name="pluscircle"
                            size={24}
                            color="black"
                        />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default User;

const styles = StyleSheet.create({});
