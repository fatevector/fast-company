import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
