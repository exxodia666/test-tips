import React from 'react';
import 'react-native-gesture-handler'
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
    </GestureHandlerRootView>
  </PersistGate>
</Provider>


export default App;
