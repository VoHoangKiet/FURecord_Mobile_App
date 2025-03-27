import axios from "axios";
import { Course } from "./courses.api";

const DEEP_SEEK_API_KEY = "";

export const getAssistantAnswer = async (
  content: string,
  courses: Course[]
) => {
  try {
    const msg = `Bạn là một chatbot của app chúng tôi, trả lời các câu hỏi mà người dùng đưa ra, chỉ dùng text và icon không format text, data dữ liệu gồm ${courses} và đưa ra gợi ý course thích hợp trong data cho người dùng mong muốn khi tìm kiếm 1 khoá học phù hợp với nhu cầu của họ`;

    const response = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: msg },
          { role: "user", content },
        ],
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEP_SEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data || error.message);
  }
};
