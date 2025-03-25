import * as DocumentPicker from "expo-document-picker";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentDTO, uploadDocument } from "@/apis/document.api";
import {
  Button,
  Form,
  Icon,
  Input,
  Modal,
  Picker,
  PickerColumnItem,
  PickerValue,
  Toast,
} from "@ant-design/react-native";
import { router } from "expo-router";
import { useAllTopics } from "@/hooks/useAllTopics";

export default function UploadDocumentScreen() {
  const [form] = Form.useForm();
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );
  const queryClient = useQueryClient();
  const { data: topics } = useAllTopics();
  const [isViewModal, setIsViewModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<PickerValue[]>([]);

  const { mutate: uploadDocumentMutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => uploadDocument(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      Toast.success("Upload successfully");
      setIsViewModal(false);
      form.resetFields();
      setFile(null);
      router.replace("/(home)/document");
    },
    onError: () => {
      Toast.fail("Upload failed");
    },
  });

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.error("Lỗi khi chọn file:", error);
    }
  };

  const onSubmitForm = (values: DocumentDTO) => {
    if (!file) {
      Toast.fail("Vui lòng chọn file PDF");
      return;
    }
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("topicId", selectedTopic[0].toString());
    formData.append("description", values.description);
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: "application/pdf",
    } as any);

    uploadDocumentMutate(formData);
  };
  const handleConfirmModal = () => {
    setIsViewModal(false);
    if (!file) {
      Toast.fail("Field PDF file is required !");
    } else {
      form.submit();
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upload Your Document</Text>
      <Form
        style={styles.formContainer}
        form={form}
        onFinish={onSubmitForm}
        layout="vertical"
      >
        <Form.Item
          style={styles.formItem}
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input style={styles.input} placeholder="Nhập tiêu đề" />
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
        <Form.Item style={styles.formItem} name="description" label="Mô tả">
          <Input style={styles.input} placeholder="Nhập mô tả" multiline />
        </Form.Item>
        {file && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Icon name="file-pdf" size={60} color="red" />
            <View>
              <Text style={{ fontSize: 20 }}>File: {file.name}</Text>
              <Text style={{ fontSize: 20 }}>
                Size: {file.size?.toLocaleString()} bytes
              </Text>
            </View>
          </View>
        )}
        <Button
          style={[styles.btn, { backgroundColor: "#ac1ca2" }]}
          onPress={pickPDF}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            Choose file PDF
          </Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => setIsViewModal(true)}
          loading={isPending}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
            Upload
          </Text>
        </Button>
      </Form>
      <Modal
        visible={isViewModal}
        transparent
        title="Upload"
        footer={[
          { text: "Cancel", onPress: () => setIsViewModal(false) },
          { text: "Confirm", onPress: () => handleConfirmModal() },
        ]}
      >
        <Text style={{ textAlign: "center", marginTop: 5 }}>
          Are you sure to upload this document ?
        </Text>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignContent: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  formItem: {
    minHeight: 110,
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
  btn: {
    width: "95%",
    marginBottom: 10,
    marginHorizontal: "auto",
  },
});
