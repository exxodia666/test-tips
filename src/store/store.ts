// configureStore.js

import { AsyncStorage } from 'react-native'
import { createSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);

const persistor = persistStore(store);

export { persistor, store };

//types
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useTypedSelector = createSelectorHook<RootState>();