import axios from "axios";
import api from "./axiosCustom";
import { appUrls } from "./contants";
export interface ReviewDocument {
  id: number;
  state: "helpful" | "unhelpful";
  userId: string;
}

export interface Document {
  id: number;
  fileUrl: string;
  createdAt: string;
  description: string;
  userId: string;
  topicId: string;
  title: string;
  state: "active" | "pending";
  reviews: ReviewDocument[];
}

export interface DocumentDTO {
  title: string,
  topic: string,
  description: string,
  file: any
}

interface ApiResponse {
  message?: string;
  error?: string;
}

export const getAllDocuments = async (): Promise<Document[]> => {
  const response = await api.get(`${appUrls.backendUrl}/document/all`);
  return response.data;
};

export const getDocumentById = async (
  documentId: number
): Promise<Document | undefined> => {
  try {
    const response = await api.get(`${appUrls.backendUrl}/document`, {
      params: { documentId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching document:", error);
    return undefined;
  }
};

export const uploadDocument = async (body: FormData): Promise<string> => {
  try {
    const response = await api.post(
      `${appUrls.backendUrl}/upload-document`,
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
      return `'Lỗi từ server:', ${serverError}`;
    } else {
      return "Đã xảy ra lỗi, vui lòng thử lại.";
    }
  }
};
