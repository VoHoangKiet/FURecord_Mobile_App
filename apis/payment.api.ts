import api from "./axiosCustom";
import { appUrls } from "./contants";

export const paymentCourse = async (body: FormData): Promise<any> => {
    const response = await api.post(`${appUrls.backendUrl}/payment`, body, {
        headers: {
          "content-type": "multipart/form-data",
        },
    });
    return response.data;
  };