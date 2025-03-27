import { Thumbnail } from "@/components/common";
import { useAllCoursesBought } from "@/hooks/useAllCoursesBought";
import { WingBlank } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function PurchaseScreen() {
  const router = useRouter();
  const { data: courses } = useAllCoursesBought();
  const handleNavigate = (courseId: number) => {
    router.push({ pathname: "/(home)/learns/bought/[boughtId]", params: { boughtId: courseId } });
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
            <Thumbnail course={course} isBought/>
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
