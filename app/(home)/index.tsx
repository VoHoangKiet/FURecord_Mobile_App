import { CardComponent } from "@/components/document/Card";
import { useAuth } from "@/context/AuthContext";
import { useAllDocuments } from "@/hooks/useAllDocuments";
import { getReviewCounts } from "@/utils/getReviewCounts";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: documents } = useAllDocuments();

  const handleNavigateDocument = (documentId: number) => {
    router.push({
      pathname: "/(home)/document/[docId]",
      params: { docId: documentId },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello ! {user?.fullName}</Text>
        <Text>What you want to learn today ?</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Documents</Text>
        <ScrollView horizontal>
          {documents?.map((doc, index) => (
            <CardComponent
              id={doc.id}
              key={index}
              title={doc.title}
              author={doc.description}
              state={doc.state}
              likes={getReviewCounts(doc).helpful}
              dislikes={getReviewCounts(doc).unhelpful}
              onPress={() => handleNavigateDocument(doc.id)}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 10,
  },
  content: {
    paddingVertical: 10,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
