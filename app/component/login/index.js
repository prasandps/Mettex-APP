import React, { Component, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";

import { Button as ForgetPasswordBtn, Dialog } from '@rneui/themed';
import { getStoredValue, setStoredValue } from "../common/storage";
import styles from "./styles";
import Spinner from "react-native-loading-spinner-overlay/lib";
import DeviceInfo from 'react-native-device-info';
import { useIsConnected } from 'react-native-offline';


const LoginComponent = (props) => {
    const isConnected = useIsConnected();

    const [state, setState] = useState({
        username: '6208113',
        password: '1234567',
        error: ''
    });

    const [deviceInfo, setDeviceInfo] = useState({
        imei: '',
        mac: "",
        os: DeviceInfo.getModel(),
        ipaddress: "",
        mobno: ''
    });

    const [loginErrorInfo, setLoginErrorInfo] = useState({
        isShowLoginError:false,
        errorInfo:""
    })

    const [isAlreadyRegistred, setIsAlreadyRegistred] = useState(false);

    useEffect(() => {

        Promise.all([
            DeviceInfo.getUniqueId(),
            DeviceInfo.getMacAddress(),
            DeviceInfo.getIpAddress(),
            DeviceInfo.getPhoneNumber()
        ]).then((values) => {
            setDeviceInfo({
                ...deviceInfo,
                imei: values[0],
                mac: values[1] ? values[1] : 'mac-empty',
                ipaddress: values[2] ? values[2] : 'ip-empty',
                mobno: values[3] != 'unknown' && values[3] != '' ? values[3] : '9876543210'
            });
        });

    }, [])

    useEffect(() => {
         if (props?.registrationData && Object.keys(props?.registrationData).length > 0) {
            if (props.registrationData.code === '1') {
                setIsAlreadyRegistred(true);
             } else if(props.registrationData?.status == 'success'){
                setStoredValue({
                    username:state.username,
                    auth_key:props.registrationData?.auth_key || '',
                });
                setTimeout(() => {
                    onLoginHandler();
                }, 100);
            }
         }
    }, [props.registrationData])

    useEffect(() => {
        if (props?.loginData && Object.keys(props?.loginData).length > 0) {
            if(props?.loginData?.status == 'success'){
               setStoredValue({
                sessionkey:props.loginData?.sessionkey || '',
                isLogout:false
            });
               props.actions.validSession(true);
            } else if(props?.loginData?.code ==3){
                setStoredValue({
                    username:'',
                    auth_key:'',
                    sessionkey:''
                });
                setTimeout(() => {
                    onLoginHandler();
                }, 500);
            } else if(props?.loginData?.status != 'success'){
                setLoginErrorInfo({
                    isShowLoginError:true,
                    errorInfo:props?.loginData?.status 
                })
            }
        }
   }, [props.loginData])



    isValid = () => {
        const { username, password } = state;
        let valid = false;
        let error = '';
        if (username.length > 0 && password.length > 0) {
            valid = true;
        }
        if (username.length === 0 && password.length === 0) {
            error = 'You must enter an username and password';
        } else if (username.length === 0) {
            error = 'You must enter an username';
        } else if (password.length === 0) {
            error = 'You must enter a password';
        }
        setState({
            ...state,
            error: error
        });
        return valid;
    }


    const updateValue = (value, key) => {
        let statevalue = { ...state };
        statevalue[key] = value;
        setState(statevalue);
    }

    const onLoginHandler = async () => {
        if (isValid()) {
            let localstorage = await getStoredValue();
            if (localstorage?.auth_key && localstorage?.auth_key != '') {
                if(isConnected === false && localstorage?.sessionkey != ''){
                    props.actions.validSession(true);
                } else {
                    props.actions.login({ 
                        username: state.username, 
                        password: state.password,
                        authkey:localstorage.auth_key
                    });
                }
               
            } else {
                let req = {
                    username: state.username,
                    password: state.password,
                    ...deviceInfo
                };
                props.actions.registeration(req);
            }

        }
    }

    const onForgetPasswordHandler = () => {
     
    }

    return (<View style={styles.container}>

        <Spinner
            visible={props.isLoadingLogin}
            textContent={'Loading...'}
            textStyle={{ color: "#fff" }}
            size="large"
        />

        <Dialog isVisible={isAlreadyRegistred}>
            <Text>{props?.registrationData?.status}</Text>
            <Dialog.Actions>
                <Dialog.Button
                    title="Ok"
                    onPress={() => {
                        setIsAlreadyRegistred(false);
                    }} />
            </Dialog.Actions>
        </Dialog>
        <Dialog isVisible={loginErrorInfo.isShowLoginError}>
            <Text>{loginErrorInfo?.errorInfo}</Text>
            <Dialog.Actions>
                <Dialog.Button
                    title="Ok"
                    onPress={() => {
                        setLoginErrorInfo({
                            ...loginErrorInfo,
                            isShowLoginError:false
                        });
                        
                    }} />
            </Dialog.Actions>
        </Dialog>

        
        <Image
            style={styles.logoImg}
            source={require('../../assets/logo.png')}
        />
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Username"
                autoCapitalize={'none'}
                value={state.username}
                returnKeyType={'next'}
                onSubmitEditing={() => passwordInput.focus()}
                autoCorrect={false}
                underlineColorAndroid='transparent'
                onChangeText={(username) => updateValue(username, 'username')} />
        </View>

        <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Password"
                ref={(input) => passwordInput = input}
                value={state.password}
                secureTextEntry={true}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                underlineColorAndroid='transparent'
                onChangeText={(password) => updateValue(password, 'password')} />
        </View>
        {state.error != null &&
            <Text style={styles.error}>{state.error}</Text>
        }
        <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => onLoginHandler()}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <ForgetPasswordBtn
            containerStyle={styles.buttonContainer}
            title="Forgot your password?"
            type="clear"
            titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
            onPress={() => onForgetPasswordHandler()}
        />
    </View>);
}



function mapStateToProps(state) {
    return {
        isLoadingLogin: state.login.isLoading,
        loginData: state.login.loginData,
        registrationData: state.login?.registrationData || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);