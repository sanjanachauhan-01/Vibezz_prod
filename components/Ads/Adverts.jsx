import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';

// Sample data
const fruits = [
  { id: '1', name: 'Apple', background: 'https://i.pinimg.com/474x/3a/dd/f4/3addf4789e2bde5e6c1166c249b15b96.jpg', mediaType: 'image' },
  { id: '2', name: 'Banana', background: 'https://i.pinimg.com/564x/8b/a4/b1/8ba4b140de88efd744057639762c1a5a.jpg', mediaType: 'image' },
  { id: '3', name: 'Cherry', background: 'https://i.pinimg.com/564x/71/54/8c/71548ce2dc0253a4c35382caa769ed13.jpg', mediaType: 'image' },
  { id: '4', name: 'Blossom', background: 'https://pin.it/5VXD03s8g', mediaType: 'video' }
];

const Adverts = () => {
  const renderItem = ({ item }) => {
    if (item.mediaType === 'image') {
      return (
        <View style={styles.card}>
          <ImageBackground source={{ uri: item.background }} style={styles.backgroundImage}>
            <Text style={styles.nameText}>{item.name}</Text>
            <TouchableOpacity style={styles.vibeButton}>
              <Text style={styles.vibeButtonText}>Visit</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    } else if (item.mediaType === 'video') {
      return (
        <View style={styles.card}>
          <Video
            source={{ uri: item.background }}
            style={styles.backgroundImage}
            resizeMode={ResizeMode.COVER}
            isMuted={true}
            isLooping={true}
            shouldPlay
          />
          <View style={styles.overlay}>
            <Text style={styles.nameText}>{item.name}</Text>
            <TouchableOpacity style={styles.vibeButton}>
              <Text style={styles.vibeButtonText}>Visit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <FlatList
      data={fruits}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carousel}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    paddingHorizontal: 16,
    height:100,
    // position:'static'
  },
  card: {
    width: Dimensions.get('window').width * 0.7,
    height: 100, // This ensures the card takes up the full height of the parent container
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'transparent',
  },
  nameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  vibeButton: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  vibeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Adverts;
