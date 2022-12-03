import Geolocation from 'react-native-geolocation-service';
import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { StyleSheet, View, Platform, PermissionsAndroid } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, enableLatestRenderer } from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const AttendanceComponent = () => {
    const [coordinate, setCoordinate] = useState({
        latitude: 11.1271,
        longitude: 78.6569,
        latitudeDelta: 0.09,
        longitudeDelta: 0.02
    });


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
                        console.log(position);
                        setCoordinate({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0421,
                            longitudeDelta: 0.0421,
                        });
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 30000, maximumAge: 100000 }
                );



            } else {
                console.log("location permission denied")
                ///alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    useEffect(() => {
        requestLocationPermission();

    }, [])


    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={coordinate}
            //  onRegionChange={onRegionChange}
            >
                <Marker coordinate={coordinate} />

            </MapView>



        </View>
    )
}

export default AttendanceComponent;