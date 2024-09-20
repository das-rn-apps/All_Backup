import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

const InstagramPost = ({ username, imageUrl, likes, comments, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={imageUrl} style={styles.profileImage} />
                <Text style={styles.username}>{username}</Text>
            </View>
            <Image source={imageUrl} style={styles.postImage} />
            <View style={styles.footer}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={onPress}>
                        <AntDesign name="hearto" size={24} color="white" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPress}>
                        <FontAwesome6 name="comment" size={24} color="white" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPress}>
                        <Feather name="send" size={24} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onPress}>
                    <MaterialIcons name="save-alt" size={24} color="white" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.likesContainer}>
                {/* <FontAwesome name="heart" size={16} color="red" style={styles.likeIcon} /> */}
                <Text style={styles.likes}>{likes} likes</Text>
            </View>
            <Text style={styles.comments}>{comments} comments</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 10,
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "white"
    },
    postImage: {
        width: '100%',
        height: 350,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },
    likeIcon: {
        marginRight: 5,
    },
    likes: {
        fontWeight: 'bold',
        color: "white"
    },
    comments: {
        paddingHorizontal: 10,
        color: 'gray',
    },
});

export default InstagramPost;
