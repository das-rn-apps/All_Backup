import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { Input } from 'react-native-elements';
import { supabase } from '../../components/supabase';

export default function Auth({ session }: { session: Session }) {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [hobby, setHobby] = useState('');
    const [age, setAge] = useState('');
    const [phoneError, setPhoneError] = useState(null);
    const [usernameError, setError] = useState(null);
    const [hobbyError, setHobbyError] = useState(null);
    const [ageError, setAgeError] = useState(null);


    useEffect(() => {
        if (session?.user) {
            getProfile();
        }
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, phone, hobby, age, gender`)
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setPhone(data.phone);
                setHobby(data.hobby);
                setAge(data.age);
                // setGender(data.gender);
            }
        } catch (error) {
            console.error('Error getting profile:', error);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                username,
                phone,
                hobby,
                age,
                // gender,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }

            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Input
                    style={styles.input}
                    label="Phone"
                    value={phone}
                    onChangeText={(value) => { console.log(value); setPhone(value); if (!value) { setPhoneError("Phone is required") } else { setPhoneError(null) } }}
                />
                {phoneError && <Text style={styles.msg}>{phoneError}</Text>}
                <Input
                    style={styles.input}
                    label="Username"
                    value={username}
                    onChangeText={(value) => {
                        console.log(value);
                        setUsername(value);
                        if (!value) {
                            setError("Username is required");
                        } else {
                            setError(null);
                        }
                    }}
                />
                {usernameError && <Text style={styles.msg}>{usernameError}</Text>}

                <Input
                    style={styles.input}
                    label="Hobby"
                    value={hobby}
                    onChangeText={(value) => {
                        console.log(value);
                        setHobby(value);
                        if (!value) {
                            setHobbyError("Hobby is required");
                        } else {
                            setHobbyError(null);
                        }
                    }}
                />
                {hobbyError && <Text style={styles.msg}>{hobbyError}</Text>}

                <Input
                    style={styles.input}
                    label="Age"
                    value={age}
                    onChangeText={(value) => {
                        console.log(value);
                        setAge(value);
                        if (!value) {
                            setAgeError("Age is required");
                        } else {
                            setAgeError(null);
                        }
                    }}
                />
                {ageError && <Text style={styles.msg}>{ageError}</Text>}

                <TouchableOpacity
                    style={{
                        alignItems: 'center', justifyContent: 'center', backgroundColor: "green", height: 40, borderRadius: 5, width: 150, alignSelf: "center"
                    }}
                    onPress={() => { console.log(username, phone, hobby, age,) }}
                    disabled={usernameError || phoneError || ageError || hobbyError}
                >
                    <Text style={styles.btntxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    btntxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    container: {
        // flex: 1,
        // paddingTop: Constants.statusBarHeight,
        padding: 30,
        backgroundColor: 'black',
    },
    input: {
        // backgroundColor: 'white',
        height: 40,
        borderRadius: 4,
        // marginBottom: 10,
        color: 'white',
    },
    picker: {
        backgroundColor: 'white',
        height: 40,
        borderRadius: 4,
        // marginBottom: 10,
        color: 'black',
    },
    msg: {
        color: "red",
        // marginTop: -20,
        marginLeft: 10
    }
});
