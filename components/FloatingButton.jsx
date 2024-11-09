import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const FloatingButton = () => {
  const [animation] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera access is required to use this feature.');
      }
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus.status !== 'granted') {
        Alert.alert('Permission Required', 'Media library access is required to use this feature.');
      }
    })();
  }, []);

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const openCameraWithGalleryOption = () => {
    setModalVisible(true); // Show modal to choose between camera and gallery
  };

  const handleOpenCamera = async () => {
    setModalVisible(false); // Hide modal
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Photo captured:', result.uri);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const handleOpenVideo = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Video captured:', result.uri);
      }
    } catch (error) {
      console.error('Error opening video:', error);
    }
  };

  const handleOpenMediaGallery = async () => {
    setModalVisible(false); // Hide modal
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Media selected:', result.uri);
      }
    } catch (error) {
      console.error('Error opening media gallery:', error);
    }
  };

  const handleFizz = () => {
    handleOpenCamera(); // Open Camera
    handleOpenVideo();  // Open Video Recording
  };

  const pinStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const videoStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
  };

  const fizzStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -200],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback 
      // onPress={handleFizz}
      onPress={openCameraWithGalleryOption}
      >
        <Animated.View style={[styles.button, styles.secondary, fizzStyle]}>
          <Ionicons name="timer-outline" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback 
      // onPress={openCameraWithGalleryOption}
      onPress={handleFizz}
      >
        <Animated.View style={[styles.button, styles.secondary, videoStyle]}>
          <Entypo name="camera" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleOpenVideo}>
        <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
          <AntDesign name="videocamera" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <Feather name="plus" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Modal for choosing between Camera and Gallery */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={handleOpenCamera} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenMediaGallery} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    marginTop: '178%',
    marginLeft: '80%',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#818cf8',
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },
  menu: {
    backgroundColor: '#818cf8',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#818cf8',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#818cf8',
  },
});

export default FloatingButton;
