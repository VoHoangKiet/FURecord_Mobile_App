import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native"

const CartComponent = () => {
  const router = useRouter();
    const navigateCart = () => {
        router.navigate('/order')
    }
    return (
        <TouchableOpacity onPress={navigateCart}>
            <Ionicons name="cart-outline" size={24} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
    )
}

export default CartComponent;