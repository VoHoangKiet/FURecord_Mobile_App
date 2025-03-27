import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { VideoPlayer } from "@/components/common";
import { Rating } from "react-native-ratings";
import { Button, Icon, Toast } from "@ant-design/react-native";
import { useEffect, useState } from "react";
import { User } from "@/apis/auth.api";
import { useAllInfoUser } from "@/hooks/useAllInfoUser";
import { getTotalRating } from "@/utils/getTotalRating";
import moment from "moment";
import { useAllTopics } from "@/hooks/useAllTopics";
import { useCourseBoughtById } from "@/hooks/useAllCoursesBought";
import Ionicons from '@expo/vector-icons/Ionicons';

const CourseBoughtDetail = () => {
  const params = useLocalSearchParams<{ boughtId: string }>();
  const { data: course } = useCourseBoughtById(Number(params.boughtId));
  const { data: users } = useAllInfoUser();
  const { data: topics } = useAllTopics();
  const [userExpert, setUserExpert] = useState<User>();
  const [visibleVideo, setVisibleVideo] = useState<string>("");
  
  if (!course) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  useEffect(() => {
    if (users) {
      const expert = users.find((user) => user.id === Number(course.expertId));
      setUserExpert(expert);
    }
    return () => {
      setVisibleVideo("");
    };
  }, [users, course]);

  return (
    <ScrollView style={styles.container}>
      <Ionicons name="arrow-back-outline" size={35} color="black" onPress={() => router.back()}/>
      <VideoPlayer videoUrl={!visibleVideo ? course.lessons[0].videoUrl : ""} />
      <Text style={styles.title}>{course.name}</Text>
      {topics?.map((topic) => {
        if (topic.id.toString() === course.topicId) {
          return (
            <Text
              key={topic.id}
              style={[styles.textTiny, { fontSize: 20, fontWeight: "bold" }]}
            >
              Topic: {topic.name}
            </Text>
          );
        }
        return null;
      })}
      <Text style={styles.description}>{course.description}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={styles.pointRating}>
          {getTotalRating(course.reviews).toFixed(1)}
        </Text>
        <Rating
          readonly
          startingValue={getTotalRating(course.reviews)}
          imageSize={15}
          style={{ width: 70, marginTop: 2 }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={styles.textTiny}>
          ( {course.reviews.length} rankings )
        </Text>
        <Text style={styles.textTiny}>{course.orders.length} students</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textTiny}>Created by </Text>
        <Link
          href={{
            pathname: "/(home)/profile/[id]",
            params: { id: course.expertId },
          }}
        >
          <Text style={styles.expertLink}>
            {userExpert ? userExpert.fullName : "Expert"}
          </Text>
        </Link>
      </View>

      <Text style={styles.dateText}>
        Created At: {moment(course.createdAt).format("MMM DD, YYYY")}
      </Text>
      <Text style={styles.dateText}>
        Updated At: {moment(course.updatedAt).format("MMM DD, YYYY")}
      </Text>
      <Text style={[styles.title, { paddingVertical: 10 }]}>
        Course Curriculum
      </Text>
      {course.lessons.map((lesson) => (
        <View style={styles.item} key={lesson.id}>
          <Text style={styles.itemText}>{lesson.name}</Text>
          {lesson.videoUrl && (
            <TouchableOpacity onPress={() => setVisibleVideo(lesson.videoUrl)}>
              <Icon name="play-circle" size={22} color="#95118e" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <Modal visible={!!visibleVideo} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {visibleVideo && <VideoPlayer videoUrl={visibleVideo} />}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisibleVideo("")}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CourseBoughtDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
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
  money: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  listBtn: {
    paddingVertical: 5,
    gap: 10,
  },
  btnBuy: {
    backgroundColor: "#9d0891",
  },
  textbtnBuy: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  textbtnAddToCart: {
    color: "black",
    fontWeight: "600",
    fontSize: 20,
  },
  dateText: {
    fontSize: 12,
    color: "gray",
  },
  item: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemText: {
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {},
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#95118e",
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
