import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const Switching = ({ prop }) => {
  return (
    <ScrollView >
      <Switch value={prop.dark} onChange={() => prop.setDark(!prop.dark)} style={{ backgroundColor: "red", marginTop: 10 }} />

    </ScrollView>
  )
}

export default Switching

const styles = StyleSheet.create({})