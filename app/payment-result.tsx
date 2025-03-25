import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from '@expo/vector-icons/Ionicons';

const StripePaymentResultScreen = () => {
  const params = useLocalSearchParams<{ status: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {params.status === "success" ? (
          <View>
            <Octicons style={{marginHorizontal: 'auto'}} name="check-circle-fill" size={70} color="#12e019" />
            <Text style={styles.title}>Payment Successful</Text>
          </View>
        ) : (
          <View>
          <Ionicons style={{marginHorizontal: 'auto'}} name="close-circle-sharp" size={70} color="red" />
            <Text style={styles.title}>Payment Failed</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {params.status === "success" ? (
          <Button color="#12b517" title="Back to home page" onPress={() => router.navigate("/(home)")} />
        ) : (
          <Button color="red" title="Try again" onPress={() => router.navigate("/order")} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 40,
  },
});

export default StripePaymentResultScreen;
