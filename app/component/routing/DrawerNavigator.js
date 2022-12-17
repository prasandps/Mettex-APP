import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AttendanceComponent from '../attendance';
import ClaimComponent from '../claim';
import LeaveComponent from '../leave';
import LoanComponent from '../loan';
import HomeComponent from './../home/index';
import CustomSidebarMenu from './CustomSidebarMenu';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    
      return( <Drawer.Navigator drawerContent={(props) => <CustomSidebarMenu {...props} />}>
            {/* <Drawer.Screen name="Home" component={HomeComponent}/> */}
            <Drawer.Screen name="Attendance" component={AttendanceComponent}/>
            {/* <Drawer.Screen name="Claim" component={ClaimComponent}/>
            <Drawer.Screen name="Loan" component={LoanComponent}/>
            <Drawer.Screen name="Leave" component={LeaveComponent}/> */}
        </Drawer.Navigator>);
    

}

export default DrawerNavigator;