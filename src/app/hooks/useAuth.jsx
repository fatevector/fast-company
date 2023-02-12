import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import {
    getAccessToken,
    removeAuthData,
    setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import getRandomInt from "../utils/getRandomInt";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const createUser = async data => {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async ({ email, password, ...rest }) => {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
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
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    };

    const logIn = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (
                    message === "INVALID_PASSWORD" ||
                    message === "EMAIL_NOT_FOUND"
                ) {
                    throw new Error("Email или пароль введены некорректно");
                } else {
                    throw new Error(
                        "Слишком много попыток входа. Попробуйте позднее"
                    );
                }
            }
        }
    };

    const logOut = () => {
        removeAuthData();
        setUser(null);
        history.push("/");
    };

    const updateUser = async payload => {
        try {
            if (payload.email !== currentUser.email) {
                const { data } = await httpAuth.post("accounts:update", {
                    idToken: getAccessToken(),
                    email: payload.email,
                    returnSecureToken: true
                });
                console.log(data);
                setTokens(data);
            }
            const newData = {
                ...currentUser,
                ...payload
            };
            const { content } = await userService.update(newData);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    };

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
    };

    useEffect(() => {
        if (getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider
            value={{ signUp, logIn, logOut, updateUser, currentUser }}
        >
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
