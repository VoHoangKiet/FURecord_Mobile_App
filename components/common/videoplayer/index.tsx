import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useVideoPlayer, VideoView, VideoViewProps } from "expo-video";

interface VideoPlayerProps extends Omit<VideoViewProps, "player"> {
  videoUrl: string;
}

export const VideoPlayer = ({ videoUrl, ...props }: VideoPlayerProps) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.backgroundVideo} {...props} />
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
