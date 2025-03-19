import { Thumbnail } from "@/components/common";
import { WingBlank } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const courses = [
  { id: "1", title: "Khóa học lập trình React" },
  { id: "2", title: "Khóa học lập trình Node.js" },
  { id: "3", title: "Khóa học thiết kế web" },
];

export default function LearningScreen() {
  const router = useRouter();

  const handleNavigate = (courseId: string) => {
    router.push({ pathname: "/(home)/learns/[id]", params: { id: courseId } });
  };
  return (
    <ScrollView style={styles.container}>
      <WingBlank size="sm">
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            onPress={() => handleNavigate(course.id)}
          >
            <Thumbnail />
          </TouchableOpacity>
        ))}
      </WingBlank>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});
