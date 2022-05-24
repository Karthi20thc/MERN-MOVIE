import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"
// import storage from 'redux-persist/lib/storage'

// import {
//  persistStore,
//  persistReducer,
//  FLUSH,
//  REHYDRATE,
//  PAUSE,
//  PERSIST,
//  PURGE,
//  REGISTER,
// } from 'redux-persist'

// const persistConfig = {
//  key: 'root',
//  version: 1,
//  storage,
// }
// const combineReducers = {
//  cart: cartReducer,
//  user: userReducer
// }  wrong

// const rootReducer = combineReducers({
//  cart: cartReducer,
//  user: userReducer
// })
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//  reducer: persistedReducer,
//  middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//    serializableCheck: {
//     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//    },
//   }),
// })
export const store = configureStore({
 reducer: {
  cart: cartReducer,
  user: userReducer
 }
})

// export let persister = persistStore(store)

