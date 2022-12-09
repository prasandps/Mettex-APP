import { Text } from "@rneui/base";
import { useState } from "react";
import { ScrollView, View, Button } from "react-native";
import DatePicker from 'react-native-date-picker';

const LeaveComponent = (props) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
   
    return(
        <ScrollView>
            <Text>Select Date</Text>
            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
            <Button title="Apply Leave" onPress={() => props.navigation.navigate('Leave3')} />
        </ScrollView>
    )
}

export default LeaveComponent;