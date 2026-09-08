import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

const BASE_URL = "https://fakestoreapi.com/";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


apiClient.interceptors.request.use((config : InternalAxiosRequestConfig) => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('auth_token');

    // if the token already exists stick it into the authorization headers 

    if (token && config.headers){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

apiClient.interceptors.response.use(
    // if server responds with 200 
    (response) => response,

    (error: AxiosError) => {
        if (error.response?.status === 401){
            localStorage.removeItem('auth_token');
            window.location.href = '/login';

        }

        return Promise.reject(error);
    }
)