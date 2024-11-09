// import React from 'react';
// import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
// import {ResizeMode, Video } from 'expo-av'; // Import react-native-video

// // Sample data
// const fruits = [
//   { id: '1', name: 'Apple', background: 'https://i.pinimg.com/564x/1f/c0/45/1fc0452e49297f64f2ae6d3dbe25a794.jpg', mediaType: 'image' },
//   { id: '2', name: 'Banana', background: 'https://cloud.appwrite.io/v1/storage/buckets/662d0d27002b99db92c9/files/662f43690f7a8bdb3bd4/preview?width=2000&height=2000&gravity=top&quality=100&project=661d3132619b9d997567', mediaType: 'image' },
//   { id: '3', name: 'Cherry', background: 'https://i.pinimg.com/564x/86/ae/53/86ae532ce2ac23dee397a290baa26b18.jpg', mediaType: 'image' },
//   { id: '4', name: 'Blossom', background: 'https://cloud.appwrite.io/v1/storage/buckets/66222dd0d4afb4dfc4ff/files/662f3b9a000938fef127/view?project=661d3132619b9d997567&mode=admin', mediaType: 'video' }
// ];

// const VibezzSignalsCard = () => {
//   const renderItem = ({ item }) => {
//     if (item.mediaType === 'image') {
//       return (
//         <View style={styles.card}>
//           <ImageBackground source={{ uri: item.background }} style={styles.backgroundImage}>
//             <Text style={styles.nameText}>{item.name}</Text>
//             <TouchableOpacity style={styles.vibeButton}>
//               <Text style={styles.vibeButtonText}>Vibe</Text>
//             </TouchableOpacity>
//           </ImageBackground>
//         </View>
//       );
//     } else if (item.mediaType === 'video') {
//       return (
//         <View style={styles.card}>
//           {/* <View style={styles.overlay}> */}
//           <Video
//             source={{ uri: item.background }}
//             style={styles.backgroundImage}
//             resizeMode={ResizeMode.COVER}
//             isMuted={true}
//             isLooping={true}
//           />
//           <View style={styles.overlay}>
//             <Text style={styles.nameText}>{item.name}</Text>
//             <TouchableOpacity style={styles.vibeButton}>
//               <Text style={styles.vibeButtonText}>Vibe</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }
//   };

//   return (
//     <FlatList
//       data={fruits}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.carousel}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   carousel: {
//     paddingHorizontal: 16,
//     backgroundColor:'pink',
//   },
//   card: {
//     width: Dimensions.get('window').width * 0.7,
//     height: '60%',
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginRight: 16,
//     backgroundColor: 'transparent',
    
//   },
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     padding: 16,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     padding: 16,
//     // backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     backgroundColor:'transparent'
//   },
//   nameText: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   vibeButton: {
//     alignSelf: 'center',
//     marginTop: 16,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   vibeButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default VibezzSignalsCard;

import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useState } from 'react';

// Sample data
const fruits = [
  { id: '1', name: 'Apple', background: 'https://i.pinimg.com/564x/1f/c0/45/1fc0452e49297f64f2ae6d3dbe25a794.jpg', mediaType: 'image' },
  { id: '2', name: 'Banana', background: 'https://cloud.appwrite.io/v1/storage/buckets/662d0d27002b99db92c9/files/662f43690f7a8bdb3bd4/preview?width=2000&height=2000&gravity=top&quality=100&project=661d3132619b9d997567', mediaType: 'image' },
  { id: '3', name: 'Cherry', background: 'https://i.pinimg.com/564x/86/ae/53/86ae532ce2ac23dee397a290baa26b18.jpg', mediaType: 'image' },
  { id: '4', name: 'Blossom', background: 'https://cloud.appwrite.io/v1/storage/buckets/66222dd0d4afb4dfc4ff/files/662f3b9a000938fef127/view?project=661d3132619b9d997567&mode=admin', mediaType: 'video' }
];

const VibezzSignalsCard = () => {

  const [muted, setMuted] = useState(true);

  const renderItem = ({ item }) => {
    if (item.mediaType === 'image') {
      return (
        <View style={styles.card}>
          <ImageBackground source={{ uri: item.background }} style={styles.backgroundImage}>
            <Text style={styles.nameText}>{item.name}</Text>
            <TouchableOpacity style={styles.vibeButton}>
              <Text style={styles.vibeButtonText}>Vibe</Text>
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
              <Text style={styles.vibeButtonText}>Vibe</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.unmuteButton} onPress={() => setMuted(!muted)}>
            <Text style={styles.unmuteButtonText}>{muted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity> */}
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
    height:350,
    // position:'static'
  },
  card: {
    width: Dimensions.get('window').width * 0.7,
    height: 350, // This ensures the card takes up the full height of the parent container
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

export default VibezzSignalsCard;
