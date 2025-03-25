import { CardComponent } from "@/components/document/Card";
import { useAllDocuments } from "@/hooks/useAllDocuments";
import { getReviewCounts } from "@/utils/getReviewCounts";
import { SearchBar } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

export default function FlashCardScreen() {
  const router = useRouter();
  const { data: documents } = useAllDocuments();
  const [searchQuery, setSearchQuery] = useState("");
  if (!documents) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }
  const filteredDocuments = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (documentId: number) => {
    router.push({
      pathname: "/(home)/document/[docId]",
      params: { docId: documentId },
    });
  };
  return (
    <ScrollView style={styles.container}>
      <SearchBar
        value={searchQuery}
        placeholder="Search document..."
        onChange={setSearchQuery}
      />
      <ScrollView>
        {filteredDocuments?.map((doc, index) => (
          <CardComponent
            key={index}
            id={doc.id}
            title={doc.title}
            author={doc.description}
            state={doc.state}
            likes={getReviewCounts(doc).helpful}
            dislikes={getReviewCounts(doc).unhelpful}
            onPress={() => handleNavigate(doc.id)}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#fff",
  },
});
