import React, { useRef, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

const FlashList = ({ data, renderItem, keyExtractor, initialNumToRender, onContentSizeChange }) => {
    const scrollViewRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    return (
        <ScrollView ref={scrollViewRef} onContentSizeChange={onContentSizeChange}>
            {data.map((item, index) => (
                <View key={keyExtractor(item, index)}>
                    {renderItem({ item, index })}
                </View>
            ))}
        </ScrollView>
    );
};

export default FlashList;
