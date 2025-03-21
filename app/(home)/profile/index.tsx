import { useAuth } from "@/context/AuthContext";
import { Modal } from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ProfileScreen() {
  const { user,logout } = useAuth();
  const router = useRouter();
  const handleUpdateProfile = () => {
    router.navigate("/(home)/profile/update");
  }

  const handleLogout = () => {
    logout();
    router.push('/(auth)');
  }
  const onButtonLogout = () => {
    Modal.alert('Logout', 'Are you sure you want to log out ?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => handleLogout() },
    ])
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/10.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user?.email}</Text>
        <TouchableOpacity>
          <Text style={styles.expert}>Register to become an Expert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleUpdateProfile}>
          <Text style={styles.menuText}>Update Your Profile</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>E-Mail Settings</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Change Available Times</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Criteria</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Resume</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Note For Recruiters</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Stop Service</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onButtonLogout}>
          <Text style={styles.expert}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  profileContainer: {
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    textAlign: "center",
  },
  expert: {
    marginVertical: 10,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#a030e6",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 18,
    color: "#333",
  },
});
