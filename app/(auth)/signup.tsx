import { signUp, SignUpDTO } from "@/apis/auth.api";
import { Button, Toast } from "@ant-design/react-native";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function LoginScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: (body: SignUpDTO) => {
      return signUp(body);
    },
  });
  const handleSignUp = async () => {
    if (fullName && email && password && password === confirmPassword) {
      const signUpData: SignUpDTO = { email, fullName, password };
      signUpMutation(signUpData, {
        onSuccess() {
          Toast.success("Register Successfully");
          router.navigate({
            pathname: "/(auth)",
          });
        },
        onError(data: any) {
          Toast.fail(data.response.data.message);
        },
      });
    } else {
      alert("Please fill all fields correctly");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button
          style={styles.signUpButton}
          onPress={handleSignUp}
          loading={isPending}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing up, you agree to our Terms & Conditions
        </Text>
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
  signUpButton: {
    backgroundColor: "#007BFF",
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
