import React from 'react';
import { View } from 'react-native';
import MessageList from '../../../../components/messageList';
import { router } from 'expo-router';

const messagesData = [
    {
        id: 1,
        user: {
            username: 'Wjknjkuser1',
            profilePicture: 'https://source.unsplash.com/user/c_v_r/1900x800',
        },
        lastMessage: 'Hey, how are you?',
        timestamp: '5 minutes ago',
    },
    {
        id: 2,
        user: {
            username: 'Wser2',
            profilePicture: 'https://source.unsplash.com/user/c_v_r/1900x800',
        },
        lastMessage: 'Hey, how are you?bjkbdsjkbjdjd',
        timestamp: '50 minutes ago',
    },
    {
        id: 3,
        user: {
            username: 'Shuser1',
            profilePicture: 'https://source.unsplash.com/user/c_v_r/1900x800',
        },
        lastMessage: 'Hey, how are you?',
        timestamp: '52 minutes ago',
    },
];

const MessagesScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
            <MessageList messages={messagesData} />
        </View>
    );
};

export default MessagesScreen;