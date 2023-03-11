import axios from "axios";
import localStorageService from "./localStorage.service";
import configFile from "../config.json";

const httpAuth = axios.create({
    baseURL: configFile.API_BASE_URL + "auth/"
});

const authService = {
    register: async payload => {
        const { data } = await httpAuth.post("signUp", payload);
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post("signInWithPassword", {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
    // update: async email => {
    //     const expiresDate = localStorageService.getTokenExpiresDate();
    //     const refreshToken = localStorageService.getRefreshToken();
    //     if (refreshToken && expiresDate < Date.now()) {
    //         const { data } = await httpAuth.post("token", {
    //             grant_type: "refresh_token",
    //             refresh_token: localStorageService.getRefreshToken()
    //         });
    //         localStorageService.setTokens({
    //             refreshToken: data.refresh_token,
    //             idToken: data.id_token,
    //             expiresIn: data.expires_in,
    //             localId: data.user_id
    //         });
    //         console.log(data);
    //         console.log("update access token");
    //     }
    //     const { data } = await httpAuth.post("update", {
    //         idToken: localStorageService.getAccessToken(),
    //         email,
    //         returnSecureToken: true
    //     });
    //     return data;
    // }
};

export default authService;
