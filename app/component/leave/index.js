import { Text } from "@rneui/base";
import { Card } from "@rneui/themed";
import { Fragment, useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity, TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import Modal from "react-native-modal";
import { format, compareAsc } from "date-fns";
import { Input } from "react-native-elements";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import RadioGroup from "react-native-radio-buttons-group";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { getStoredValue } from "../common/storage";

const leaveType = [
  { label: "Casual Leave", value: "1" },
  { label: "Sick Leave", value: "2" },
  { label: "Medical Leave", value: "3" },
  { label: "Permission", value: "4" }
];

const leaveDayType = [
  {
    id: "1",
    label: "Half day",
    value: "half-day",
    selected: true
  },
  {
    id: "2",
    label: "Full day",
    value: "full-day",
    selected: false
  },
];

const LeaveComponent = (props) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [selectDayLeaveTypes, setSelectDayLeaveTypes] = useState([...leaveDayType]);
  const [selectLeaveType, setSelectLeaveType] = useState(1);
  const [isApplyLeave, setIsApplyLeave] = useState(false);
  const [reason, setReason] = useState('');
  const [getdatetime, setDatetime] = useState(new Date());

  const onPressDayLeaveTypsButton = (selectLeaveTypeArray) => {
    setSelectDayLeaveTypes(selectLeaveTypeArray);
  };

  const getLocalStoreVal = async () => {
    return await getStoredValue();
  }

  const getLeavePendingReq = async () => {
    let localstoreVal = await getLocalStoreVal();
    props.actions.getLeavePendingReq({
      authkey: localstoreVal.auth_key,
      sessionkey: localstoreVal.sessionkey,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      getLeavePendingReq();
    }, 5000);
  }, [])

  const openApplyLeaveHandler = () => {
    setSelectLeaveType(leaveType[0].value);
    setSelectDayLeaveTypes([...leaveDayType]);
    setIsApplyLeave(!isApplyLeave);
  }

  const applyLeavehandler = async () => {
    let localstoreVal = await getLocalStoreVal();
    let req = {};
    if(selectLeaveType == '4'){
      req = {
        datetime:getdatetime,
        reason: reason,
        authkey: localstoreVal.auth_key,
        sessionkey: localstoreVal.sessionkey,
      }
    } else {
      req = {
        from: fromDate,
        to: toDate,
        type: selectLeaveType,
        reason: reason,
        file: '',
        leave_type: selectDayLeaveTypes.filter(item => item.selected == true)[0].id,
        authkey: localstoreVal.auth_key,
        sessionkey: localstoreVal.sessionkey,
      }
    }
    
    
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-end', marginTop: 15, paddingRight: 15 }}>
        <Button
          containerStyle={{ width: '50%' }}
          title="Apply Leave"
          onPress={() => openApplyLeaveHandler()}
        />
      </View>
      {props.leavePendingData?.casual_leave?.map((item, index) => (
        <Card>
          <Card.Title>Casual Leave</Card.Title>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>From Date</Text>
            <Text style={{ flex: 0.5 }}>{item.from}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>To Date</Text>
            <Text style={{ flex: 0.5 }}>{item.to}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>Leave Type</Text>
            <Text style={{ flex: 0.5 }}>{item.leave_type == 1 ? "Half day" : "Full day"}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text>Reason {' '}{item.reason}</Text>
          </View>
          <Card.Divider />
          <Button
            title="Edit"
            onPress={() => setIsApplyLeave(!isApplyLeave)}
          />
        </Card>
      ))}

      {props.leavePendingData?.medical_leave?.map((item, index) => (
        <Card>
          <Card.Title>Medical Leave</Card.Title>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>From Date</Text>
            <Text style={{ flex: 0.5 }}>{item.from}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>To Date</Text>
            <Text style={{ flex: 0.5 }}>{item.to}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>Leave Type</Text>
            <Text style={{ flex: 0.5 }}>{item.leave_type == 1 ? "Half day" : "Full day"}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text>Reason {' '}{item.reason}</Text>
          </View>
          <Card.Divider />
          <Button
            title="Edit"
            onPress={() => setIsApplyLeave(!isApplyLeave)}
          />
        </Card>
      ))}

      {props.leavePendingData?.sick_leave?.map((item, index) => (
        <Card>
          <Card.Title>Sick Leave</Card.Title>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>From Date</Text>
            <Text style={{ flex: 0.5 }}>{item.from}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>To Date</Text>
            <Text style={{ flex: 0.5 }}>{item.to}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>Leave Type</Text>
            <Text style={{ flex: 0.5 }}>{item.leave_type == 1 ? "Half day" : "Full day"}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text>Reason {' '}{item.reason}</Text>
          </View>
          <Card.Divider />
          <Button
            title="Edit"
            onPress={() => setIsApplyLeave(!isApplyLeave)}
          />
        </Card>
      ))}

      {props.leavePendingData?.permission?.map((item, index) => (
        <Card>
          <Card.Title>Permission</Card.Title>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>From Date</Text>
            <Text style={{ flex: 0.5 }}>{item.from}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>To Date</Text>
            <Text style={{ flex: 0.5 }}>{item.to}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text style={{ flex: 0.3 }}>Leave Type</Text>
            <Text style={{ flex: 0.5 }}>{item.leave_type == 1 ? "Half day" : "Full day"}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <Text>Reason {' '}{item.reason}</Text>
          </View>

        </Card>
      ))}


      <Modal isVisible={isApplyLeave} style={{ backgroundColor: "#fff" }}>
        <View style={{ flex: 0.9, height: "100%" }}>
          <Card>
            <Card.Title>Apply Leave</Card.Title>
            <Card.Divider />
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
            {selectLeaveType == 4 && (
              <View style={styles.dateContainer}>
                <View style={styles.dateTime}>
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Input
                      label="Select Date and Time"
                      placeholder="Select Date and Time"
                      editable={false}
                      value={format(getdatetime, "dd-MM-yyyy HH:MM")}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    mode="datetime"
                    open={open}
                    date={getdatetime}
                    onConfirm={(date) => {
                      setOpen(false);
                      setDatetime(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </View>
            )}
            {selectLeaveType != 4 && (
              <Fragment>
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


                <RadioGroup
                  radioButtons={selectDayLeaveTypes}
                  onPress={onPressDayLeaveTypsButton}
                  layout="row"
                  //value={'1'}
                  containerStyle={{ marginBottom: 20 }}
                />
              </Fragment>
            )}
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
              onChange={(e) => setReason(e.target.value)}
            />
            <View style={[styles.dateContainer, styles.btnContainer]}>
              <View style={styles.btn}>
                <Button
                  title="Cancel"
                  buttonStyle={{
                    backgroundColor: "#333",
                  }}
                  onPress={() => setIsApplyLeave(!isApplyLeave)}
                />
              </View>
              <View style={styles.btn}>
                <Button title="Save" onPress={() => applyLeavehandler()} />
              </View>
            </View>
          </Card>
        </View>
      </Modal>




    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.leave.isLoading,
    leavePendingData: state.leave.leavePendingData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveComponent);
