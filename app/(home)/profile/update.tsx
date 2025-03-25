import { UpdateProfileDTO, updateUserProfile } from "@/apis/auth.api";
import { useAuth } from "@/context/AuthContext";
import {
  DatePicker,
  Form,
  Input,
  List,
  Picker,
  Toast,
} from "@ant-design/react-native";
import { useForm } from "@ant-design/react-native/lib/form/Form";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import moment from "moment";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

type DataGender = {
  label: string;
  value: string;
};

const dataGender: DataGender[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const UpdateProfileScreen = () => {
  const [form] = useForm();
  const { user, loading, invalidateProfile } = useAuth();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (body: UpdateProfileDTO) => {
      return updateUserProfile(body);
    },
  });

  const onSubmit = (values: UpdateProfileDTO) => {
    console.log(values);
    updateProfile(values, {
      onSuccess() {
        Toast.success("Update successfully");
        invalidateProfile();
        router.replace("/(home)");
      },
      onError() {
        Toast.fail("Update failed, try again");
      },
    });
  };

  if (!user || loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        form={form}
        style={styles.formContainer}
        initialValues={{
          fullName: user.fullName,
          email: user.email,
          gender: user.gender,
          about: user.about,
          dob: moment(user.dob).toDate(),
        }}
      >
        <Text style={styles.title}>Public Profile</Text>
        <Text style={styles.subtitle}>Add information about yourself</Text>

        <Form.Item
          style={styles.formItem}
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Full Name is required" }]}
        >
          <Input style={styles.input} />
        </Form.Item>

        <Form.Item
          style={styles.formItem}
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input style={styles.input} keyboardType="email-address" />
        </Form.Item>

        <Form.Item
          style={styles.formItem}
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Picker data={dataGender} cols={1}>
            <TouchableOpacity style={[styles.input, { padding: 10 }]}>
              <Text style={{ fontSize: 16 }}>
                {user.gender || "Select Gender"}
              </Text>
            </TouchableOpacity>
          </Picker>
        </Form.Item>

        <Form.Item
          style={styles.formItem}
          label="Birthday"
          name="dob"
          rules={[{ required: true, message: "Select your date of birth" }]}
        >
          <DatePicker precision="day" format="YYYY-MM-DD">
            <List.Item arrow="horizontal">Select Date</List.Item>
          </DatePicker>
        </Form.Item>

        <Form.Item style={styles.formItem} label="About you" name="about">
          <Input
            style={[styles.input, { minHeight: 50 }]}
            multiline
            maxLength={100}
          />
        </Form.Item>
        <TouchableOpacity
          style={styles.button}
          onPress={() => form.submit()}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </Form>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 1200,
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  formItem: {
    height: 110,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default UpdateProfileScreen;
