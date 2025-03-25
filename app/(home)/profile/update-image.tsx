import { updateImageProfile } from "@/apis/auth.api";
import { useAuth } from "@/context/AuthContext";
import { Form, Toast } from "@ant-design/react-native";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "@ant-design/react-native/lib/form/Form";

const UpdateProfileImageScreen = () => {
  const [form] = useForm();
  const { user, loading, invalidateProfile } = useAuth();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();

  const { mutate: updateProfileImage, isPending } = useMutation({
    mutationFn: (body: FormData) => updateImageProfile(body),
  });

  const onSubmit = async () => {
    if (!image) {
      Toast.fail("Please select a profile image");
      return;
    }
    const formData = new FormData();
    formData.append(
      "image",
      JSON.parse(
        JSON.stringify({
          uri: image.uri,
          type: "image/jpeg",
          name: image.fileName || "profile.jpg",
        })
      )
    );
    updateProfileImage(formData, {
      onSuccess() {
        Toast.success("Profile image updated successfully");
        invalidateProfile();
        router.replace("/(home)");
      },
      onError() {
        Toast.fail("Update failed, try again");
      },
    });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.fail("Permission to access media library is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0]);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.fail("Permission to access camera is required");
      return;
    }
    const photoResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!photoResult.canceled) {
      setImage(photoResult.assets[0]);
    }
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
      >
        <Text style={styles.title}>Update Profile Image</Text>
        <Text style={styles.subtitle}>Choose a new profile image</Text>
        <Image
          source={{ uri: image?.uri || user.avatarUrl }}
          style={styles.profileImage}
        />

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={pickImage} style={styles.input}>
            <Text style={styles.buttonText}>Select from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.input}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>
        {image && (
          <TouchableOpacity
            style={styles.input}
            onPress={onSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </TouchableOpacity>
        )}
      </Form>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  formContainer: {
    marginTop: 150,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#6200ea",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdateProfileImageScreen;
