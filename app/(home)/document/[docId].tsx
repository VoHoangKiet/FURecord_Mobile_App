import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Rating } from "react-native-ratings";
import { useDocumentById } from "@/hooks/useAllDocuments";
import { getReviewCounts } from "@/utils/getReviewCounts";
import { useAllInfoUser } from "@/hooks/useAllInfoUser";
import Pdf from "react-native-pdf";
import { Icon } from "@ant-design/react-native";

export default function DocumentDetail() {
  const params = useLocalSearchParams<{ docId: string }>();
  const { data: document } = useDocumentById(Number.parseInt(params.docId));
  const { data: users } = useAllInfoUser();

  if (!document) {
    return (
      <View style={styles.container}>
        <Text>Waiting...</Text>
      </View>
    );
  }

  const reviewCounts = getReviewCounts(document);
  const totalRating = reviewCounts.helpful + reviewCounts.unhelpful;
  const pointRating = totalRating
    ? (reviewCounts.helpful * 5) / totalRating
    : 0;
  const author =
    users?.find((user) => user.id === Number(document.userId))?.fullName ||
    "Author";

  return (
    document && (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{document.title}</Text>
        <Text style={styles.description}>
          Description: {document.description}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.pointRating}>{totalRating}</Text>
          <Rating
            readonly
            startingValue={pointRating}
            imageSize={15}
            style={{ width: 70, marginTop: 2 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTiny}>Created by </Text>
          <Link
            href={{
              pathname: "/(home)/profile/[id]",
              params: { id: document.userId },
            }}
          >
            <Text style={styles.expertLink}>{author}</Text>
          </Link>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Does this helpful ?</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#67d075" }]}>
            <Icon name="like" color="green" />
            <Text style={styles.buttonText}>{reviewCounts.helpful}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "lightyellow" }]}>
            <Icon name="dislike" color="yellow" />
            <Text style={styles.buttonText}>{reviewCounts.unhelpful}</Text>
          </TouchableOpacity>
        </View>
        {document.fileUrl ? (
          <Pdf
            trustAllCerts={false}
            source={{ uri: document.fileUrl, cache: true }}
            style={styles.pdf}
            onLoadComplete={(numberOfPages: number) =>
              console.log(`PDF loaded with ${numberOfPages} pages`)
            }
            onError={(error: any) => console.log(error)}
          />
        ) : (
          <Text style={styles.errorText}>No PDF available</Text>
        )}
      </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingTop: 10
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
  },
  pointRating: {
    alignItems: "center",
    fontWeight: "bold",
  },
  textTiny: {
    alignItems: "center",
  },
  expertLink: {
    fontWeight: "600",
    color: "#9d0891",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
});
