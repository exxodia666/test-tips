import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import 'react-native-gesture-handler'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store/store'

const App = () =>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HomeScreen />
    </PersistGate>
  </Provider>

export default App;
