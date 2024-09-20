import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Chat = () => {
    const route = useRoute();
    const { message } = route.params;

    const [chats, setChats] = useState([{ id: 1, toName: message.user.username, fromName: "Deepak", message: message.lastMessage, timestamp: message.timestamp }]);
    const [currText, setCurrText] = useState("");

    const sendMessage = () => {
        if (currText.trim() === "") {
            return;
        }
        const newMessage = {
            id: chats.length + 1,
            toName: message.user.username,
            fromName: "Deepak",
            message: currText,
            timestamp: new Date().toLocaleString()
        };

        setChats([...chats, newMessage]);
        console.log("Message Sent successfully:", currText);
        setCurrText("");
    };

    const renderMessageItem = ({ item }) => (
        <View style={{ padding: 10, backgroundColor: "#262626", margin: 10, borderRadius: 10, marginLeft: 80, }}>
            <View style={{}}>
                <Text style={{ color: "white" }}>{item.message}</Text>
            </View>
            <View style={{ alignSelf: "flex-end", marginTop: 5 }}>
                <Text style={{ color: "gray", fontSize: 7 }}>{item.timestamp}</Text>
            </View>
        </View>
    );
    const flatListRef = useRef(null);

    useEffect(() => {
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
                <FlatList
                    ref={flatListRef}
                    data={chats}
                    renderItem={renderMessageItem}
                    keyExtractor={item => item.id.toString()}
                    initialNumToRender={1}
                    onContentSizeChange={() => scrollToBottom()}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, padding: 10 }}>
                <TextInput
                    style={{ flex: 1, backgroundColor: '#383838', borderRadius: 30, color: "white", paddingVertical: 7, paddingHorizontal: 20, fontSize: 15 }}
                    placeholder={`Write to ${message.user.username}......`}
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
