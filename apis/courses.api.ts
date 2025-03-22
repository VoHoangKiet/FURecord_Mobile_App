import api from "./axiosCustom";
import { appUrls } from "./contants";
export interface Lesson {
  id: number;
  videoUrl: string;
  lessonOrder: number;
  name: string;
}

export interface Course {
  id: number;
  expertId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  bannerUrl: string;
  name: string;
  lessons: Lesson[];
  orders: any[];
  reviews: any[];
  topicId: string;
  state: "active" | "pending";
}

export const getAllCourses = async (): Promise<Document[]> => {
  const response = await api.get(`${appUrls.backendUrl}/document/all`);
  return response.data;
};

export const getCourseById = async (
  courseId: number
): Promise<Document | null> => {
  try {
    const response = await api.get(`${appUrls.backendUrl}/document`, {
      params: { courseId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};
