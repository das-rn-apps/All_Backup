import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import MessageList from '../../../../components/messageList';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import axios from 'axios';

const MessagesScreen = () => {
    const DATA = useLocalSearchParams().email;
    console.log("DATA are ---", DATA);
    const navigation = useNavigation();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get("http://192.168.194.209:8000/user")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Fail",
                    "An error occurred during registration"
                );
                console.log("register failed", error);
            });
    };

    const handlePressMessage = (message) => {
        console.log('Pressed message:', message);
        navigation.navigate("chat", { message, DATA });//Repeated times 
        // router.push({ pathname: "./chat", params: { DATA } })
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
            <MessageList messages={users} onPress={handlePressMessage} />
        </View>
    );
};
export default MessagesScreen;