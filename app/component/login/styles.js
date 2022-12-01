
import {
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    logoImg: {
        width: 100,
        height: 100,
        marginBottom: 50
    },
    error: {
        width: "80%",
        marginBottom: 20,
        color: "red"
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderBottomWidth: 1,
        width: "80%",
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 50,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    buttonContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: "80%",
        borderRadius: 5,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});

export default styles;