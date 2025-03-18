import React from "react";
import { Text, View, ViewStyle, TextStyle } from "react-native";

interface EmptyProp {
  title: string;
  content: string;
  viewStyle?: ViewStyle;
  titleStyle?: TextStyle;
  contentStyle?: TextStyle;
}

export const Empty: React.FC<EmptyProp> = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        ...props.viewStyle,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", ...props.titleStyle }}>
        {props.title}
      </Text>
      <Text style={props.contentStyle}>{props.content}</Text>
    </View>
  );
};
