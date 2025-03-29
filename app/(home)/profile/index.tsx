import { getRole } from "@/apis/auth.api";
import { useAuth } from "@/context/AuthContext";
import { Modal } from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function ProfileScreen() {
  const { user, logout, loading } = useAuth();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    getRoleUser();
  }, []);
  const getRoleUser = async () => {
    const roleStorage = (await getRole()) as string;
    setRole(roleStorage);
  };

  if (!user || loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  const handleUpdateProfile = () => {
    router.push("/(home)/profile/update");
  };

  const handleUpdateProfileImage = () => {
    router.push("/(home)/profile/update-image");
  };

  const handleResumeProfile = () => {
    router.push("/(home)/profile/resume");
  };

  const handlePreviewProfile = () => {
    router.push({ pathname: "/(home)/profile/[id]", params: { id: user.id } });
  };

  const handleViewPurchase = () => {
    router.push({ pathname: "/(home)/profile/my-purchase" });
  };

  const handleViewMyCourses = () => {
    router.push({ pathname: "/(home)/profile/my-courses" });
  };

  const handleLogout = () => {
    logout();
    router.replace("/(auth)");
  };

  const onButtonLogout = () => {
    Modal.alert("Logout", "Are you sure you want to log out ?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => handleLogout() },
    ]);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.avatarUrl }} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>{user.email}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          {role === "USER" ? (
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Text
                style={[styles.role, { marginHorizontal: "auto", width: 50 }]}
              >
                {user.role}
              </Text>
              <Text
                style={[
                  styles.role,
                  { marginHorizontal: "auto", minWidth: 50 },
                ]}
              >
                Legit: {user.legitMark}
              </Text>
            </View>
          ) : (
            <Text style={[styles.role, { width: 80 }]}>{role}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handlePreviewProfile}
        >
          <Text style={styles.menuText}>View My Profile</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleViewPurchase}>
          <Text style={styles.menuText}>My Purchase</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleUpdateProfileImage}
        >
          <Text style={styles.menuText}>Update Avatar</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleUpdateProfile}>
          <Text style={styles.menuText}>Edit Personal Info</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleResumeProfile}>
          <Text style={styles.menuText}>My Resume</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        {role === "EXPERT" && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleViewMyCourses}
          >
            <Text style={styles.menuText}>My Courses</Text>
            <Ionicons name="chevron-forward-outline" size={18} />
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Note For Recruiters</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Stop Service</Text>
          <Ionicons name="chevron-forward-outline" size={18} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onButtonLogout}>
          <Text style={styles.expert}>Sign Out</Text>
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
  role: {
    marginVertical: 10,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#a6c305",
    backgroundColor: "lightyellow",
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
  },
  expert: {
    marginBottom: 10,
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
