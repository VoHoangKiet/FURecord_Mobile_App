import { Banner } from "@/components/common";
import { CardComponent } from "@/components/document/Card";
import { useAuth } from "@/context/AuthContext";
import { useAllCourses } from "@/hooks/useAllCourses";
import { useAllDocuments } from "@/hooks/useAllDocuments";
import { useAllTopics } from "@/hooks/useAllTopics";
import {
  getCoursesByTitle,
  getRandomTitle,
} from "@/utils/getRandomTitleCourse";
import { getReviewCounts } from "@/utils/getReviewCounts";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

type TitleType = {
  id: number;
  name: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: documents } = useAllDocuments();
  const { data: topics } = useAllTopics();
  const { data: courses } = useAllCourses();
  const [titles, setTitles] = useState<TitleType[]>([]);

  const handleNavigateDocument = (documentId: number) => {
    router.push({
      pathname: "/(home)/document/[docId]",
      params: { docId: documentId },
    });
  };

  const handleNavigateCourse = (courseId: number) => {
    router.push({ pathname: "/(home)/learns/[id]", params: { id: courseId } });
  };

  useEffect(() => {
    if (topics) {
      const updatedTitles = topics.map((topic) => ({
        id: topic.id,
        name: getRandomTitle(topic),
      }));
      setTitles(updatedTitles);
    }
  }, [topics]);

  if (!courses || !documents || !topics) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

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
        {titles.map((title) => {
          const topic = topics.find((t) => t.id === title.id);
          if (!topic) return null;
          const coursesForTopic = getCoursesByTitle(courses, topic, title.name);

          if (coursesForTopic.length === 0) return null;

          return (
            <View key={title.id}>
              <Text style={styles.title}>{title.name}</Text>
              <ScrollView horizontal>
                {coursesForTopic.map((course) => (
                  <TouchableOpacity
                    key={course.id}
                    onPress={() => handleNavigateCourse(course.id)}
                  >
                    <Banner course={course} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
        })}
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
