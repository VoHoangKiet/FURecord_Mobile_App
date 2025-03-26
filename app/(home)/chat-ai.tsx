import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { getAssistantAnswer } from "@/apis/deepseek.api";

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

  useEffect(() => {
    setMessages([
      {
      _id: 1,
      text: "Xin chào! Mình là bot Gifted Chat.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
        avatar: "https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40646.jpg",
      },
      },
      {
      _id: 2,
      text: "Xin chào! Mình là bot Gifted Chat.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
        avatar: "https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40646.jpg",
      },
      },
      {
      _id: 3,
      text: "Xin chào! Mình là bot Gifted Chat.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
        avatar: "https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40646.jpg",
      },
      },
    ]);
    getAssistantAnswer();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
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
            containerStyle={{ left: { marginBottom: 10} }}
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
