import { CourseExpert } from "@/apis/courses.api";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type BannerExpertProps = {
  course: CourseExpert;
  viewStyle?: ViewStyle;
};
export const BannerExpert: React.FC<BannerExpertProps> = ({
  course,
  viewStyle,
}) => {
  return (
    <View style={[styles.container, { ...viewStyle }]}>
      <Image
        source={{
          uri: course.bannerUrl,
        }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        {course.state === "pending" ? (
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Text style={[styles.state, { color: "#a6c305" }]}>
              {course.state}
            </Text>
          </View>
        ) : (
          <Text style={[styles.state, { color: "#08d750" }]}>
            {course.state}
          </Text>
        )}

        <Text style={[styles.totalStudent]}>
          Total Students: {course.totalUserBuy}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width - 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginRight: 10,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
    height: 210,
  },
  thumbnail: {
    width: "100%",
    height: 140,
    alignSelf: "center",
  },
  content: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  state: {
    marginVertical: 10,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "lightyellow",
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
  },
  totalStudent: {
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 'auto'
  },
});
