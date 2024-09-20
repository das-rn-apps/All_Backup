import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Alert, FlatList, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { useSession } from '../../lib/session';
import RNPickerSelect from 'react-native-picker-select';
import { router } from 'expo-router';

export default function Receipent() {
    const [list, setList] = useState([]);
    // const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(false);
    const session = useSession();

    useEffect(() => {
        if (session) getList();
    }, [session]);

    async function getList() {
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`id, username,color`);

            if (error && status !== 406) {
                throw error;
            }
            await setList(data.map(item => ({ label: item.username, value: item.id })));

            console.log(JSON.stringify(list, null, 2), "yeh wallla");
            return list;
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View>
            <RNPickerSelect
                onValueChange={(value) => {
                    if (value) {
                        console.log(value, "====selected");
                        router.push('./SpecificUser');
                    }
                }}
                onOpen={() => console.log('Heloooo')}
                items={list}
                placeholder={{ label: "Receipent", value: "" }}
            />
        </View>
    );
}