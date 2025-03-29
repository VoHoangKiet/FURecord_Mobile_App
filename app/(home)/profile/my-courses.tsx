import { BannerExpert, Empty } from "@/components/common";
import { useAllMyExpertCourses } from "@/hooks/useAllMyExpertCourses";
import { Button, WingBlank } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function MyCoursesScreen() {
  const router = useRouter();
  const { data: courses } = useAllMyExpertCourses();
  const handleNavigate = (courseId: number) => {
    router.push({
      pathname: "/(home)/learns/bought/[boughtId]",
      params: { boughtId: courseId },
    });
  };

  const handleNavigateAddCourse = () => {
    router.push({
      pathname: "/(home)/profile/add-course"
    });
  };

  if (!courses) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }
  if (!courses.length) {
    return (
      <View style={styles.container}>
        <WingBlank size="sm">
          <Empty
            viewStyle={{ marginVertical: 300 }}
            title="My course"
            content="My list courses is empty"
          />
          <Button onPress={handleNavigateAddCourse}>Upload Course</Button>
        </WingBlank>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <WingBlank size="sm">
        <Button onPress={handleNavigateAddCourse}>Add Course</Button>
        <ScrollView>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              onPress={() => handleNavigate(course.id)}
            >
              <BannerExpert course={course} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </WingBlank>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: Dimensions.get("screen").height
  },
});
