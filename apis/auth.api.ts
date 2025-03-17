import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface AuthCredentials {
  token: string;
  refreshToken: string;
}
export const login = async (credentials: LoginCredentials): Promise<AuthCredentials> => {
  const response = await api.post(`${appUrls.authenURL}/login`, credentials);
  return {
    token: response.data.data.accessToken,
    refreshToken: response.data.data.refreshToken,
  };
};