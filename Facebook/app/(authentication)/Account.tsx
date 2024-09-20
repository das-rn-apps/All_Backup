import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { StyleSheet, View, Alert, ScrollView, Text, Pressable } from 'react-native';
import { useSession } from '../../lib/session';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Account() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [fullname, setFullname] = useState('');
    const [hobby, setHobby] = useState('');
    const [dob, setDob] = useState("");
    const session = useSession();

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url,full_name,hobby,DOB`)
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
                setDob(data.DOB);
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
        DOB,
    }: {
        username: string;
        website: string;
        avatar_url: string;
        full_name: string;
        hobby: string;
        DOB: string;
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
                DOB,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
            else { console.log(JSON.stringify(updates, null, 2)) }
            Alert.alert('Successfully updated', username);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading(false);
        }
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false)
        setDate(currentDate);
        console.log(currentDate);
        let fDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
        setDob(fDate);
        // console.log(fDate);
    }


    return (
        <View>
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
                        <Text style={styles.label}>DOB</Text>
                        <Pressable onPress={() => {
                            setShow(true);
                        }}
                            style={styles.input}
                        >
                            <Text>
                                {dob || "Select Any Date"}
                            </Text>
                        </Pressable>
                    </View>
                    {
                        show && (<DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            display='default'
                            onChange={onChangeDate}
                        />)
                    }

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
                                    DOB: dob
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
                                                console.log("Signing outttttttttt");
                                                router.push('/');
                                            },
                                        },
                                    ],
                                    { cancelable: true }
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
                            onPress={() => router.push('/Test')}
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFAE00', padding: 10, borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: "500", }}>Go To Picker</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
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

