import axios from "axios";

const DEEP_SEEK_API_KEY = "sk-";

export const getAssistantAnswer = async () => {
  try {
    const response = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        "stream": false
      },
      {
        headers: {
          Authorization: `Bearer ${DEEP_SEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data.choices[0].message.content);
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
  }
};
