import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "@ant-design/react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAllInfoUser } from "@/hooks/useAllInfoUser";
import { useAllDocuments } from "@/hooks/useAllDocuments";
import { CardComponent } from "@/components/document/Card";
import { getReviewCounts } from "@/utils/getReviewCounts";
import { useAllCourses } from "@/hooks/useAllCourses";
import { Banner, Empty } from "@/components/common";

export default function UserDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const { data: users } = useAllInfoUser();
  const { data: documents } = useAllDocuments();
  const { data: courses } = useAllCourses();
  const user = users?.find((user) => user.id === Number.parseInt(params.id));

  if (!user || !documents || !courses) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }
  const ownerDocuments = documents?.filter((doc) => doc.userId === params.id);
  const ownerCourses = courses.filter(
    (course) => course.expertId === params.id
  );
  const handleNavigateDocument = (documentId: number) => {
    router.push({
      pathname: "/(home)/document/[docId]",
      params: { docId: documentId },
    });
  };

  const handleNavigateCourse = (courseId: number) => {
    router.push({ pathname: "/(home)/learns/[id]", params: { id: courseId } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{
            uri:
              user.avatarUrl ||
              "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>INFO OWNER</Text>
        <Text style={styles.infoText}>Full Name: {user.fullName}</Text>
        <Text style={styles.infoText}>Role: {user.role}</Text>
        {user.gender && (
          <Text style={styles.infoText}>Gender: {user.gender}</Text>
        )}
        {ownerDocuments.length > 0 ? (
          <View style={styles.content}>
            <Text style={styles.title}>Documents</Text>
            <ScrollView horizontal>
              {ownerDocuments?.map((doc, index) => (
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
        ) : (
          <Empty
            title="Empty Document"
            content="Owner doesn't push any documents"
          />
        )}
        <View>
          {ownerCourses.length > 0 ? (
            <Fragment>
              <Text style={styles.title}>Courses</Text>
              <ScrollView horizontal>
                {ownerCourses.map((course) => (
                  <TouchableOpacity
                    key={course.id}
                    onPress={() => handleNavigateCourse(course.id)}
                  >
                    <Banner course={course} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Fragment>
          ) : (
            <Empty
              title="Empty Course"
              content="Owner doesn't push any courses"
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  profileImage: {
    marginTop: 10,
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
  userInfoContainer: {
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#333",
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  button: {
    width: "45%",
    margin: 5,
  },
  content: {
    paddingVertical: 10,
    gap: 10,
    height: 185,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
