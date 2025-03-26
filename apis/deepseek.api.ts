import axios from "axios";

const DEEP_SEEK_API_KEY = "";

export const getAssistantAnswer = async () => {
  try {
    const response = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [{ role: "system", content: "You are a helpful assistant." }],
      },
      {
        headers: {
          Authorization: `Bearer ${DEEP_SEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
  }
};
