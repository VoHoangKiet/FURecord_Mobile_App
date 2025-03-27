import axios from "axios";
import api from "./axiosCustom";
import { appUrls } from "./contants";
export interface Lesson {
  id: number;
  videoUrl: string;
  lessonOrder: number;
  name: string;
}
export interface ReviewCourse {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  rate: number;
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
  reviews: ReviewCourse[];
  topicId: string;
  state: "active" | "pending";
}

export interface CourseExpert {
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
  reviews: ReviewCourse[];
  topicId: string;
  state: "active" | "pending";
  totalUserBuy: number,
  income: number
}

interface ApiResponse {
  message?: string;
  error?: string;
}

export const getAllCourses = async (): Promise<Course[]> => {
  const response = await api.get(`${appUrls.backendUrl}/public/courses`);
  return response.data;
};

export const getAllCoursesBought = async (): Promise<Course[]> => {
  const response = await api.get(`${appUrls.backendUrl}/course/bought`);
  return response.data;
};

export const getAllMyExpertCourses = async (): Promise<CourseExpert[]> => {
  try {
    const response = await api.get(`${appUrls.backendUrl}/expert/courses`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data as ApiResponse;
      throw new Error(`'Error from server:', ${serverError}`);
    } else {
      throw new Error("An error had been occur, please try again.");
    }
  }
};
