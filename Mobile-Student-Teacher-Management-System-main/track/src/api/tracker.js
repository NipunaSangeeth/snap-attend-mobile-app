import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';
import { navigateToSignup } from '../navigationHelper';

// Automatically detect the correct local address for the emulator/simulator
const baseURL = Platform.OS === 'android' 
    ? 'http://10.0.2.2:3000' 
    : 'http://localhost:3000';

const instance = axios.create({
    baseURL
});

// =====================================================
// JWT Token Interceptor - DO NOT REMOVE
// This attaches the login token to every API request.
// Without this, all authenticated routes will return
// "You must be logged in" errors.
// =====================================================
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            // If we get a 401, it means the token is invalid or user no longer exists
            // We should clear the token to force a re-login
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userType');
            console.log('Token and userType cleared due to 401 error');
            // Use navigation ref directly or ensure no circularity
            navigateToSignup();
        }
        return Promise.reject(error);
    }
);

export default instance;