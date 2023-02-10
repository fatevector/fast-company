import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
