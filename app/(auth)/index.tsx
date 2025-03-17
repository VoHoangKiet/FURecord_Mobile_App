import { useAuth } from "@/context/AuthContext";
import { Button, Form, Input } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }
    const success = await login({ email, password });
    if (!success) {
      alert("Đăng nhập thất bại, vui lòng thử lại");
    } else {
      router.navigate("/(tabs)");
    }
  };

  const navigateToSignUp = () => {
    router.navigate("/(auth)/signup");
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
      </View>

      <Form style={styles.formContainer}>
        <Form.Item
          hasFeedback
          name="email"
          rules={[
            { required: true, message: "Please input your email !" },
            { type: "email", message: "The input is not valid E-mail !" },
          ]}
        >
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[{ required: true, message: "Please input your password !" }]}
        >
          <Input
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onPress={handleLogin} loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={styles.footerText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
  },
});
