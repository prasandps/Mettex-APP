import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getStoredValue } from '../common/storage';
import * as actions from "./actions";

function Home(props) {

  const getLocalStoreVal = async () => {
    return await getStoredValue();
  }

  const getInfo = async () => {
    let localstoreVal = await getLocalStoreVal();
    props.actions.getDashboardInfo({
      authkey: localstoreVal.auth_key,
      sessionkey: localstoreVal.sessionkey,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      getInfo();
    }, 200);
  }, [])
  
console.log("===> info", props.info);
  return (
    <ScrollView>
      <View>

        <Card>
          <Card.Title>{props?.info?.user?.name}</Card.Title>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", paddingBottom: 15 }}>
            <Text style={{ flex: 0.4, fontWeight: 'bold' }}>Designation</Text>
            <Text>{props?.info?.user?.designation}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", paddingBottom: 15 }}>
            <Text style={{ flex: 0.4, fontWeight: 'bold' }}>Mobile No</Text>
            <Text>N/A</Text>
          </View>
        </Card>
      </View>
      <View>
        <Card>
          <Card.Title>Leave Information</Card.Title>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", paddingBottom: 15 }}>
            <Text style={{ flex: 0.4, fontWeight: 'bold' }}>Casual Leave</Text>
            <Text>{props?.info?.leave_type?.casual_leave}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", paddingBottom: 15 }}>
            <Text style={{ flex: 0.4, fontWeight: 'bold' }}>Medical Leave</Text>
            <Text>{props?.info?.leave_type?.medical_leave}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", paddingBottom: 15 }}>
            <Text style={{ flex: 0.4, fontWeight: 'bold' }}>Sick Leave</Text>
            <Text>{props?.info?.leave_type?.sick_leave}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", paddingBottom: 15 }}>
            <Text style={{ flex: 0.4, fontWeight: 'bold' }}>Total Leave</Text>
            <Text>{props?.info?.leave?.total}</Text>
          </View>
          <Card.Divider />
          <View style={{ flex: 1, flexDirection: "row", paddingBottom: 15 }}>
            <Text style={{ flex: 0.4, fontWeight: 'bold' }}>Pending Leave</Text>
            <Text>{props?.info?.leave?.pending}</Text>
          </View>

        </Card>

      </View>

    </ScrollView>
  )
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.dashboard.isLoading,
    info:state.dashboard.dashbaordInfo
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
)(Home);
