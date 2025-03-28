import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import {
  Button,
  Form,
  Input,
  Picker,
  PickerColumnItem,
  PickerValue,
  Toast,
} from "@ant-design/react-native";
import { useAllTopics } from "@/hooks/useAllTopics";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCourse } from "@/apis/courses.api";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const AddCourseScreen = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { data: topics } = useAllTopics();
  const [selectedTopic, setSelectedTopic] = useState<PickerValue[]>([]);
  const [bannerUri, setBannerUri] = useState("");
  const [lessons, setLessons] = useState<{ name: string; uri: string }[]>([]);
  const { mutate: createCourseMutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return uploadCourse(formData);
    },
  });

  const handlePickFile = async (field: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: field === "banner" ? ["image/*"] : ["video/*"],
        copyToCacheDirectory: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0)
        return;

      const selectedFile = result.assets[0];

      if (field === "banner") {
        setBannerUri(selectedFile.uri);
      } else {
        setLessons((prev) => [
          ...prev,
          { name: selectedFile.name, uri: selectedFile.uri },
        ]);
      }
    } catch (error: any) {
      console.log(error.message);
      Toast.fail(error.message);
    }
  };

  if (!topics) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  const pickerTopics: PickerColumnItem[] = topics.map((topic) => ({
    label: topic.name,
    value: topic.id,
  }));

  const onTopicChange = (value: PickerValue[]) => {
    setSelectedTopic(value);
  };

  const handleSubmit = () => {
    if (!bannerUri) {
      Toast.fail("Please choose banner!");
      return;
    }

    if (lessons.length === 0) {
      Toast.fail("Please choose at least 1 lesson!");
      return;
    }

    form.submit();
  };

  const onFinish = (values: any) => {
    let formData = new FormData();
    if (bannerUri) {
      formData.append("banner", {
        uri: bannerUri,
        type: "image/jpeg",
        name: "banner.jpg",
      } as any);
    }
    lessons.forEach((lesson, index) => {
      formData.append("files", {
        uri: lesson.uri,
        type: "video/mp4",
        name: `lesson_${index + 1}.mp4`,
      } as any);
    });
    formData.append("topic_id", values.topic[0]);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("name", values.name);
    createCourseMutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["myCourses"] });
        Toast.success("Created successfully");
        router.replace("/(home)/profile")
      },
      onError(data: any) {
        Toast.fail(data.response.data.message);
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Public Profile</Text>
      <Form
        style={styles.formContainer}
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          style={styles.formItem}
          name="name"
          label="Course Name"
          rules={[{ required: true }]}
        >
          <Input style={styles.input} />
        </Form.Item>
        <Form.Item
          style={styles.formItem}
          name="topic"
          label="Chủ đề"
          rules={[{ required: true, message: "Vui lòng nhập chủ đề" }]}
        >
          <Picker
            data={pickerTopics}
            cols={1}
            onOk={(v: PickerValue[]) => onTopicChange(v)}
          >
            <TouchableOpacity style={[styles.input, { padding: 10 }]}>
              <Text style={{ fontSize: 16 }}>
                {topics.find(
                  (topic) => topic.id.toString() === selectedTopic?.toString()
                )?.name || "Select Topic"}
              </Text>
            </TouchableOpacity>
          </Picker>
        </Form.Item>
        <Form.Item
          style={styles.formItem}
          name="price"
          label="Price (USD)"
          rules={[{ required: true }]}
        >
          <Input keyboardType="numeric" style={styles.input} />
        </Form.Item>
        <Form.Item
          style={styles.formItem}
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input multiline style={styles.input} />
        </Form.Item>
      </Form>
      {bannerUri && (
        <Image
          source={{ uri: bannerUri }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      )}
      <Button onPress={() => handlePickFile("banner")} style={styles.input}>
        Pick Banner Image
      </Button>
      {lessons?.length > 0 && (
        <ScrollView style={styles.videoList}>
          {lessons?.map((lesson, index) => (
            <Text key={index} style={styles.videoItem}>
              {lesson.name}
            </Text>
          ))}
        </ScrollView>
      )}
      <Button onPress={() => handlePickFile("lessons")} style={styles.input}>
        Pick Lesson Videos
      </Button>

      <Button loading={isPending} disabled={isPending} onPress={handleSubmit}>
        {isPending ? "Uploading..." : "Create"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 1200,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  formItem: {
    height: 110,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 5,
  },
  bannerImage: {
    width: "80%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  videoScroll: {
    marginBottom: 10,
  },
  video: {
    width: width * 0.8,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  videoList: {
    marginTop: 10,
  },
  videoItem: {
    fontSize: 16,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});

export default AddCourseScreen;
