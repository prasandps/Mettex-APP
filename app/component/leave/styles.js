
import {
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    dateContainer: {
        // flex: 1,
         flexDirection: 'row',
         justifyContent:"space-between",
         marginTop:16,
        //  flexWrap: 'wrap',
        // alignItems: 'flex-start' // if you want to fill rows left to right
      },
      dateTime:{width:"100%"},
      dateItem: {
        width: '50%' // is 50% of container width
      },
      btn:{
        width: '45%'
      },
      dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      btnContainer:{
        marginBottom:20
      }
});

export default styles;