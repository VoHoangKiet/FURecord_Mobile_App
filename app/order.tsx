import { Empty } from "@/components/common";
import { Button } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function OrderScreen() {
  const router = useRouter();
  const order = [];
  return (
    <ScrollView style={styles.container}>
      {order.length > 0 ? (
        <Text>Order items will be displayed here</Text>
      ) : (
        <Empty viewStyle={{marginVertical: 300}} title="Add course" content="Your cart is empty" />
      )}
      <View style={styles.footer}>
        <Button
          style={styles.btnCheckout}
          onPress={() => router.navigate("/(home)/learn")}
        >
          <Text style={styles.btnCheckoutText}>Proceed to Checkout</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 16,
  },
  courseCard: {
    marginBottom: 16,
  },
  courseImage: {
    width: "100%",
    height: 200,
  },
  btnCheckout: {
    backgroundColor: "#a714dd",
    width: 380,
  },
  btnCheckoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    top: 740,
    left: 0,
    borderTopColor: "#e7e7e7",
    alignItems: "center",
  },
});
