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

export default function Account() {
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [text, setText] = useState('');
    const [to_user, setTo_user] = useState('');
    const [color, setColor] = useState('');
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState(null);
    // const [website, setWebsite] = useState('');
    // const [avatarUrl, setAvatarUrl] = useState('');
    // const [fullname, setFullname] = useState('');
    // const [hobby, setHobby] = useState('');
    const session = useSession();

    useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`id, username`)
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUserId(data.id);
                setUsername(data.username)
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

    async function updateProfile() {
        try {
            setLoading(true);

            const updates = {
                created_at: new Date(),
                user_id: userId,
                text,
                color,
                to_username: to_user,
            };

            const { error } = await supabase.from('chats').insert(updates);

            if (error) {
                throw error;
            }
            // else { console.log(JSON.stringify(updates, null, 2)), "second time" }

            Alert.alert('Successfully updated', text);
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
                .select(`text,to_username,color`)
                .eq('user_id', userId);
            if (error) {
                throw error;
            }
            if (data) {
                setMessages(data);
                console.log(JSON.stringify(messages, null, 2));
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }


    const renderItem = ({ item }) => (
        <View style={{ marginVertical: 10, flexDirection: "row", gap: 10 }}>
            <View style={{ padding: 2, width: 60, alignItems: "center" }} >
                <Text style={{ color: item.color, fontSize: 10, fontWeight: "bold" }}>To- {item.to_username}</Text>
            </View>
            <View style={{ height: 100, backgroundColor: "gray", alignItems: "center", justifyContent: "center", width: 250, borderRadius: 10 }} >
                <Text style={{ color: item.color, fontSize: 15 }}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar backgroundColor="#FFE400" style='auto' />
            <ScrollView >
                <View>
                    <View style={[styles.verticallySpaced,]}>
                        <Text style={styles.label}>
                            From
                        </Text>
                        <TextInput
                            value={username}
                            placeholder="Enter your email"
                            autoCapitalize={'none'}
                            style={styles.input}
                            aria-disabled
                        />
                    </View>
                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>To</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setTo_user(text);
                            }}
                            value={to_user || ''}
                            placeholder="To"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Message</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setText(text);
                            }}
                            value={text || ''}
                            placeholder="Message"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={[styles.verticallySpaced, { opacity: loading ? 0.5 : 1, marginTop: 10 }]}>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={updateProfile}
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFAE00', padding: 10, borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: "500", }}>{loading ? 'Loading ...' : 'Update chat'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.verticallySpaced, { opacity: loading ? 0.5 : 1, marginTop: 10 }]}>
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
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFAE00', padding: 10, borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: "500", }}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.verticallySpaced, { opacity: loading ? 0.5 : 1, marginTop: 10 }]}>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => router.push('../(cricbuzzApp)/home/(header)/featured')}
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFAE00', padding: 10, borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: "500", }}>Go To cricbuzz Homepage</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data={messages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />

                </ScrollView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#FFE400",
    },
    verticallySpaced: {
        paddingVertical: 6,
        alignSelf: 'stretch',
    },
    input: {
        borderBottomWidth: 3,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 5,
    },
    txt: {
        color: "blue",
        textAlign: "center",
        marginTop: 15,
        fontWeight: "500",
    },
    label: {
        fontWeight: "500",
        fontSize: 16,
        color: "#FF8300"
    },
    error: {
        color: 'red',
        fontSize: 10
    }
});

