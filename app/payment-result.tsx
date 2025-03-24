import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const StripePaymentResultScreen = () => {
  const params = useLocalSearchParams<{ status: string }>();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {params.status === "success" ? (
        <View>
          <Text>Thanh toán thành công!</Text>
          <Button
            title="Quay lại trang chính"
            onPress={() => router.navigate("/(home)")}
          />
        </View>
      ) : (
        <View>
          <Text>Thanh toán thất bại!</Text>
          <Button title="Thử lại" onPress={() => router.navigate("/order")} />
        </View>
      )}
    </View>
  );
};

export default StripePaymentResultScreen;
