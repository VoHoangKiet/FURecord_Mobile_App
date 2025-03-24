import { Thumbnail } from "@/components/common";
import { useAllCourses } from "@/hooks/useAllCourses";
import { WingBlank } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function LearningScreen() {
  const router = useRouter();
  const { data: courses } = useAllCourses();
  const handleNavigate = (courseId: number) => {
    router.push({ pathname: "/(home)/learns/[id]", params: { id: courseId } });
  };
  if (!courses) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <WingBlank size="sm">
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            onPress={() => handleNavigate(course.id)}
          >
            <Thumbnail course={course} />
          </TouchableOpacity>
        ))}
      </WingBlank>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
