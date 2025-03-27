import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./axiosCustom";
import { appUrls } from "./contants";

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface User {
  id: number;
  about: string;
  avatarUrl: string;
  balance: number;
  dob: Date | null;
  email: string;
  fullName: string;
  gender: string | null;
  legitMark: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateProfileDTO {
  fullName: string;
  about: string;
  dob: Date;
  gender: string;
  avatarUrl?: string;
}

export interface SignUpDTO {
  email: string;
  fullName: string;
  password: string;
}
export const getProfileInfo = async (): Promise<User> => {
  const response = await api.get(`${appUrls.backendUrl}/profile`);
  return response.data;
};

export const getToken = async (): Promise<string> => {
  return (await AsyncStorage.getItem("token")) as string;
};

export const getRole = async (): Promise<string> => {
  return (await AsyncStorage.getItem("role")) as string;
};

export const getAllUser = async (): Promise<User[]> => {
  const response = await api.get(`${appUrls.backendUrl}/public/users`);
  return response.data;
};

export const updateUserProfile = async (body: UpdateProfileDTO) => {
  const response = await api.put(`${appUrls.backendUrl}/user/profile`, body);
  return response.data;
};

export const updateImageProfile = async (body: FormData): Promise<string> => {
  const response = await api.patch(`${appUrls.backendUrl}/update-avatar`, body, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return response.data;
};

export const signUp = async (body: SignUpDTO) => {
  const response = await api.post(`${appUrls.backendUrl}/signup`, body);
  return response.data;
}