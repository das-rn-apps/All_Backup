import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Account from './(authentication)/Account'

const Acc = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <Account />
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default Acc;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#FFE400",
    },
});
