import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { StyleSheet, View, Alert, ScrollView, Text, FlatList } from 'react-native';
import { useSession } from '../../lib/session';
import { router } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function PersonalChatBox() {
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [text, setText] = useState('');
    const [to_user, setTo_user] = useState('Deepak Das');
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState(null);
    const [COLOR, setCOLOR] = useState("");
    const session = useSession();

    useEffect(() => {
        if (session) {
            getProfile();
            getChat();
        }
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`id, username,color`)
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUserId(data.id);
                setUsername(data.username)
                setCOLOR(data.color)
                console.log(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateChatTable() {
        try {
            setLoading(true);
            const updates = {
                created_at: new Date(),
                user_id: userId,
                text,
                color: COLOR,
                to_username: to_user,
            };
            const { error } = await supabase.from('chats').insert(updates);
            if (error) {
                throw error;
            }
            // else { console.log(JSON.stringify(updates, null, 2)), "second time" }
            // Alert.alert('Successfully updated', text);
            await getChat();
        } catch (error) {
            Alert.alert("Error", error);
        } finally {
            setLoading(false);
        }
    }


    async function getChat() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');
            const { data, error } = await supabase
                .from('chats')
                .select(`text, to_username , color, created_at`)
                .eq('user_id', userId);
            if (error) {
                throw error;
            }
            if (data) {
                setMessages(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }


    const renderItem = ({ item }) => {
        return (
            username !== item.to_username ? (
                <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                    <View style={{ flex: 1.5 }} >
                    </View>
                    <View style={{ backgroundColor: "#dcf8c6", borderRadius: 5, flex: 4, paddingTop: 10, paddingHorizontal: 10, marginRight: 5 }} >
                        <Text style={{ color: item.color, fontSize: 15, marginBottom: 10 }}>{item.text}</Text>
                        <Text style={{ color: item.color, fontSize: 10, textAlign: 'right' }}>
                            {/* {new Date(item.created_at).toLocaleDateString()}  */}
                            {new Date(item.created_at).toLocaleTimeString()}
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={{ margin: 5, flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                    <View style={{ backgroundColor: "#cccccc", borderRadius: 5, flex: 4, paddingTop: 10, paddingHorizontal: 10, marginRight: 5 }} >
                        <Text style={{ color: item.color, fontSize: 15, marginBottom: 10 }}>{item.text}</Text>
                        <Text style={{ color: item.color, fontSize: 10, textAlign: 'right' }}>
                            {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                        </Text>
                    </View>
                    <View style={{ flex: 1.5 }} >
                    </View>
                </View>
            )
        )
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150}
            style={styles.container}
        >

            <StatusBar backgroundColor="#25D366" style='auto' />
            <View style={{ backgroundColor: "#075E54", alignItems: "center", padding: 12, flexDirection: "row", justifyContent: "space-between", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Text style={{ textAlign: "center", color: "white", fontSize: 20, fontWeight: "bold" }}>
                    {username}
                </Text>
                <View style={{ opacity: loading ? 0.5 : 1 }}>
                    <TouchableOpacity
                        disabled={loading}
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
                    >
                        <AntDesign name="logout" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 630, borderBottomWidth: 2, borderBottomColor: "red", backgroundColor: "white" }}>
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
            <View style={{ flexDirection: "row", gap: 10, padding: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: "space-between" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <TextInput
                        onChangeText={(text) => {
                            setText(text);
                        }}
                        value={text || ''}
                        placeholder="Type message"
                        autoCapitalize={'none'}
                        style={{ justifyContent: 'center', backgroundColor: 'white', borderRadius: 5, height: 36, borderColor: "black", borderWidth: 1, paddingLeft: 10 }}
                    />
                </View>
                <View style={{ flex: 0 }}>
                    <TouchableOpacity
                        disabled={loading}
                        onPress={updateChatTable}
                        style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#34B7F1', borderRadius: 22, height: 44, width: 44, paddingLeft: 5 }}
                    >
                        <Ionicons name="send-sharp" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#25D366",
    },
});

