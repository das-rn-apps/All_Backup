import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { StyleSheet, View, Alert, ScrollView, Text, FlatList, Pressable, Image } from 'react-native';
import { useSession } from '../../lib/session';
import { router } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import Receipent from './Receipent';
import { AntDesign } from '@expo/vector-icons';



export default function PersonalChatBox() {
    const [list, setList] = useState([]);

    const session = useSession()
    useEffect(() => {
        if (session) getChat();
    }, [session]);

    // async function getChat() {
    //     try {
    //         if (!session?.user) throw new Error('No user on the session!');
    //         const { data, error } = await supabase
    //             .from('chats')
    //             .select('to_username, text, created_at, to_userId')
    //             .or(`to_userId.eq.${session?.user.id}`, `user_id.eq.${session?.user.id}`)
    //             .order('created_at', { ascending: false });

    //         if (error) {
    //             console.error(error);
    //         } else {
    //             const uniqueUsernames = [...new Set(data.map(chat => chat.to_username))];

    //             const latestMessages = await Promise.all(
    //                 uniqueUsernames.map(async (username) => {
    //                     const userMessages = data.filter(chat => chat.to_username === username);
    //                     const latestMessage = userMessages.length > 0 ? userMessages[0] : null;
    //                     return latestMessage;
    //                 })
    //             );
    //             setList(latestMessages);
    //             console.log(JSON.stringify(latestMessages, null, 2));
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             Alert.alert(error.message);
    //         }
    //     }
    // }
    async function getChat() {
        try {
            if (!session?.user) throw new Error('No user on the session!');
            const userIdFromSession = session?.user.id;
            const { data, error } = await supabase
                .from('chats')
                .select('user_id, to_userId, text, created_at, to_username,from_username')
                .or(`user_id.eq.${userIdFromSession},to_userId.eq.${userIdFromSession}`)
                .order('created_at', { ascending: false });

            // console.log(JSON.stringify(data, null, 2));
            if (error) {
                console.error(error);
            } else {
                const uniqueMessages = [];
                const userMessageMap = new Map();

                data.forEach((message) => {
                    const key = message.user_id === userIdFromSession ? message.to_userId : message.user_id;

                    if (!userMessageMap.has(key)) {
                        userMessageMap.set(key, message);
                        uniqueMessages.push(message);
                    }
                });

                setList(uniqueMessages);
                // console.log(JSON.stringify(uniqueMessages, null, 2));
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        }
    }




    const renderItem = ({ item }) => {

        let createdAtDate = new Date(item.created_at);
        let year = createdAtDate.getFullYear();
        let month = createdAtDate.getMonth() + 1; // Month is 0-indexed, so add 1
        let day = createdAtDate.getDate();
        let hour = createdAtDate.getHours();
        let minute = createdAtDate.getMinutes();
        let second = createdAtDate.getSeconds();

        let todayDate = new Date();
        let formattedDate = `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`;
        let formattedTime = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;

        return (
            <View>
                <TouchableOpacity style={{ marginHorizontal: 10, marginVertical: 3, padding: 10, borderRadius: 5, flexDirection: "row", backgroundColor: "#EAF8F7" }}
                    onPress={() => {
                        console.log("Goingg");
                        router.push('/SpecificUser');
                        // router.push('/single');
                    }}
                >
                    <View style={{ height: 60, width: 60, borderRadius: 30, marginRight: 20, flex: 1 }} >
                        <Image source={require('../../assets/logoDas.png')} style={{ height: 60, width: 60 }} />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={{ color: item.color, fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
                            {item.to_userId === session?.user.id ? item.from_username : item.to_username}
                        </Text>
                        <Text style={{ color: "gray", fontSize: 13 }}>{item.text.length > 23 ? `${item.text.slice(0, 20)}...` : item.text}</Text>
                    </View>
                    <View style={{ flex: 1.5 }}>
                        {
                            todayDate.getFullYear() === year && todayDate.getMonth() === month - 1 && todayDate.getDate() === day ? (
                                <Text style={{ color: "#6a737b", fontSize: 12 }}>{formattedTime}</Text>
                            ) : (
                                <Text style={{ color: "#6a737b", fontSize: 12 }}>{formattedDate}</Text>
                            )
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar style='auto' />
            <View style={{ flexDirection: "row", marginHorizontal: 10, justifyContent: "space-between", marginVertical: 10 }}>
                <View style={{ backgroundColor: "#D6FFFC", borderRadius: 10, flex: 20 }}>
                    <Receipent />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Confirm Sign Out',
                            'Are you sure you want to sign out?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        supabase.auth.signOut();
                                        router.push('./Auth');
                                    },
                                },
                            ],
                            { cancelable: false }
                        );
                    }}
                    style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
                >
                    <AntDesign name="logout" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "black", height: 2, marginBottom: 5 }} />
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#EAF8F7",
    },
});

