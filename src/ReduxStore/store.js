import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../itemSlices/userSlice";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

// saveFilterForUserOnly
// it takes two arguments
// 1. feature that we want to save
// 2. specific field from the feature that we want to save.

const saveFilterForUserOnly = createFilter('user', ['user']) 



// persist config to save the data
// there are 2 types of storage
// 1. storage: stores the data on computer
// 2. sessionStorage: if you refresh, still your data will be there, but if you close the browser, data will be gone. 

const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],    // list of data we want to save in storage in computer
    transforms: [saveFilterForUserOnly]
};



// combine all the reducer, e.g users, chat, etc..
const rootReducer = combineReducers({
    user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // reducer: rootReducer, // normal way, without storing the data
    reducer: persistedReducer, // it saves the user info
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
    
})

export const persistor = persistStore(store);