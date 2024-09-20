import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { StyleSheet, View, Alert, ScrollView, Text } from 'react-native';
import { useSession } from '../../lib/session';
import { router } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';

export default function Account() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [fullname, setFullname] = useState('');
    const [hobby, setHobby] = useState('');
    const [color, setColor] = useState('');
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
                .select(`username, website, avatar_url,full_name,hobby,color`)
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
                setFullname(data.full_name);
                setHobby(data.hobby);
                setColor(data.color);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
        full_name,
        hobby,
        color
    }: {
        username: string;
        website: string;
        avatar_url: string;
        full_name: string;
        hobby: string;
        color: string;
    }) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                full_name,
                hobby,
                color,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
            else { console.log(JSON.stringify(updates, null, 2)) }

            Alert.alert('Successfully updated', username);
        } catch (error) {
            Alert.alert("Error", error);
        } finally {
            setLoading(false);
        }
    }

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
                            Email
                        </Text>
                        <TextInput
                            value={session?.user?.email}
                            placeholder="Enter your email"
                            autoCapitalize={'none'}
                            style={styles.input}
                            aria-disabled
                        />
                    </View>
                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setUsername(text);
                            }}
                            value={username || ''}
                            placeholder="Username"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Website</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setWebsite(text);
                            }}
                            value={website || ''}
                            placeholder="Website"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Avatar Url</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setAvatarUrl(text);
                            }}
                            value={avatarUrl || ''}
                            placeholder="Avatar Url"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setFullname(text);
                            }}
                            value={fullname || ''}
                            placeholder="Full Name"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Hobby</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setHobby(text);
                            }}
                            value={hobby || ''}
                            placeholder="Hobby"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Color</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setColor(text);
                            }}
                            value={color || ''}
                            placeholder="Color"
                            autoCapitalize={'none'}
                            style={styles.input}
                        />
                    </View>


                    <View style={[styles.verticallySpaced, { opacity: loading ? 0.5 : 1, marginTop: 10 }]}>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() =>
                                updateProfile({
                                    username,
                                    website,
                                    avatar_url: avatarUrl,
                                    full_name: fullname,
                                    hobby,
                                    color,
                                })
                            }
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFAE00', padding: 10, borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: "500", }}>{loading ? 'Loading ...' : 'Update'}</Text>
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

