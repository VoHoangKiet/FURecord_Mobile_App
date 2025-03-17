import axios, { AxiosError, AxiosInstance } from 'axios';
import { appUrls, getAccessToken, getRefreshToken } from './contants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPIRED_TOKEN = 100210;

export class Api {
    instance: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: { resolve: (value: string) => void; reject: (reason?: Error) => void }[] = [];

    constructor() {
        this.instance = axios.create({
          timeout: 7000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.setupInterceptors();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private isExpiredTokenError(error: AxiosError | any) {
        return error.response?.status === 401 && error?.response?.data?.errors[0]?.errorCode === EXPIRED_TOKEN;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private processQueue(error: any, token: string | null = null) {
        this.failedQueue.forEach(({ resolve, reject }) => {
            if (token) resolve(token);
            else reject(error);
        });
        this.failedQueue = [];
    }

    private async refreshToken() {
        try {
            const response = await axios.get(`${appUrls.authenURL}/refresh-token`, {
                headers: {
                    Authorization: `Bearer ${getRefreshToken()}`,
                },
            });

            const newToken = response.data.data.accessToken;
            await AsyncStorage.setItem('accessToken', newToken);
            return newToken;
        } catch (error) {
            localStorage.clear();
            throw error;
        }
    }

    private setupInterceptors() {
        this.instance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (!this.isExpiredTokenError(error)) return Promise.reject(error);

                if (!this.isRefreshing) {
                    this.isRefreshing = true;

                    try {
                        const newToken = await this.refreshToken();
                        this.processQueue(null, newToken);
                        return this.instance.request(error.config!);
                    } catch (refreshError) {
                        this.processQueue(refreshError, null);
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                } else {
                    return new Promise((resolve, reject) => {
                        this.failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            if (error.config) {
                                error.config.headers!['Authorization'] = `Bearer ${token}`;
                                return this.instance.request(error.config);
                            }
                            return Promise.reject(new Error('No config found'));
                        })
                        .catch((err) => Promise.reject(err));
                }
            }
        );

        this.instance.interceptors.request.use((config) => {
            const token = getAccessToken();
            if (token) config.headers!['Authorization'] = `Bearer ${token}`;
            return config;
        });
    }
}

const api = new Api().instance;
export default api;