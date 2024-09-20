import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const BottomSheetInsta = ({ prop }) => {
    return (
        <ScrollView >
            <Text style={{ textAlign: "center", fontWeight: "800", fontSize: 20 }}>
                {prop.data}
            </Text>
            {/* <Switch value={prop.data} onChange={() => prop.setData(!prop.data)} style={{ backgroundColor: "red", marginTop: 10 }} /> */}
        </ScrollView>
    )
}

export default BottomSheetInsta

const styles = StyleSheet.create({})