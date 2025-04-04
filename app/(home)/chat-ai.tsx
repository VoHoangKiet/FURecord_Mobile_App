import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAssistantAnswer } from "@/apis/deepseek.api";
import { useAllCourses } from "@/hooks/useAllCourses";
import { Toast } from "@ant-design/react-native";
import { router } from "expo-router";

const STORAGE_KEY = "chat_history";

const ChatAIScreen = () => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const { data: courses } = useAllCourses();

  if (!courses) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        } else {
          setMessages([
            {
              _id: 1,
              text: "Xin chào! Mình là bot hỗ trợ tìm khóa học.",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "Bot",
                avatar:
                  "https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40646.jpg",
              },
            },
          ]);
        }
      } catch (error: any) {
        Toast.fail("Lỗi tải lịch sử chat:", error);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Lỗi khi lưu lịch sử chat:", error);
      }
    };

    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    const userMessage: any = newMessages[0];
    try {
      const response = await getAssistantAnswer(
        userMessage.text as string,
        courses
      );
      if (response) {
        const relatedCourses = courses.filter((course) =>
          response.includes(course.name)
        );

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
          relatedCourses,
        };

        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, [botMessage])
        );
      }
    } catch (error) {
      const botMessage = {
        _id: Math.random(),
        text: `Xin lỗi :( Mình chưa thể trả lời ngay bây giờ. ${error}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar:
            "https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40646.jpg",
        },
      };
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [botMessage])
      );
    }
  }, []);

  const renderBubble = (props: any) => {
    const { currentMessage } = props;

    return (
      <View>
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
        />
        {currentMessage?.relatedCourses?.map((course: any) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseButton}
            onPress={() =>
              router.navigate({
                pathname: "/(home)/learns/[id]",
                params: { id: course.id },
              })
            }
          >
            <Text style={styles.courseButtonText}>
              Xem khóa học "{course.name}"
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
          name: "Người dùng",
        }}
        renderBubble={renderBubble}
        renderInputToolbar={(props) => (
          <InputToolbar {...props} containerStyle={{ borderColor: "#ddd" }} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center" },
  courseButton: {
    backgroundColor: "#e80de1",
    padding: 8,
    borderRadius: 15,
    marginTop: 5,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  courseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatAIScreen;
