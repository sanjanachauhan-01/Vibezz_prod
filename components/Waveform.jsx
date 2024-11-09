import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

const Waveform = ({ recordingUri, onDelete, nodelete }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && status.isPlaying) {
            setPosition(status.positionMillis);
            animatedValue.setValue((status.positionMillis / duration) * 100);
          } else if (status.didJustFinish) {
            setIsPlaying(false);
            setPosition(0);
            animatedValue.setValue(0);
          }
        }
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sound, duration, animatedValue]);

  const playPauseSound = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingUri });
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setDuration(status.durationMillis);
          }
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPosition(0);
            animatedValue.setValue(0);
          }
        });
        await newSound.playAsync();
      } else {
        await sound.playAsync();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleDelete = () => {
    if (sound) {
      sound.unloadAsync();
    }
    onDelete();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playPauseSound} style={styles.playButton}>
        <AntDesign name={isPlaying ? "pausecircle" : "play"} size={24} color="#818cf8" />
      </TouchableOpacity>
      <View style={styles.waveformContainer}>
        <Animated.View
          style={[
            styles.line,
            {
              width: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 200], // Adjust the output range according to the space between play and delete buttons
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{
                translateX: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 200], // Adjust the output range according to the space between play and delete buttons
                  extrapolate: 'clamp',
                }),
              }],
            },
          ]}
        />
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{(position / 1000).toFixed(1)}s</Text>
          <Text style={styles.timerText}>{(duration / 1000).toFixed(1)}s</Text>
        </View>
      </View>
      {!nodelete && (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    padding: 10,
  },
  waveformContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    marginLeft: 10,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#818cf8',
  },
  line: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#818cf8',
    top: '50%',
  },
  timerContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: {
    fontSize: 12,
    color: '#818cf8',
  },
  deleteButton: {
    padding: 10,
  },
});

export default Waveform;
