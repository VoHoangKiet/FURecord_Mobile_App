import { Form, Input } from "@ant-design/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const emailConfirm = await AsyncStorage.getItem("email");
    const passwordConfirm = await AsyncStorage.getItem("password");
    if (email === emailConfirm && password === passwordConfirm) {
      try {
        alert("Sign In Successful");
        await AsyncStorage.setItem("isLogged", "true");
        router.navigate("/(tabs)");
      } catch (error) {
        console.error("Error saving data", error);
      }
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
      </View>

      <Form style={styles.formContainer}>
        <Form.Item
          hasFeedback
          name="field_a"
          validateTrigger="onBlur"
          rules={[{ max: 3 }]}
        >
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Form.Item>
        <Form.Item>
          <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Form.Item>
      </Form>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Don't have an account? Sign up</Text>
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
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
