import axios, { AxiosError, AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export class Api {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            timeout: 7000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private async handleLogout() {
        const router = useRouter();
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('role');
        router.replace("/(auth)");
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(async (config) => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers!['Authorization'] = `${token}`;
            }
            return config;
        });

        this.instance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    this.handleLogout();
                }
                return Promise.reject(error);
            }
        );
    }
}

const api = new Api().instance;
export default api;
