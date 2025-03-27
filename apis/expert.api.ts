import axios from "axios";
import api from "./axiosCustom";
import { appUrls } from "./contants";

interface ApiResponse {
  message?: string;
  error?: string;
}
export type ExpertRequestType = "PENDING" | "ACCEPTED";
export interface ExpertRequest {
  id: number;
  userId: string;
  cvUrl: string;
  createdAt: Date;
  state: ExpertRequestType;
}
export const requestExpert = async (body: FormData): Promise<string> => {
  try {
    const response = await api.post(
      `${appUrls.backendUrl}/expert-request`,
      body,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data as ApiResponse;
      return `'Error from server:', ${serverError}`;
    } else {
      return "An error had been occur, please try again.";
    }
  }
};

export const myExpertRequest = async (): Promise<ExpertRequest> => {
  try {
    const response = await api.get(
      `${appUrls.backendUrl}/expert-requests/my-request`
    );
    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data as ApiResponse;
      throw new Error(`'Error from server:', ${serverError}`);
    } else {
      throw new Error("An error had been occur, please try again.");
    }
  }
};
