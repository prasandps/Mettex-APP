import { Text } from "@rneui/base";
import { Card } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View, Button } from "react-native";
import DatePicker from 'react-native-date-picker';
import Modal from "react-native-modal";
import { format, compareAsc } from 'date-fns';
import { Icon } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const LeaveComponent = (props) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
   
    return(
        <ScrollView>
              <Modal isVisible={true} style={{backgroundColor:"#fff"}}>
                <View style={{ flex: 0.8 }}>
                <Card>
                    <Card.Title>Apply Leave</Card.Title>
                    <Card.Divider />
                   
                        <View>
                            <Text>Select Date</Text>
                           <Text>{format(date,'dd-MM-yyyy')}</Text>
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
                   <FontAwesomeIcon icon={['fab', 'google']} />
                            <Button title="Open" onPress={() => setOpen(true)} />
                        </View>
                        
                    </Card>
                </View>
              </Modal>

            <Text>Select Date</Text>
            
            <Button title="Apply Leave" onPress={() => props.navigation.navigate('Leave3')} />
        </ScrollView>
    )
}

export default LeaveComponent;