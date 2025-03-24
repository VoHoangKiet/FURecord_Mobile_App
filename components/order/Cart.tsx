import { useStore } from "@/modules/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { Text, TouchableOpacity, View } from "react-native";

const CartComponent = observer(() => {
  const router = useRouter();
  const { cartStore } = useStore();
  const navigateCart = () => {
    router.navigate("/order");
  };
  return (
    <TouchableOpacity
      onPress={navigateCart}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Ionicons
        name="cart-outline"
        size={24}
        color="black"
        style={{ marginRight: 15 }}
      />
      {cartStore.cart.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: -5,
            right: 2,
            backgroundColor: "red",
            borderRadius: 10,
            width: 15,
            height: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>
            {cartStore.cart.length}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

export default CartComponent;
