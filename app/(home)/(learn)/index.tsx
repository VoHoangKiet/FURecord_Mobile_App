import { Card, WingBlank } from "@ant-design/react-native";
import { Text, View } from "react-native";

export default function LearningScreen() {
  return (
    <View>
      <WingBlank size="sm">
      <Card>
            <Card.Header
              title="This is title"
              thumbStyle={{ width: 30, height: 30 }}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra="this is extra"
            />
            <Card.Body>
              <View style={{ height: 42 }}>
                <Text style={{ marginLeft: 16 }}>Card Content</Text>
              </View>
            </Card.Body>
            <Card.Footer
              content="footer content"
              extra="footer extra content"
            />
          </Card>
      </WingBlank>
    </View>
  );
}
