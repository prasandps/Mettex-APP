
import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from "./app/store/config-store";
import RoutingComponent from './app/component/routing/index'
import SplashScreen from 'react-native-splash-screen'
import 'react-native-gesture-handler';
import { NetworkProvider } from 'react-native-offline';

const App = () => {

  const store = configureStore(window.__INITIAL_STATE__);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }, [])
  
 
  return (
    <Provider store={store}> 
      <NetworkProvider>
        <RoutingComponent/>
      </NetworkProvider>
    </Provider>
  );
};

export default App;
