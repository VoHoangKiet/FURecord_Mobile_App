import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";

export const Thumbnail = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://edwize.org/wp-content/uploads/Coursera-vs-Udemy-Featured.jpg",
        }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/10.jpg" }}
          style={styles.profileImage}
        />
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={2}>
            Introduction to Git for Gitlab projects
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}
          >
            <View>
              <Text>Vo Hoang Kiet</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Rating
                  style={{ width: 70 }}
                  ratingCount={5}
                  imageSize={15}
                  readonly
                />
                <Text style={{ marginTop: -1.8 }}>(130.015)</Text>
              </View>
            </View>
            <View>
              <Text style={styles.money}>$ 199.000</Text>
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
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
    fontSize: 18,
  },
});
