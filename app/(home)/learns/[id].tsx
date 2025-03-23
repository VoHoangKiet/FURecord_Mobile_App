import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { VideoPlayer } from "@/components/common";
import { Rating } from "react-native-ratings";
import { Button, Icon } from "@ant-design/react-native";
import { useCourseById } from "@/hooks/useAllCourses";
import { useEffect, useState } from "react";
import { User } from "@/apis/auth.api";
import { useAllInfoUser } from "@/hooks/useAllInfoUser";
import { getTotalRating } from "@/utils/getTotalRating";
import moment from "moment";

export default function CourseDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const { data: course } = useCourseById(Number(params.id));
  const { data: users } = useAllInfoUser();
  const [userExpert, setUserExpert] = useState<User>();
  const [visibleVideo, setVisibleVideo] = useState<string>("");
  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Waiting...</Text>
      </View>
    );
  }
  useEffect(() => {
    if (users) {
      const expert = users.find((user) => user.id === Number(course.expertId));
      setUserExpert(expert);
    }
  }, [users, course]);

  return (
    <ScrollView style={styles.container}>
      <VideoPlayer videoUrl={course.lessons[0].videoUrl} />
      <Text style={styles.title}>{course.name}</Text>
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
      <Text style={styles.money}>$ {course.price.toFixed(2)}</Text>
      <View style={styles.listBtn}>
        <Button style={styles.btnBuy}>
          <Text style={styles.textbtnBuy}>Buy now</Text>
        </Button>
        <Button>
          <Text style={styles.textbtnAddToCart}>Add to cart</Text>
        </Button>
      </View>
      <Text style={[styles.title, { paddingVertical: 10 }]}>
        Course Curriculum
      </Text>
      {course.lessons.map((lesson) => (
        <View style={styles.item} key={lesson.id}>
          <Text style={styles.itemText}>{lesson.name}</Text>
          {lesson.videoUrl && (
            <TouchableOpacity
              onPress={() => setVisibleVideo(lesson.id.toString())}
            >
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
}

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
  modalContent: {
  },
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
