import { User } from "@/apis/auth.api";
import { Course } from "@/apis/courses.api";
import { useAllInfoUser } from "@/hooks/useAllInfoUser";
import { getTotalRating } from "@/utils/getTotalRating";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Rating } from "react-native-ratings";

type BannerProps = {
  course: Course;
  viewStyle?: ViewStyle;
};
export const Banner: React.FC<BannerProps> = ({ course, viewStyle }) => {
  const { data: users } = useAllInfoUser();
  const [userExpert, setUserExpert] = useState<User>();
  useEffect(() => {
    if (users) {
      const expert = users.find((user) => user.id === Number(course.expertId));
      setUserExpert(expert);
    }
  }, [users, course]);

  return (
    <View style={[styles.container, { ...viewStyle }]}>
      <Image
        source={{
          uri: course.bannerUrl,
        }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Image
          source={{ uri: userExpert?.avatarUrl }}
          style={styles.profileImage}
        />
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={1}>
            {course.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.expertInfo}>
              <Text style={{ fontSize: 12 }}>
                {userExpert ? userExpert.fullName : "Expert"}
              </Text>
              {course.reviews.length > 0 && (
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Rating
                    style={{ width: 70 }}
                    startingValue={getTotalRating(course.reviews)}
                    imageSize={15}
                    readonly
                  />
                  <Text style={{ marginTop: -1.8 }}>
                    ({getTotalRating(course.reviews)})
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text style={styles.money}>$ {course.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 300,
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
  },
  textContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignSelf: "center",
  },
  money: {
    fontWeight: "bold",
    fontSize: 17,
  },
  expertInfo: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
