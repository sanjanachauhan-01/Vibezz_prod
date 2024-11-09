// // import React from "react";
// // import { View, Text, StyleSheet } from "react-native";
// // import { Video } from "expo-av";
// // import { useRoute } from '@react-navigation/native'; // Import useRoute to access route params

// // const LatestVideos = () => {
// //   const route = useRoute();
// //   const { video } = route.params; // Correctly access video from route params
  
// //   console.log("Now Playing Video ID:", video);

// //   return (
// //     <View style={styles.container}>
// //       {/* <Text style={styles.title}>Now Playing Video ID: {video?.id || "N/A"}</Text> */}
// //       {/* Render the video */}
// //       <Video
// //         source={{ uri: video.video }} // Correctly accessing the video URL
// //         useNativeControls
// //         style={styles.video}
// //         resizeMode="contain"
// //         shouldPlay
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: '#000',
// //   },
// //   title: {
// //     color: '#fff',
// //     fontSize: 18,
// //     marginBottom: 12,
// //   },
// //   video: {
// //     width: '100%',
// //     height: '100%',
// //   },
// // });

// // export default LatestVideos;
// import React, { useState } from "react";
// import { View, Image, StyleSheet, Dimensions } from "react-native";
// import { Video } from "expo-av";
// import { useRoute } from '@react-navigation/native'; // Import useRoute to access route params

// const { width, height } = Dimensions.get('window'); // Get screen dimensions for full-screen view

// const LatestVideos = () => {
//   const route = useRoute();
//   const { video } = route.params; // Correctly access video from route params

//   const [isVideoReady, setIsVideoReady] = useState(false); // Track if video is ready

//   return (
//     <View style={styles.container}>
//       {/* Show thumbnail until the video starts playing */}
//       {!isVideoReady && (
//         <Image
//           source={{ uri: video.thumbnail }} // Use thumbnail image
//           style={styles.thumbnail}
//           resizeMode="cover"
//         />
//       )}

//       {/* Render the video */}
//       <Video
//         source={{ uri: video.video }} // Correctly access video URL
//         useNativeControls
//         style={styles.video}
//         resizeMode="contain"
//         shouldPlay
//         onLoad={() => setIsVideoReady(true)} // Hide thumbnail once the video is loaded
//         onPlaybackStatusUpdate={(status) => {
//           if (status.isPlaying) {
//             setIsVideoReady(true); // Ensure thumbnail is hidden when video starts playing
//           }
//         }}
//         onLoadStart={() => setIsVideoReady(false)} // Show thumbnail while video is loading
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   thumbnail: {
//     width: '100%',
//     height: '100%', // Full-screen thumbnail
//     position: 'absolute', // Overlay thumbnail on the video
//     zIndex: 1, // Ensure it's above the video
//   },
//   video: {
//     width: '100%',
//     height: '100%', // Full-screen video
//   },
// });

// export default LatestVideos;
import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { useRoute } from '@react-navigation/native'; // Import useRoute to access route params

const { width, height } = Dimensions.get('window'); // Get screen dimensions for full-screen view

const LatestVideos = () => {
  const route = useRoute();
  const { video } = route.params; // Correctly access video from route params

  const [isVideoReady, setIsVideoReady] = useState(false); // Track if video is ready
  const [isLoading, setIsLoading] = useState(true); // Track if the video is loading

  return (
    <View style={styles.container}>
      {/* Show thumbnail until the video is ready */}
      {!isVideoReady && (
        <Image
          source={{ uri: video.thumbnail }} // Use thumbnail image
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}

      {/* Loader over the thumbnail while video is loading */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      )}

      {/* Render the video */}
      <Video
        source={{ uri: video.video }} // Correctly access video URL
        useNativeControls
        style={styles.video}
        resizeMode="contain"
        shouldPlay
        onLoad={() => {
          setIsVideoReady(true); // Hide thumbnail once the video is ready
          setIsLoading(false); // Stop loading once the video is ready
        }}
        onPlaybackStatusUpdate={(status) => {
          if (status.isPlaying) {
            setIsVideoReady(true); // Ensure thumbnail is hidden when video starts playing
            setIsLoading(false); // Ensure loader is hidden when video starts playing
          }
        }}
        onLoadStart={() => {
          setIsVideoReady(false); // Show thumbnail and loader while loading
          setIsLoading(true); // Start showing the loader
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%', // Full-screen thumbnail
    position: 'absolute', // Overlay thumbnail on the video
    zIndex: 1, // Ensure it's above the video
  },
  loaderContainer: {
    position: 'absolute', // Overlay loader on the video and thumbnail
    zIndex: 2, // Ensure the loader is above the thumbnail
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Dim background while loading
  },
  video: {
    width: '100%',
    height: '100%', // Full-screen video
  },
});

export default LatestVideos;
