import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'


import {
    AntDesign,
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome5,
    FontAwesome,
    Entypo,
    Foundation,
    MaterialIcons,
    Fontisto,
} from '@expo/vector-icons';



const index = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <ScrollView>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.content}>
                        <AntDesign name="Trophy" size={24} color="black" />
                        <Text style={styles.txt}>
                            Browse Series
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <Ionicons name="people-outline" size={24} color="black" />
                        <Text style={styles.txt}>
                            Browse Team
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <MaterialCommunityIcons name="human-male" size={24} color="black" />
                        <Text style={styles.txt}>
                            Browse Player
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.content}>
                        <FontAwesome5 name="calendar-alt" size={24} color="black" />
                        <Text style={styles.txt}>
                            Schedule
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <Ionicons name="archive-outline" size={24} color="black" />
                        <Text style={styles.txt}>
                            Archives
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.content}>
                        <FontAwesome name="photo" size={24} color="black" />
                        <Text style={styles.txt}>
                            Photos
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.content}>
                        <Entypo name="quote" size={24} color="black" />
                        <Text style={styles.txt}>
                            Quotes
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.content}>
                        <Entypo name="line-graph" size={24} color="black" />
                        <Text style={styles.txt}>
                            ICC Rankings - Men
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <Entypo name="line-graph" size={24} color="black" />
                        <Text style={styles.txt}>
                            ICC Rankings - Women
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <Foundation name="graph-bar" size={24} color="black" />
                        <Text style={styles.txt}>
                            Records
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.content}>
                        <Fontisto name="table-1" size={24} color="black" />
                        <Text style={styles.txt}>
                            ICC World Test Championship
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <Fontisto name="table-1" size={24} color="black" />
                        <Text style={styles.txt}>
                            ICC World Cup Super League
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.content}>
                        <FontAwesome name="star-o" size={24} color="black" />
                        <Text style={styles.txt}>
                            Rate The App
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <MaterialIcons name="feedback" size={24} color="black" />
                        <Text style={styles.txt}>
                            Feedback
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.box, { marginBottom: 40 }]}>
                    <TouchableOpacity style={styles.content}>
                        <Ionicons name="settings-outline" size={24} color="black" />
                        <Text style={styles.txt}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content}>
                        <AntDesign name="infocirlceo" size={24} color="black" />
                        <Text style={styles.txt}>
                            About Cricbuzz
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default index

const styles = StyleSheet.create({
    box: {
        marginTop: 15,
        gap: 2
    },
    content: {
        backgroundColor: "white",
        padding: 15,
        flexDirection: "row",
        gap: 20
    },
    txt: {
        // justifyContent: "center",
        // alignItems: "center",
        textAlignVertical: "center",
        fontSize: 16,
    }
})