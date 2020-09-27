import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {store} from './reducers/Store';
import {Provider} from 'react-redux';
import {DrawerNavigationScreen} from './screens/DrawerNavigationScreen';
import {ToastHandler} from './components/ToastHandler';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigationScreen />
      </NavigationContainer>
      <ToastHandler />
    </Provider>
  );
};

export default App;
