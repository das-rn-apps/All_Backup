import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';


const Picker = ({ items }) => {
    return (
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={items}
        />
    );
};

export default Picker

const styles = StyleSheet.create({})