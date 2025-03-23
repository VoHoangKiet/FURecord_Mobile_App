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

export const getAllCourses = async (): Promise<Course[]> => {
  const response = await api.get(`${appUrls.backendUrl}/public/courses`);
  return response.data;
};
