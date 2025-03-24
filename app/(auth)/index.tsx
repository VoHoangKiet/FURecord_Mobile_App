import { getProfileInfo, LoginCredentials } from "@/apis/auth.api";
import { useAuth } from "@/context/AuthContext";
import { Button, Form, Input, Toast } from "@ant-design/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loading, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/(home)");
    }
  }, [user])

  const handleSubmitBtn = async () => {
    form.submit();
  };

  const handleLogin = async (body: LoginCredentials) => {
    const success = await login(body);
    if (success) {
      router.replace("/(home)");
    } else {
      Toast.fail("Login fail, Please try again");
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

      <Form style={styles.formContainer} form={form} onFinish={handleLogin}>
        <Form.Item
          hasFeedback
          name="email"
          rules={[
            { required: true, message: "Please input your email !" },
            { type: "email", message: "The input is not valid E-mail !" },
          ]}
        >
          <Input
            autoCapitalize="none"
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
          <Button type="primary" onPress={handleSubmitBtn} loading={loading}>
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
