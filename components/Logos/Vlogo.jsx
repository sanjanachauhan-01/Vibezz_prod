import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

const VLogo = () => {
  const progress = useSharedValue(0);

  // Animated style for text color interpolation
  const animatedStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        'rgba(124, 58, 237, 1)', // Purple
        'rgba(232, 121, 249, 1)',
        'rgba(251, 146, 60, 1)', // Sunset Orange
      ]
    );

    return {
      color: textColor,
    };
  });

  // Handle animation toggle on press
  const handlePress = () => {
    progress.value = withTiming(progress.value === 0 ? 1 : 0, { duration: 1000 });
  };

  // Automatically start the animation when component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      handlePress();
    }, 2000); // Toggle color every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Text */}
      <Animated.Text
        style={[styles.text, animatedStyle]}
        onTouchStart={handlePress} // Toggle color on touch
      >
        V
      </Animated.Text>

      {/* Triangles to form the "V" shape */}
      {/* Right-Angled Triangle at Bottom Left */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 0,
          height: 0,
          borderLeftWidth: 50,
          borderTopWidth: 50,
          borderColor: 'transparent',
          borderLeftColor: 'black',
          borderTopColor: 'transparent',
        }}
      />

      {/* Right-Angled Triangle at Bottom Right */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
          borderRightWidth: 50,
          borderTopWidth: 50,
          borderColor: 'transparent',
          borderRightColor: 'black',
          borderTopColor: 'transparent',
        }}
      />

      {/* Triangle at Top Middle */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          marginLeft: -25, // To center the triangle
          width: 0,
          height: 0,
          borderLeftWidth: 25,
          borderRightWidth: 25,
          borderBottomWidth: 50,
          borderColor: 'transparent',
          borderBottomColor: 'black',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // fontSize: 120,
    fontSize:50,
    paddingTop:'70%',
    fontWeight: '900',
    textAlign: 'center',
    color: 'transparent', // Make text color transparent for the gradient effect
    position: 'absolute',
  },
});

export default VLogo;
