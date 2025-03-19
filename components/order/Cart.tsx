import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"

const CartComponent = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(1); 
    const navigateCart = () => {
        router.navigate('/order')
    }
    return (
        <TouchableOpacity onPress={navigateCart} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="cart-outline" size={24} color="black" style={{ marginRight: 15 }} />
      {cartCount > 0 && (
        <View style={{ 
            position: 'absolute', 
            top: -5, 
            right: 2, 
            backgroundColor: 'red', 
            borderRadius: 10, 
            width: 15,
            height: 15,
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
          <Text style={{ color: 'white', fontSize: 12 }}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
    )
}

export default CartComponent;