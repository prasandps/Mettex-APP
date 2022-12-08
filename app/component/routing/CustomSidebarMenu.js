
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "./../login/actions";
import * as actions from "./actions";

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#e5e5e5'}}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={{flex:1}}>
          {/* here's where you put your logout drawer item*/}
          <DrawerItem 
            label="Log out"
            onPress={()=>{
              props.loginActions.validSession(false);
              props.actions.clearSession();
              props.navigation.replace("Login");
            }}
            style={{flex:1,justifyContent:'flex-end'}}
          />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom:16,
    marginTop:16
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
 


const mapStateToProps = (state) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSidebarMenu);