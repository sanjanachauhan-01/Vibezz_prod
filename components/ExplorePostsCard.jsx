import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';

const posts = [
  { id: '1', username: 'user1', media: 'https://i.pinimg.com/736x/73/47/ad/7347ada396c7435c78f8e17ed3c0a3a5.jpg', mediaType: 'image' },
  { id: '2', username: 'user2', media: 'https://i.pinimg.com/564x/c8/2f/a6/c82fa6b5018a2be574e8679e0b996a30.jpg', mediaType: 'image' },
  { id: '3', username: 'user3', media: 'https://i.pinimg.com/564x/fe/03/89/fe0389dae730fa4d2db187e685bd7cf7.jpg', mediaType: 'image' },
  { id: '4', username: 'user4', media: 'https://cloud.appwrite.io/v1/storage/buckets/66222dd0d4afb4dfc4ff/files/662f3b9a000938fef127/view?project=661d3132619b9d997567&mode=admin', mediaType: 'video' },
  { id: '5', username: 'user5', media: 'https://i.pinimg.com/736x/73/47/ad/7347ada396c7435c78f8e17ed3c0a3a5.jpg', mediaType: 'image' },
];

const ExplorePostsCard = () => {
  const [muted, setMuted] = useState(true);
  const [mediaDimensions, setMediaDimensions] = useState({});

  useEffect(() => {
    const fetchDimensions = () => {
      posts.forEach((post) => {
        if (post.mediaType === 'image') {
          Image.getSize(
            post.media,
            (width, height) => {
              const maxWidth = Dimensions.get('window').width / 2 - 14; // Adjusted to fit 2 columns
              const aspectRatio = height / width;
              const finalHeight = maxWidth * aspectRatio;

              setMediaDimensions((prevState) => ({
                ...prevState,
                [post.id]: { width: maxWidth, height: finalHeight },
              }));
            },
            (error) => {
              console.log('Error loading image dimensions:', error);
            }
          );
        } else if (post.mediaType === 'video') {
          const maxWidth = Dimensions.get('window').width / 2 - 14;
          const aspectRatio = 16 / 9;
          const finalHeight = maxWidth * aspectRatio;

          setMediaDimensions((prevState) => ({
            ...prevState,
            [post.id]: { width: maxWidth, height: finalHeight },
          }));
        }
      });
    };

    fetchDimensions();
  }, []);

  const renderItem = ({ item }) => {
    const itemDimensions = mediaDimensions[item.id];

    if (!itemDimensions) {
      // Render a placeholder while dimensions are being fetched
      return (
        <View style={[styles.cardPlaceholder, { width: Dimensions.get('window').width / 2 - 14, height: 200 }]}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      );
    }

    return (
      <View style={[styles.card, { width: itemDimensions.width, height: itemDimensions.height }]}>
        {item.mediaType === 'image' ? (
          <Image
            source={{ uri: item.media }}
            style={{ width: itemDimensions.width, height: itemDimensions.height }}
            resizeMode="cover"
          />
        ) : (
          <Video
            source={{ uri: item.media }}
            style={{ width: itemDimensions.width, height: itemDimensions.height }}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={muted}
          />
        )}
        <Text style={styles.username}>{item.username}</Text>
        {item.mediaType === 'video' && (
          <TouchableOpacity style={styles.unmuteButton} onPress={() => setMuted(!muted)}>
            <Text style={styles.unmuteButtonText}>{muted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 7,
  },
  cardPlaceholder: {
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 7,
    flex: 1,
  },
  username: {
    color: 'white',
    padding: 8,
    textAlign: 'center',
  },
  unmuteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  unmuteButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default ExplorePostsCard;
