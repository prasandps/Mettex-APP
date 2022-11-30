
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Login from './app/component/login';
import configureStore from "./app/store/config-store";
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const obj = configureStore(window.__INITIAL_STATE__);
  return (
    <Provider store={obj.store}>
      <PersistGate loading={null} persistor={obj.persistor}>
        <Login />
      </PersistGate>
    </Provider>
  );
};

export default App;
