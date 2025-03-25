import api from "./axiosCustom";
import { appUrls } from "./contants";
export interface TopicCourse {
  id: number;
  name: string;
}

export const getAllTopics = async (): Promise<TopicCourse[]> => {
  const response = await api.get(`${appUrls.backendUrl}/topics`);
  return response.data;
};
