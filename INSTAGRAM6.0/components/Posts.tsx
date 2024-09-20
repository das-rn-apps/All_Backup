import { View, Image, Text } from 'react-native'
import React from 'react'

const Posts = ({ item }) => {
    return (
        <View>
            <View style={{ alignItems: "center", height: 400, backgroundColor: "white", justifyContent: "center" }}>
                <Text>
                    {item.name}
                </Text>
            </View>
            <View style={{ alignItems: "center", height: 40, backgroundColor: "#F0C8FF", justifyContent: "center" }} >

            </View>
        </View>
    )
}

export default Posts;