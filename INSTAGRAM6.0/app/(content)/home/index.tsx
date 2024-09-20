import React, { useRef, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Header from '../../../components/Header';
import Post from '../../../components/Post';
import ModalPhoto from '../../../components/ModalPhoto';
import { useLocalSearchParams } from 'expo-router';


const stories = [
    { username: 'user1', imageUrl: require('../../../assets/test.jpg'), color: "blue" },
    { username: 'user2', imageUrl: require('../../../assets/test.jpg'), color: "white" },
    { username: 'user3', imageUrl: require('../../../assets/test.jpg'), color: "red" },
    { username: 'user4', imageUrl: require('../../../assets/test.jpg'), color: "blue" },
    { username: 'user5', imageUrl: require('../../../assets/test.jpg'), color: "green" },
    { username: 'user6', imageUrl: require('../../../assets/test.jpg'), color: "yellow" },
    { username: 'user7', imageUrl: require('../../../assets/logoDas.png'), color: "gray" },
    { username: 'user8', imageUrl: require('../../../assets/logoDas.png'), color: "gray" },
    { username: 'user9', imageUrl: require('../../../assets/logoDas.png'), color: "gray" },
    { username: 'user10', imageUrl: require('../../../assets/logoDas.png'), color: "gray" },
    // Add more stories as needed
];
const StoryComponent = () => {
    const DATA = useLocalSearchParams();
    // console.log("Main User:", DATA.email);

    const [modalVisible, setModalVisible] = useState(false);
    const [url, setUrl] = useState(null);

    const renderStoryItem = ({ item }) => {
        return (
            <View style={[styles.storyItem, { borderColor: item.color, height: 90, borderWidth: 3, borderRadius: 50, padding: 2 }]}>
                <TouchableOpacity
                    style={{ justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                        setUrl(item.imageUrl);
                        setModalVisible(true);
                        console.log("Going to", item.imageUrl);
                        console.log(modalVisible);
                    }}
                >
                    <Image source={item.imageUrl} style={styles.storyImage} />
                </TouchableOpacity>
                <Text style={styles.username}>{item.username}</Text>
            </View>

        );
    };
    const renderPosts = ({ item }) => {
        return (
            <Post
                username={item.username}
                imageUrl={require('../../../assets/test.jpg')}
                likes="123"
                comments="10"
                onPress={() => {
                    console.log("Helllo")
                }}
            />

        );
    };
    const flatListRef = useRef(null);

    return (
        <View style={{ backgroundColor: "#000000" }}>
            <StatusBar backgroundColor='#000000' barStyle='light-content' />
            {
                modalVisible ? (
                    <ModalPhoto modalVisible={modalVisible} url={url} setModalVisible={setModalVisible} />
                )
                    : (
                        <View>
                            <Header prop={DATA} />
                            <View style={{
                                height: 115, borderBottomWidth: 0.17,
                                borderBottomColor: '#ddd7'
                            }}>
                                <FlatList
                                    data={stories}
                                    renderItem={renderStoryItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={true}
                                />
                            </View>
                            <View >
                                <FlatList
                                    ref={flatListRef}

                                    data={stories}
                                    renderItem={renderPosts}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    )
            }
        </View>
    );
};
const styles = StyleSheet.create({
    storyItem: {
        marginHorizontal: 5,
        alignItems: 'center',
    },
    storyImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    username: {
        marginTop: 5,
        fontSize: 12,
        color: "white",
    },
    goToTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 10,
    },
    goToTopText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default StoryComponent;