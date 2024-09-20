import React from 'react'
import { StatusBar, KeyboardAvoidingView, Platform, StyleSheet, FlatList } from 'react-native'
import Posts from '../../../components/Posts';
import SmLogo from '../../../components/SmLogo';

const data = [
    { name: "John", rollNumber: "001" },
    { name: "Alice", rollNumber: "002" },
    { name: "Bob", rollNumber: "003" },
    { name: "Emily", rollNumber: "004" },
    { name: "Michael", rollNumber: "005" },
    { name: "Sophia", rollNumber: "006" },
    { name: "David", rollNumber: "007" },
    { name: "Emma", rollNumber: "008" },
    { name: "Daniel", rollNumber: "009" },
    { name: "Olivia", rollNumber: "010" }
];


export default function Homepage() {
    return (<KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
    >
        <StatusBar backgroundColor="#000000" barStyle="dark-content" />
        <SmLogo />
        <FlatList
            data={data}
            renderItem={({ item }) => <Posts key={item.rollNumber} item={item} />}
        />
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#000000",
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
