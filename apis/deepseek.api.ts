import axios from "axios";
import { Course } from "./courses.api";

const DEEP_SEEK_API_KEY = "xai-br6P3jAoWt0eJAyt85acgBZ3O9TdfIUDvXTgevjtO0edLjmmGbcNNMZa0JGcLQFkymCLKmD7Jw1Wxutu";

export const getAssistantAnswer = async (
  content: string,
  courses: Course[]
) => {
  try {
    // Định dạng danh sách khóa học rõ ràng hơn
    const courseList = courses
      .map(
        (course) =>
          `- ${course.name} (${course.price} $): ${course.description}`
      )
      .join("\n");

    const msg = `Bạn là trợ lý AI chuyên tư vấn khóa học cho ứng dụng của chúng tôi. 
    - Bạn chỉ dựa trên danh sách khóa học nội bộ để tư vấn.
    - Khi người dùng tìm kiếm khóa học, bạn phân tích nhu cầu của họ và đề xuất khóa học phù hợp nhất.
    - Dữ liệu khóa học hiện có:
    ${courseList}
    - Không trả lời những câu hỏi ngoài danh sách khóa học.`; 

    const response = await axios.post(
      "https://api.x.ai/v1/chat/completions",
      {
        messages: [
          { role: "system", content: msg },
          { role: "user", content },
        ],
        model: "grok-2-latest",
        stream: false,
        temperature: 0.2, // Giữ câu trả lời ổn định, tránh lan man
      },
      {
        headers: {
          Authorization: `Bearer ${DEEP_SEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0]?.message?.content || "Không có phản hồi từ AI.";
  } catch (error: any) {
    console.error(
      "Lỗi khi gọi API AI:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error?.message || "Lỗi không xác định"
    );
  }
};
