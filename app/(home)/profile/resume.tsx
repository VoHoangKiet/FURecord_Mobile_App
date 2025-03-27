import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import Pdf from "react-native-pdf";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { Button, Toast } from "@ant-design/react-native";
import { useMutation } from "@tanstack/react-query";
import { requestExpert } from "@/apis/expert.api";
import { router } from "expo-router";
import { useMyExpertRequest } from "@/hooks/useMyExpertRequest";

const ResumeScreen = () => {
  const [pdfUri, setPdfUri] = useState("");
  const { data: myRequest, isLoading: loadingRequest } = useMyExpertRequest();

  const { mutate: requestExpertMutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => requestExpert(formData),
    onSuccess: () => {
      Toast.success("Request send to admin !");
      router.replace("/profile");
    },
    onError: (error) => {
      console.log(error);
      Toast.fail("Request failed");
    },
  });

  const loadPdf = async () => {
    const storedUri = await AsyncStorage.getItem("resumeUri");
    if (storedUri) {
      setPdfUri(storedUri);
    }
  };

  useEffect(() => {
    if (!pdfUri) {
      loadPdf();
    }
  }, []);

  const confirmUpload = async (tempPdfUri: string) => {
    if (tempPdfUri) {
      await AsyncStorage.setItem("resumeUri", tempPdfUri);
      setPdfUri(tempPdfUri);
    }
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.canceled || !result.assets || result.assets.length === 0)
        return;
      Alert.alert("Confirm Upload", "Do you want to set this as your resume?", [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => confirmUpload(result.assets[0].uri) },
      ]);
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  const handleRequestToExpert = () => {
    if (!pdfUri) {
      alert("You must provide CV to be an expert !");
    } else {
      const formData = new FormData();
      formData.append("cv", {
        uri: pdfUri,
        name: "cv",
        type: "application/pdf",
      } as any);
      requestExpertMutate(formData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Resume</Text>
      {pdfUri ? (
        <Fragment>
          <Pdf source={{ uri: pdfUri }} style={styles.pdf} />
          <Button onPress={handleUpload}>Change Resume</Button>
        </Fragment>
      ) : (
        <Button onPress={handleUpload}>Upload Resume</Button>
      )}
      {loadingRequest ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : !myRequest ? (
        <Button onPress={handleRequestToExpert} loading={isPending}>
          Request to Expert
        </Button>
      ) : myRequest.state === "PENDING" ? (
        <Button disabled loading>
          Pending to request expert
        </Button>) : (
        <Button>
          You already an expert !
        </Button>) }
    </View>
  );
};

export default ResumeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: 500,
  },
});
