import Geolocation from 'react-native-geolocation-service';
import { useEffect, useState } from "react";
import { View, PermissionsAndroid, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Dialog } from '@rneui/themed';
import styles from './styles';
import { getStoredValue, setStoredValue } from '../common/storage';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import dateFormat from '../common/dateFormat';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useIsConnected } from 'react-native-offline';


const AttendanceComponent = (props) => {

    const isConnected = useIsConnected();

    console.log("=====> isConnected", isConnected)

    const [coordinate, setCoordinate] = useState({
        latitude: 11.1271,
        longitude: 78.6569,
        latitudeDelta: 0.09,
        longitudeDelta: 0.02
    });

    const [isPunchInBtnDisable, setIsPunchInBtnDisable] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getLocalStoreVal();
            requestLocationPermission();
            setTimeout(()=>{
                setIsVisible(!isVisible);
            }, 100)

        });
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
      if(isVisible === false){
        setIsVisible(!isVisible);
      }
    }, [isVisible])
    
    // if(isConnected === true){
    //     const updateDataToServer = async() => {
    //         let localstoreVal = await getStoredValue();
    //         if(localstoreVal.punchInData && localstorage.punchInData.length>0){

    //         }
    //     }
    //     updateDataToServer();
    // }

    const getLocalStoreVal = async () => {
        let localstoreVal = await getStoredValue();
        if (localstoreVal?.punch_in_sync_id != '' &&
            typeof localstoreVal?.punch_in_sync_id != 'undefined' && isPunchInBtnDisable == false) {
            setIsPunchInBtnDisable(!isPunchInBtnDisable)
        } else if (isPunchInBtnDisable == true) {
            setIsPunchInBtnDisable(!isPunchInBtnDisable)
        }
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Mettex App',
                    'message': 'Mettex App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        
                        setCoordinate({
                            latitude:position.coords.latitude,
                            longitude:position.coords.longitude,
                            latitudeDelta:0.0421,
                            longitudeDelta:0.0421,
                        });
                    },
                    (error) => {
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 30000, maximumAge: 100000 }
                );
            } else {
                console.log("location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const punchInHandler = async () => {
        let localstoreVal = await getStoredValue();
        let req = {
            authkey: localstoreVal.auth_key,
            sessionkey: localstoreVal.sessionkey,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            datetime: dateFormat(new Date())
        }
        // if(isConnected === false){
        //     let punchInData  = [];
        //     if(localstoreVal?.punchInData){
        //         punchInData = [...localstoreVal?.punchInData];
        //     }
        //     punchInData.push(req);
        //     setStoredValue({
        //         punchInData:punchInData,
        //         punch_in_sync_id:'offline'});
        //     setIsPunchInBtnDisable(!isPunchInBtnDisable);
        // } else {
            props.actions.punchIn(req);
       // }
        

    }

    const punchOutHandler = async () => {
        let localstoreVal = await getStoredValue();
        let req = {
            authkey: localstoreVal.auth_key,
            sessionkey: localstoreVal.sessionkey,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            datetime: dateFormat(new Date()),
            sync_id: localstoreVal.punch_in_sync_id
        }
        // if(isConnected === false){
        //     let punchOutData  = [];
        //     if(localstoreVal?.punchOutData){
        //         punchOutData = [...localstoreVal?.punchOutData];
        //     }
        //     punchOutData.push(req);
        //     setStoredValue({
        //         punchOutData:punchOutData,
        //         punch_in_sync_id:''
        //     });
        //     setIsPunchInBtnDisable(!isPunchInBtnDisable);
        //  } else {
            props.actions.punchOut(req);
       // }
        
    }

    useEffect(() => {
        if (props?.punchInData && props?.punchInData?.status == 'success') {
            setIsPunchInBtnDisable(!isPunchInBtnDisable);
            setStoredValue({ punch_in_sync_id: props?.punchInData?.sync_id || '' });
        }
    }, [props.punchInData])

    useEffect(() => {
        if (props?.punchOutData && props?.punchOutData?.status == 'success') {
            setIsPunchInBtnDisable(!isPunchInBtnDisable);
            setStoredValue({ punch_in_sync_id: '' });
        }
    }, [props.punchOutData])

    
    return (
        isVisible === true && (
            <View style={styles.container} >

                <Spinner
                    visible={props.isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: "#fff" }}
                    size="large"
                />

                <Dialog isVisible={props?.punchInData &&
                    props?.punchInData.hasOwnProperty('status') &&
                    props?.punchInData?.status == 'success'}>
                    <Text>Punch In Succssfully updated!!!.</Text>
                    <Dialog.Actions>
                        <Dialog.Button
                            title="Ok"
                            onPress={() => {
                                props.actions.punchInDataClear();
                            }} />
                    </Dialog.Actions>
                </Dialog>

                <Dialog isVisible={props?.punchOutData &&
                    props?.punchOutData.hasOwnProperty('status') &&
                    props?.punchOutData?.status == 'success'}>
                    <Text>Punch Out Succssfully updated!!!.</Text>
                    <Dialog.Actions>
                        <Dialog.Button
                            title="Ok"
                            onPress={() => {
                                props.actions.punchOutDataClear();
                            }} />
                    </Dialog.Actions>
                </Dialog>

                <Dialog isVisible={props?.punchInData &&
                    props?.punchInData.hasOwnProperty('status') &&
                    props?.punchInData?.status != 'success'}>
                    <Text>{props?.punchInData?.status}</Text>
                    <Dialog.Actions>
                        <Dialog.Button
                            title="Ok"
                            onPress={() => {
                                props.actions.punchInDataClear();
                            }} />
                    </Dialog.Actions>
                </Dialog>

                <Dialog isVisible={props?.punchOutData &&
                    props?.punchOutData.hasOwnProperty('status') &&
                    props?.punchOutData?.status != 'success'}>
                    <Text>{props?.punchOutData?.status}</Text>
                    <Dialog.Actions>
                        <Dialog.Button
                            title="Ok"
                            onPress={() => {
                                props.actions.punchOutDataClear();
                            }} />
                    </Dialog.Actions>
                </Dialog>

                <View style={styles.mapContainer}>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={coordinate}
                        zoomEnabled={true}
                        maxZoomLevel={20}
                        zoomTapEnabled={true}
                    >
                        <Marker coordinate={coordinate} />

                    </MapView>
                </View>
                <View style={styles.mapFooterContainer}>
                    <Button
                        disabled={isPunchInBtnDisable}
                        title={'PUNCH IN'}
                        containerStyle={{
                            width: 150,
                        }}
                        onPress={() => punchInHandler()}
                    />
                    <Button
                        disabled={!isPunchInBtnDisable}
                        title={'PUNCH OUT'}
                        containerStyle={{
                            width: 150,
                        }}
                        onPress={() => punchOutHandler()}
                    />
                </View>

            </View>
        )
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.attendance.isLoading,
        punchInData: state.attendance.punchInData,
        punchOutData: state.attendance.punchOutData,
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
)(AttendanceComponent);

