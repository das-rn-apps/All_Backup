import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, } from 'react-native-elements';
import Picker from './Picker';


export default function DateTimePickerCode() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [mode, setMode] = useState("mode");
    const [text, setText] = useState(date + "");
    const [genderShow, setGenderShow] = useState(false);
    const [show, setShow] = useState(false);

    const customData3 = [
        { label: 'None', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Both', value: 'both' },
    ];

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false)
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
        const fTime = tempDate.getHours() + " Hours " + tempDate.getMinutes() + " Minutes " + tempDate.getSeconds() + " Seconds";
        setTime(fTime);
        setText(fDate + " \n" + fTime + "\n" + tempDate);
    }

    return (
        <View style={{ alignItems: "center", gap: 20 }}>
            <Text style={{ backgroundColor: "white", padding: 20, borderRadius: 10, fontSize: 20 }}>{text}</Text>
            <Button
                title={"Select DOB"}
                onPress={() => {
                    showMode("date");
                }} />
            <Button
                title={"Select gender"}
                onPress={() => {
                    setGenderShow(true);
                }} />
            {
                show && (<DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />)
            }
            <View
                style={{ backgroundColor: "white", padding: 5, borderRadius: 10, width: 330 }}
            >
                <Picker items={customData3} />
            </View>
        </View>
    );

}
