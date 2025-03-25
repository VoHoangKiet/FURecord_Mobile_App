import { CardComponent } from "@/components/document/Card";
import { useAllDocuments } from "@/hooks/useAllDocuments";
import { getReviewCounts } from "@/utils/getReviewCounts";
import { Icon, SearchBar } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function DocumentScreen() {
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

  const handleNavigateDocument = (documentId: number) => {
    router.push({
      pathname: "/(home)/document/[docId]",
      params: { docId: documentId },
    });
  };

  const handleNavigateUploadDocument = () => {
    router.push("/(home)/document/upload-doc");
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <View style={{ flex: 1 }}>
          <SearchBar
            value={searchQuery}
            placeholder="Search document..."
            onChange={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={handleNavigateUploadDocument}>
          <Icon
            name="upload"
            size={32}
            color="black"
            style={{ marginRight: 7 }}
          />
        </TouchableOpacity>
      </View>
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
            onPress={() => handleNavigateDocument(doc.id)}
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
