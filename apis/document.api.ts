import api from "./axiosCustom"
import { appUrls } from "./contants"
export interface Review {
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
    reviews: Review[];
}

export const getAllDocuments = async ():Promise<Document[]> => {
    const response = await api.get(`${appUrls.backendUrl}/document/all`);
    return response.data;
}

export const getDocumentById = async (documentId: number):Promise<Document | null> => {
    try {
        const response = await api.get(`${appUrls.backendUrl}/document`, {
          params: { documentId }
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching document:", error);
        return null;
      }
}
