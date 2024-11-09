import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SwipeUpButton = ({ onSwipeUp, onClose, isModalVisible }) => {
  const translateY = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.translationY < -50 && event.nativeEvent.state === 5) { // State 5 represents END state
      onSwipeUp();
    }
    // Reset translation after gesture ends
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.swipeUpContainer,
          {
            transform: [{ translateY: translateY }],
          }
        ]}
      >
        <Feather
          name={isModalVisible ? "x" : "arrow-up"}
          size={24}
          color="black"
          onPress={isModalVisible ? onClose : null}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  swipeUpContainer: {
    position: 'absolute',
    backgroundColor: '#6e6af0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 40,
    width: 40,
    // top: Dimensions.get('window').height * 0.98,
    alignSelf: 'center'
  },
});

export default SwipeUpButton;
