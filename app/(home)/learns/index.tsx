import { Thumbnail } from "@/components/common";
import { useAllCourses } from "@/hooks/useAllCourses";
import { View, WingBlank } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LearningScreen() {
  const router = useRouter();
  const { data: courses } = useAllCourses();
  const handleNavigate = (courseId: number) => {
    router.push({ pathname: "/(home)/learns/[id]", params: { id: courseId } });
  };
  if(!courses) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  return (
    <ScrollView style={styles.container}>
      <WingBlank size="sm">
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            onPress={() => handleNavigate(course.id)}
          >
            <Thumbnail course={course}/>
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
