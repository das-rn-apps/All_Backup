import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons, Foundation, FontAwesome5, Octicons } from '@expo/vector-icons';


const AppLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "#4B4949",
            tabBarStyle: {
                minHeight: 60,
                backgroundColor: "black",
                paddingBottom: 8,
            },
            // headerShown: false,
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Foundation name="home" size={28} color="white" />
                        ) : (
                            <Foundation name="home" size={26} color="#BBBBBB" />
                        ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    // headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="search" size={28} color="white" />
                        ) : (
                            <Ionicons name="search" size={26} color="#BBBBBB" />
                        ),
                }}
            />
            <Tabs.Screen
                name="addPost"
                options={{
                    // headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5 name="plus-square" size={28} color="white" />
                        ) : (
                            <FontAwesome5 name="plus-square" size={26} color="#BBBBBB" />
                        ),
                }}
            />
            <Tabs.Screen
                name="reels"
                options={{
                    // headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Octicons name="video" size={28} color="white" />
                        ) : (
                            <Octicons name="video" size={26} color="#BBBBBB" />
                        ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    // headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="face-man-profile" size={28} color="white" />
                        ) : (
                            <MaterialCommunityIcons name="face-man-profile" size={26} color="#BBBBBB" />
                        ),
                }}
            />
        </Tabs>
    );
};

export default AppLayout;
