import { User } from "@/apis/auth.api";
import { Course } from "@/apis/courses.api";
import { useAllInfoUser } from "@/hooks/useAllInfoUser";
import { useStore } from "@/modules/store";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardItemProps = {
  course: Course;
  onConfirm: () => void;
};
export const CardItem: React.FC<CardItemProps> = ({ course, onConfirm }) => {
  const { data: users } = useAllInfoUser();
  const [userExpert, setUserExpert] = useState<User>();
  const { cartStore } = useStore();
  useEffect(() => {
    if (users) {
      const expert = users.find((user) => user.id === Number(course.expertId));
      setUserExpert(expert);
    }
  }, [users, course]);
  const handleRemoveCourse = () => {
    cartStore.removeFromCart(course.id);
  };
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{
            uri: course.bannerUrl,
          }}
          resizeMode="cover"
          style={styles.thumbnail}
        />
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={styles.title} numberOfLines={3}>
              {course.name}
            </Text>
            <View>
              <View>
                <Text style={{ fontSize: 12 }}>
                  {userExpert ? userExpert.fullName : "Expert"}
                </Text>
              </View>
              <View>
                <Text style={styles.money}>$ {course.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity>
          <Text style={styles.btnAction}>Save for later</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemoveCourse}>
          <Text style={styles.btnAction}>Delete</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onConfirm} style={styles.btnBuy}>
        <Text style={styles.btnBuyText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
  content: {
    height: "100%",
  },
  textContent: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignSelf: "center",
  },
  money: {
    fontWeight: "bold",
    fontSize: 18,
  },
  btnAction: {
    color: "#a42fbe",
    fontWeight: "bold",
  },
  btnBuy: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnBuyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
