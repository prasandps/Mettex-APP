import { Text } from "@rneui/base";
import { Card } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View, TouchableOpacity, TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import Modal from "react-native-modal";
import { format, compareAsc } from "date-fns";
import { Input } from "react-native-elements";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import RadioGroup from "react-native-radio-buttons-group";
import { Button } from "react-native-elements";

const leaveType = [
  { label: "Casual Leave", value: "1" },
  { label: "Sick Leave", value: "2" },
  { label: "Medical Leave", value: "3" },
];

const leaveDayType = [
  {
    id: "1",
    label: "Half day",
    value: "half-day",
  },
  {
    id: "2",
    label: "Full day",
    value: "full-day",
  },
];

const LeaveComponent = (props) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [selectDayLeaveTypes, setSelectDayLeaveTypes] = useState(leaveDayType);
  const [selectLeaveType, setSelectLeaveType] = useState(null);
  const [isApplyLeave, setIsApplyLeave] = useState(false)

  const onPressDayLeaveTypsButton = (selectLeaveTypeArray) => {
    setSelectLeaveType(selectLeaveTypeArray);
  };

  return (
    <ScrollView>
      <Modal isVisible={isApplyLeave} style={{ backgroundColor: "#fff" }}>
        <View style={{ flex: 0.9, height: "100%" }}>
          <Card>
            <Card.Title>Apply Leave</Card.Title>
            <Card.Divider />

            <View style={styles.dateContainer}>
              <View style={styles.dateItem}>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Input
                    label="From Date"
                    placeholder="Select From Date"
                    editable={false}
                    value={format(fromDate, "dd-MM-yyyy")}
                  />
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={fromDate}
                  onConfirm={(date) => {
                    setOpen(false);
                    setFromDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
              <View style={styles.dateItem}>
                <TouchableOpacity onPress={() => setToDateOpen(true)}>
                  <Input
                    label="To Date"
                    placeholder="Select To Date"
                    editable={false}
                    value={format(toDate, "dd-MM-yyyy")}
                  />
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={toDateOpen}
                  date={toDate}
                  onConfirm={(date) => {
                    setToDateOpen(false);
                    setToDate(date);
                  }}
                  onCancel={() => {
                    setToDateOpen(false);
                  }}
                />
              </View>
            </View>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={leaveType}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Leave Type"
              value={selectLeaveType}
              onChange={(item) => {
                setSelectLeaveType(item.value);
              }}
            />

            <RadioGroup
              radioButtons={selectDayLeaveTypes}
              onPress={onPressDayLeaveTypsButton}
              layout="row"
              containerStyle={{ marginTop: 20, marginBottom: 20 }}
            />

            <TextInput
              placeholder="Enter Reason"
              textAlignVertical="top"
              multiline={true}
              style={{
                padding: 15,
                height: 150,
                borderColor: "#ccc",
                borderWidth: 1,
                marginBottom: 30,
              }}
            />
            <View style={[styles.dateContainer, styles.btnContainer]}>
              <View style={styles.btn}>
                <Button
                  title="Cancel"
                  buttonStyle={{
                    backgroundColor: "#333",
                  }}
                  onPress={()=>setIsApplyLeave(!isApplyLeave)}
                />
              </View>
              <View style={styles.btn}>
                <Button title="Save" />
              </View>
            </View>
          </Card>
        </View>
      </Modal>

      <Text>Select Date</Text>

      <Button
        title="Apply Leave"
        onPress={() => setIsApplyLeave(!isApplyLeave)}
      />
    </ScrollView>
  );
};

export default LeaveComponent;
