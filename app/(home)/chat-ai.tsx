import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getAssistantAnswer } from "@/apis/deepseek.api";
import { useAllCourses } from "@/hooks/useAllCourses";

const ChatAIScreen = () => {
  const [messages, setMessages] = useState<
    Array<{
      _id: number;
      text: string;
      createdAt: Date;
      user: {
        _id: number;
        name: string;
        avatar: string;
      };
    }>
  >([]);
  const { data: courses } = useAllCourses();

  if (!courses) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Xin chào! Mình là bot Gifted Chat.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar:
            "https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40646.jpg",
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage: any = newMessages[0];
    try {
      const response = await getAssistantAnswer(
        userMessage.text as string,
        courses
      );
      if (response) {
        const botMessage = {
          _id: Math.random(),
          text: response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Bot",
            avatar:
              "https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40646.jpg",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessage])
        );
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
          name: "Người dùng",
        }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: "#2e64e5" },
              left: { backgroundColor: "#e5e5e5" },
            }}
            textStyle={{
              right: { color: "#fff" },
              left: { color: "#000" },
            }}
            containerStyle={{ left: { marginBottom: 10 } }}
          />
        )}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              borderColor: "#ddd",
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

export default ChatAIScreen;
