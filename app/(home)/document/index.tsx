import { CardComponent } from "@/components/document/Card";
import { SearchBar } from "@ant-design/react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function FlashCardScreen() {
  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <CardComponent title="How to using git" author="Vo Hoang Kiet" />
      <CardComponent title="How to using git" author="Vo Hoang Kiet" />
      <CardComponent title="How to using git" author="Vo Hoang Kiet" />
      <CardComponent title="How to using git" author="Vo Hoang Kiet" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#fff",

  }
})
