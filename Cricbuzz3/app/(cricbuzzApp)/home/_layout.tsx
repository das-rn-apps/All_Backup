import { Stack, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, Text, Alert } from 'react-native'
import { useSession } from '../../../lib/session'
import { supabase } from '../../../lib/supabase'

const _layout = () => {
    const session = useSession();
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (session) getProfile()
    }, [session])

    async function getProfile() {
        try {
            // setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`avatar_url`)
                // .select(`username, website, avatar_url,full_name,hobby`)
                .eq('id', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                // setUsername(data.username)
                // setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
                // setFullname(data.full_name)
                // setHobby(data.hobby)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            // setLoading(false)
        }
    }

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: "#663399"
            },
            headerTintColor: "white",
            headerTitleStyle: {

            },
            headerTitleAlign: "center",
            statusBarColor: "black",
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="(header)" options={{
                title: "Header",
                headerLeft: () => (
                    <Image
                        style={{ width: 40, height: 40, resizeMode: "contain", borderRadius: 20 }}
                        source={require('../../../assets/myself.jpeg')}
                    />
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            if (session) {
                                Alert.alert(
                                    "Confirm Log Out",
                                    "Are you sure you want to log out?",
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel",
                                        },
                                        {
                                            text: "OK",
                                            onPress: () => {
                                                supabase.auth.signOut();
                                                router.push('/(auth)/Auth');
                                            },
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }
                            else {
                                router.push('/(auth)/Auth');
                            }
                        }
                        }
                        style={{
                            borderWidth: 1.5, borderRadius: 15, height: 30, width: 70, borderColor: "white", alignItems: "center", justifyContent: "center",
                        }}>
                        {session ? (
                            <Text style={{ color: "white", fontWeight: "400" }}>Logout</Text>
                        ) : (
                            <Text style={{ color: "white", fontWeight: "400" }}>Login</Text>
                        )}

                    </TouchableOpacity>
                ),
                headerTitle: () => {
                    return <Image
                        style={{ width: 70, height: 60, resizeMode: "contain" }}
                        source={require('../../../assets/FENICE-ENERGY-logo.png')} />
                },
                headerStyle: {
                    backgroundColor: '#009170',
                },
                headerTitleStyle: {
                    color: 'brown',
                },
            }} />
        </Stack>
    )
}

export default _layout;