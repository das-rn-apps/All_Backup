import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import FlashList from '../../../../components/FlashList';

const Chat = () => {
    const route = useRoute();
    const { message, DATA } = route.params;
    // console.log("DATA are ---", DATA, message);
    const [chats, setChats] = useState([]);
    const [currText, setCurrText] = useState("");
    const [toUser, setToUser] = useState(null);
    const [mainUser, setMainUser] = useState(null);

    useEffect(() => {
        getMainUserId();
        getChats();
        setToUser(message._id);
        scrollToBottom();
    }, []);

    const getMainUserId = () => {
        axios.get("http://192.168.194.209:8000/user")
            .then((response) => {
                const userWithEmail = response.data.find(user => user.email === DATA);
                if (userWithEmail) {
                    console.log(userWithEmail._id, "ertyfyghkjhxgu");
                    setMainUser(userWithEmail._id);
                } else {
                    console.log("User with email required email not found");
                }
            })
            .catch((error) => {
                console.log("Mainuser id getting failed", error);
            });
    };

    const getChats = () => {
        axios.get("http://192.168.194.209:8000/chat")
            .then((response) => {
                setChats(response.data);
            })
            .catch((error) => {
                console.log("Chat fetching failed", error);
            });
    };

    const sendMessage = async () => {
        try {
            if (currText.trim() === "") {
                return;
            }
            const newMessage = {
                from_id: mainUser,
                to_id: toUser,
                message: currText,
            };
            console.log(newMessage);
            await axios.post("http://192.168.194.209:8000/chat", newMessage);
            await getChats();
            await scrollToBottom();
            await setCurrText("");
        } catch (error) {
            Alert.alert(
                "Message sending failed",
                "An error occurred during messaging"
            );
            console.log("chatting failed", error);
        }
    };


    const renderMessageItem = ({ item }) => (
        <View style={{ padding: 10, backgroundColor: "#262626", margin: 10, borderRadius: 10, marginLeft: 80, }}>
            <View style={{}}>
                <Text style={{ color: "white" }}>{item.message}</Text>
            </View>
            <View style={{ alignSelf: "flex-end", marginTop: 5 }}>
                <Text style={{ color: "gray", fontSize: 7 }}>{item.createdAt}</Text>
            </View>
        </View>
    );
    const flatListRef = useRef(null);
    useEffect(() => {
        getChats();
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        }, 10);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
            <View style={{ flex: 1 }}>
                <FlashList
                    data={chats}
                    renderItem={renderMessageItem}
                    keyExtractor={item => item._id}
                    initialNumToRender={1}
                    onContentSizeChange={scrollToBottom}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, padding: 10 }}>
                <TextInput
                    style={{ flex: 1, backgroundColor: '#383838', borderRadius: 30, color: "white", paddingVertical: 7, paddingHorizontal: 20, fontSize: 15 }}
                    placeholder={`Write to ${message.username}......`}
                    value={currText}
                    onChangeText={text => setCurrText(text)}
                />
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={sendMessage}>
                    <MaterialIcons name="send" size={40} color="#047436" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chat;
