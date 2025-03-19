import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { VideoPlayer } from "@/components/common";
import { Rating } from "react-native-ratings";
import { Button } from "@ant-design/react-native";

export default function CourseDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const courses = [
    {
      id: "1",
      title: "Khóa học lập trình React",
      description: "Học cách xây dựng ứng dụng web với React.",
    },
    {
      id: "2",
      title: "Vỡ lòng về Python - từ cơ bản đến xử lý ảnh, xử lý dữ liệu",
      description:
        "Khóa học giúp bạn nắm vững Python từ cơ bản đến nâng cao, ứng dụng trong xử lý ảnh và phân tích dữ liệu.",
    },
    {
      id: "3",
      title: "Khóa học thiết kế web",
      description: "Học cách thiết kế giao diện web đẹp và dễ sử dụng.",
    },
  ];

  const course = courses.find((course) => course.id === params.id);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Khóa học không tồn tại</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <VideoPlayer
        videoUrl={
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      />
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={styles.pointRating}>4.5</Text>
        <Rating
          readonly
          startingValue={4.5}
          imageSize={15}
          style={{ width: 70, marginTop: 2 }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={styles.textTiny}>( 68 rankings )</Text>
        <Text style={styles.textTiny}>3.301 students</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textTiny}>Created by </Text>
        <Link href={"/+not-found"}>
          <Text style={styles.expertLink}>Vo Hoang Kiet</Text>
        </Link>
      </View>
      <Text style={styles.money}>$ 259.00</Text>
      <View style={styles.listBtn}>
        <Button style={styles.btnBuy}>
          <Text style={styles.textbtnBuy}>Buy now</Text>
        </Button>
        <Button>
          <Text style={styles.textbtnAddToCart}>Add to cart</Text>
        </Button>
      </View>
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
    gap: 10
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
});
