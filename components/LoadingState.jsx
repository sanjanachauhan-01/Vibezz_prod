import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");

const LoadingState = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <LottieView
        source={require("../assets/lottie/loading.json")} // Replace with your Lottie JSON file path
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Make the loading overlay absolute
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Covers the entire screen including the tab bar
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Slight transparency for better effect
    height, // Use full screen height
    width, // Use full screen width
    zIndex: 10, // Ensures it appears above all other components
  },
  lottie: {
    width: "50%",
    height: "50%",
  },
});

export default LoadingState;
