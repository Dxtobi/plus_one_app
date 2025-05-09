import axios, { AxiosHeaderValue, AxiosRequestHeaders } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { AxiosRequestConfig, AxiosError } from 'axios';


const customAxios = axios.create({
  baseURL: 'http://192.168.244.83:5000/api', 
  timeout: 10000, 
});


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders & {
        Authorization?: AxiosHeaderValue;
    };
}

customAxios.interceptors.request.use(
    async (config: CustomAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('userToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

interface CustomAxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: CustomAxiosRequestConfig;
    request?: any;
}

interface CustomAxiosError extends AxiosError {
    response?: CustomAxiosResponse;
}

customAxios.interceptors.response.use(
    (response: CustomAxiosResponse) => {
        return response;
    },
    (error: CustomAxiosError) => {
        if (error.response) {
            
            if (error.response.status === 401) {
               
                Alert.alert('Session Expired', 'Please log in again.');
                
                AsyncStorage.removeItem('userToken');
            } else if (error.response.status === 403) {
                
                Alert.alert('Access Denied', 'You do not have permission to perform this action.');
            } else if (error.response.status >= 500) {
                
                Alert.alert('Server Error', 'An unexpected error occurred. Please try again later.');
            }
        } else if (error.request) {
            
            Alert.alert('Network Error', 'Unable to connect to the server. Please check your internet connection.');
        } else {
            
            Alert.alert('Error', error.message || 'An unexpected error occurred.');
        }
        return Promise.reject(error);
    }
);

export default customAxios;