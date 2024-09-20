import { Text, View } from 'react-native'
import React from 'react'

const missing = () => {

  return (
    <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>PAGE NOT FOUND</Text>
    </View>
  )
}

export default missing
