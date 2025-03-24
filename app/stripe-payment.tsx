import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { WebView } from "react-native-webview";

const StripePaymentScreen = () => {
  const params = useLocalSearchParams<{ stripeUrl: string }>();
  const router = useRouter();

  const handleNavigationStateChange = (event: any) => {
    if (event.url.includes("payment/result?state=success")) {
      router.push({
        pathname: "/payment-result",
        params: { status: "success" },
      });
    } else if (event.url.includes("payment/result")) {
      router.push({
        pathname: "/payment-result",
        params: { status: "failed" },
      });
    }
  };

  return (
    <WebView
      source={{ uri: params.stripeUrl }}
      onNavigationStateChange={handleNavigationStateChange}
      style={{ flex: 1 }}
    />
  );
};

export default StripePaymentScreen;
