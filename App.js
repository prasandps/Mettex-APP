
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Login from './app/component/login';
import configureStore from "./app/store/config-store";

const App = () => {
  const store = configureStore(window.__INITIAL_STATE__);
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

export default App;
