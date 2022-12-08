
import {
    StyleSheet,
} from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 0.9
    },
    mapFooterContainer: {
        flex: 0.1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default styles;