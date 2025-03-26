import { Empty } from "@/components/common";
import { Button, Modal, Toast } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/modules/store";
import { CardItem } from "@/components/order/CardItem";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { paymentCourse } from "@/apis/payment.api";

const OrderScreen = observer(() => {
  const router = useRouter();
  const { cartStore } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const buyMutation = useMutation({
    mutationFn: (body: FormData) => {
      return paymentCourse(body);
    },
  });

  if (!cartStore.cart.length) {
    return (
      <View>
        <Empty
          viewStyle={{ marginVertical: 300 }}
          title="Add course"
          content="Your cart is empty"
        />
        <View style={styles.footer}>
          <Button
            style={styles.btnCheckout}
            onPress={() => router.navigate("/(home)/learns")}
          >
            <Text style={styles.btnCheckoutText}>Browser Courses</Text>
          </Button>
        </View>
      </View>
    );
  }

  const onConfirmBuyCourse = (id: string) => {
    setSelectedCourseId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("Course confirmed with ID:", selectedCourseId);
    let formData = new FormData();
    formData.append("courseId", selectedCourseId);
    setIsModalVisible(false);
    buyMutation.mutate(formData, {
      onSuccess(data) {
        console.log(data);
        router.navigate({
          pathname: "/stripe-payment",
          params: { stripeUrl: data },
        });
      },
      onError(data: any) {
        Toast.fail(data.response.data.message);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemTotal}>{cartStore.cart.length} item</Text>
      <FlatList
        data={cartStore.cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <CardItem
              course={item}
              onConfirm={() => onConfirmBuyCourse(item.id.toString())}
            />
          );
        }}
      />
      <Modal
        visible={isModalVisible}
        transparent
        title="Confirm Purchase"
        footer={[
          { text: "Cancel", onPress: handleCancel },
          { text: "Confirm", onPress: handleOk },
        ]}
      >
        <Text style={{ textAlign: "center" }}>
          Are you sure to buy this course?
        </Text>
      </Modal>
    </View>
  );
});

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
    top: 750,
    left: 15,
    borderTopColor: "#e7e7e7",
    alignItems: "center",
  },
  itemTotal: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 10,
  },
});
