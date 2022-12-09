import { useEffect, useState } from "react";
import { getStoredValue } from "../common/storage";
import LoginComponent from './../login/index';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import * as loginActions from "./../login/actions";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from "./DrawerNavigator";
import Spinner from "react-native-loading-spinner-overlay/lib";

let Stack = createNativeStackNavigator();

const RoutingComponent = (props) => {

  const [localstore, setLocalstore] = useState({});

  useEffect(() => {

    let localstorage = async () => {
      let localstoreVal = await getStoredValue();
      setLocalstore(localstoreVal);
    };
    localstorage();

  }, []);

  useEffect(() => {

    if (localstore && localstore?.auth_key != '' && localstore.sessionkey && localstore.isLogout === false) {
      props.actions.checkSession({
        username: localstore?.username,
        authkey: localstore?.auth_key,
        sessionkey: localstore?.sessionkey
      });
    }

  }, [localstore]);

  useEffect(() => {
    if (props?.sessionData && props?.sessionData?.status === 'Success') {
      props.loginActions.validSession(true);
    } else if (props?.sessionData && props?.sessionData?.status !== 'Success') {
      props.loginActions.validSession(false);
    }
  }, [props.sessionData])


  if (props.isLoading === false) {
    return (

      <NavigationContainer>
        <Stack.Navigator>
          {props.isLoading === false && props.isValidSession === true && (
            <Stack.Group>
              <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
            </Stack.Group>
          )}
          {props.isLoading === false && props.isValidSession === false && (
            <Stack.Group>
              <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
            </Stack.Group>
          )}
        </Stack.Navigator>

      </NavigationContainer>


    )
  }
  if (props.isLoading === true) {
    return (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{ color: "#fff" }}
        size="large"
      />
    )
  }

}


const mapStateToProps = (state) => {
  return {
    isLoading: state.session.isLoading,
    sessionData: state.session.sessionData,
    isValidSession: state.login.isValidSession,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutingComponent);
