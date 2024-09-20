import React, { useState } from 'react'
import { Alert, StyleSheet, View, Image, Pressable, Text, TouchableOpacity, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { supabase } from '../../lib/supabase'
import Logo from "../../components/logo"
import AuthGoogle from './AuthGoogle'
import { router } from 'expo-router'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState("login")


    const [isEmailValid, setIsEmailValid] = useState("true");
    const [isEmailValid2, setIsEmailValid2] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState("true");
    const [isPasswordValid2, setIsPasswordValid2] = useState("true");

    const [showPassword, setShowPassword] = useState(false);



    async function signInWithEmail() {
        setLoading(true)
        if (!(email && password)) {
            Alert.alert("Data insufficient", "Provide email and password both");
            setLoading(false);
            return;
        }
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
        }
        else {
            router.push("./Account")
        }
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }
    const validateEmail = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    };


    return (<KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
    >
        <StatusBar backgroundColor="#FFE400" barStyle="dark-content" />
        <ScrollView showsHorizontalScrollIndicator>
            <View style={styles.container}>
                <Logo />
                <View style={[styles.verticallySpaced,]}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        onChangeText={(text) => {
                            setEmail(text);
                            setIsEmailValid(text);
                            setIsEmailValid2(validateEmail(text));
                        }}
                        value={email}
                        placeholder="Enter your email"
                        autoCapitalize={'none'}
                        style={styles.input}
                    />
                    {
                        !isEmailValid ? (
                            <Text style={styles.error}>
                                Email required*
                            </Text>
                        ) : !isEmailValid2 ? (
                            <Text style={styles.error}>
                                Enter a valid email address*
                            </Text>
                        ) : null
                    }
                </View>
                <View style={styles.verticallySpaced}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setPassword(text);
                            setIsPasswordValid(text);
                        }}
                        value={password}
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        autoCapitalize={'none'}
                        style={styles.input}
                    />
                    {
                        !isPasswordValid ? (
                            <Text style={styles.error}>
                                Password required*
                            </Text>
                        ) : (
                            null
                        )
                    }
                </View>
                {
                    login === "login" ? (
                        <View>
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text style={{ textAlign: "right", marginVertical: 5 }}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
                            </TouchableOpacity>
                            <View style={[styles.verticallySpaced, { opacity: loading ? 0.5 : 1, marginTop: 10 }]}>
                                <TouchableOpacity
                                    disabled={loading}
                                    onPress={() => signInWithEmail()}
                                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFAE00', padding: 10, borderRadius: 5 }}
                                >
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: "500", }}>Sign in</Text>
                                </TouchableOpacity>
                            </View>

                            <Pressable onPress={() => { setLogin("logout") }}>
                                <Text style={styles.txt}> Don't have account? SigUp.</Text>
                            </Pressable>
                            <View style={{ marginTop: 70, backgroundColor: "#FFC500", padding: 20, borderRadius: 10 }}>
                                <View>
                                    <Text style={{ textAlign: "center", color: "white", fontWeight: "500" }}>
                                        Log in using below account
                                    </Text>
                                </View>
                                {/* <View style={{ height: 50, marginTop: 10, flex: 1, flexDirection: "row", gap: 15 }}> */}
                                <View style={{ marginTop: 10, flex: 1, gap: 15, alignItems: "center" }}>
                                    <AuthGoogle />
                                    {/* <AuthGoogle /> */}
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View style={styles.verticallySpaced}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput
                                    onChangeText={(text) => {
                                        setPassword2(text);
                                        setIsPasswordValid2(text);
                                    }}
                                    value={password2}
                                    secureTextEntry={!showPassword}
                                    placeholder="Re-enter your Password"
                                    autoCapitalize={'none'}
                                    style={styles.input}
                                />

                                {!isPasswordValid2 ? (
                                    <Text style={styles.error}>
                                        Confirm Password*
                                    </Text>
                                ) : isPasswordValid !== isPasswordValid2 ? (
                                    <Text style={styles.error}>
                                        Enter the same Password*
                                    </Text>
                                ) : null}
                            </View>
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                                <Text style={{ textAlign: "right", marginVertical: 5 }}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
                            </TouchableOpacity>

                            <View style={[styles.verticallySpaced, { opacity: loading ? 0.5 : 1, marginTop: 10 }]}>
                                <TouchableOpacity
                                    disabled={loading}
                                    onPress={() => {
                                        if (password === password2) {
                                            signUpWithEmail()
                                        } else {
                                            Alert.alert("Password Not same", "Enter same password");
                                        }
                                    }}
                                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFAE00', padding: 10, borderRadius: 5 }}
                                >
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: "500", }}>Sign up</Text>
                                </TouchableOpacity>
                            </View>
                            <Pressable onPress={() => { setLogin("login") }}>
                                <Text style={styles.txt}> Already have account? Login.</Text>
                            </Pressable>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
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
