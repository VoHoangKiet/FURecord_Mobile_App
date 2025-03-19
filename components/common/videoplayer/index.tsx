import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

export const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play();
  });
  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.backgroundVideo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  backgroundVideo: {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("window").width * (9 / 16),
  },
});
