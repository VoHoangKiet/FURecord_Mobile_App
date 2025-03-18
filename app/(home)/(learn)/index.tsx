import { Thumbnail } from "@/components/common";
import { WingBlank } from "@ant-design/react-native";
import { ScrollView, StyleSheet } from "react-native";

export default function LearningScreen() {
  return (
    <ScrollView>
      <WingBlank size="sm">
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
      </WingBlank>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
})