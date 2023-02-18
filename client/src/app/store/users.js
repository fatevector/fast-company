import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: state => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!state.entities) state.entities = [];
            state.entities.push(action.payload);
        },
        userLoggedOut: state => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdated: (state, action) => {
            const userIndex = state.entities.findIndex(
                user => user._id === action.payload._id
            );
            state.entities[userIndex] = {
                ...state.entities[userIndex],
                ...action.payload
            };
            return state;
        },
        authRequested: state => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdated,
    authRequested
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const updateUserFailed = createAction("users/updateUserFailed");
const createUserFailed = createAction("users/createUserFailed");

export const logIn =
    ({ payload, redirect }) =>
    async dispatch => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

const createUser = data => async dispatch => {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.create(data);
        dispatch(userCreated(content));
        history.push("/users");
    } catch (error) {
        dispatch(createUserFailed(error.message));
    }
};

export const signUp =
    ({ email, password, ...rest }) =>
    async dispatch => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: getRandomInt(1, 5),
                    completedMeetings: getRandomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const logOut = () => dispatch => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const loadUsersList = () => async dispatch => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const updateUser =
    ({ payload, redirect }) =>
    async (dispatch, getState) => {
        dispatch(userUpdateRequested());
        try {
            const currentUser = getState().users.entities.find(
                user => user._id === payload._id
            );
            if (payload.email !== currentUser.email) {
                const data = await authService.update(payload.email);
                localStorageService.setTokens(data);
            }
            const newData = {
                ...currentUser,
                ...payload
            };
            const { content } = await userService.update(newData);
            dispatch(userUpdated(content));
            history.push(redirect);
        } catch (error) {
            dispatch(updateUserFailed(error.message));
        }
    };

export const getUsers = () => state => state.users.entities;

export const getUserById = userId => state => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId);
    }
};

export const getIsLoggedIn = () => state => state.users.isLoggedIn;

export const getDataStatus = () => state => state.users.dataLoaded;

export const getCurrentUserId = () => state => state.users.auth.userId;

export const getUsersLoadingStatus = () => state => state.users.isLoading;

export const getCurrentUserData = () => state => {
    if (state.users.entities) {
        return state.users.entities.find(
            user => user._id === state.users.auth.userId
        );
    }
};

export const getAuthErrors = () => state => state.users.error;

export default usersReducer;
