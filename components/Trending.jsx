import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import TrendingItem from "./TrendingItem";

// // import { icons } from "../constants";

// // const zoomIn = {
// //   0: {
// //     scale: 0.9,
// //   },
// //   1: {
// //     scale: 1,
// //   },
// // };

// // const zoomOut = {
// //   0: {
// //     scale: 1,
// //   },
// //   1: {
// //     scale: 0.9,
// //   },
// // };

// // const TrendingItem = ({ activeItem, item }) => {
// //   const [play, setPlay] = useState(false);

// //   return (
// //     <Animatable.View
// //       className="mr-5"
// //       animation={activeItem === item.$id ? zoomIn : zoomOut}
// //       duration={500}
// //     >
// //       {play ? (
// //         <Video
// //           source={{ uri: item.video }}
// //           className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
// //           resizeMode={ResizeMode.CONTAIN}
// //           useNativeControls
// //           shouldPlay
// //           onPlaybackStatusUpdate={(status) => {
// //             if (status.didJustFinish) {
// //               setPlay(false);
// //             }
// //           }}
// //         />
// //       ) : (
// //         <TouchableOpacity
// //           className="relative flex justify-center items-center"
// //           activeOpacity={0.7}
// //           onPress={() => setPlay(true)}
// //         >
// //           <ImageBackground
// //             source={{
// //               uri: item.thumbnail,
// //             }}
// //             className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
// //             resizeMode="cover"
// //           />

// //           <Image
// //             source={icons.play}
// //             className="w-12 h-12 absolute"
// //             resizeMode="contain"
// //           />
// //         </TouchableOpacity>
// //       )}
// //     </Animatable.View>
// //   );
// // };

// // const Trending = ({ posts }) => {
// //   const [activeItem, setActiveItem] = useState(posts[0]);

// //   const viewableItemsChanged = ({ viewableItems }) => {
// //     if (viewableItems.length > 0) {
// //       setActiveItem(viewableItems[0].key);
// //     }
// //   };

// //   return (
// //     <FlatList
// //       data={posts}
// //       horizontal
// //       keyExtractor={(item) => item.$id}
// //       renderItem={({ item }) => (
// //         <TrendingItem activeItem={activeItem} item={item} />
// //       )}
// //       onViewableItemsChanged={viewableItemsChanged}
// //       viewabilityConfig={{
// //         itemVisiblePercentThreshold: 70,
// //       }}
// //       contentOffset={{ x: 170 }}
// //     />
// //   );
// // };

// // export default Trending;


// import { useState } from "react";
// import { ResizeMode, Video } from "expo-av";
// import * as Animatable from "react-native-animatable";
// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
// } from "react-native";
// import { useNavigation } from '@react-navigation/native'; // Import navigation
// import { icons } from "../constants";

// const zoomIn = {
//   0: {
//     scale: 0.9,
//   },
//   1: {
//     scale: 1,
//   },
// };

// const zoomOut = {
//   0: {
//     scale: 1,
//   },
//   1: {
//     scale: 0.9,
//   },
// };

// const TrendingItem = ({ activeItem, item }) => {
//   const [play, setPlay] = useState(false);
//   const navigation = useNavigation(); // Access navigation

//   const handleImagePress = () => {
//     // Navigate to the LatestVideos screen if clicked outside the play button
//     if (!play) {
//       // navigation.navigate('screens/LatestVideos');
//       navigation.navigate('screens/LatestVideos', { videos: item });
//     }
//   };

//   return (
//     <Animatable.View
//       className="mr-5"
//       animation={activeItem === item.$id ? zoomIn : zoomOut}
//       duration={500}
//     >
//       {play ? (
//         <Video
//           source={{ uri: item.video }}
//           className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
//           resizeMode={ResizeMode.CONTAIN}
//           useNativeControls
//           shouldPlay
//           onPlaybackStatusUpdate={(status) => {
//             if (status.didJustFinish) {
//               setPlay(false); // Stop playing when the video finishes
//             }
//           }}
//         />
//       ) : (
//         <TouchableOpacity
//           className="relative flex justify-center items-center"
//           activeOpacity={0.7}
//           onPress={() => setPlay(true)}
//         >
//           <ImageBackground
//             source={{
//               uri: item.thumbnail,
//             }}
//             className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
//             resizeMode="cover"
//           >
//             {/* Touchable outside play button */}
//             <TouchableOpacity
//               style={{ flex: 1 }}
//               onPress={handleImagePress}
//               activeOpacity={1}
//             >
//               {/* Empty pressable area to capture clicks outside the play button */}
//             </TouchableOpacity>
//           </ImageBackground>

//           <TouchableOpacity
//             onPress={() => setPlay(true)}
//             style={{ position: 'absolute' }}
//             activeOpacity={0.7}
//           >
//             <Image
//               source={icons.play}
//               className="w-12 h-12"
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </TouchableOpacity>
//       )}
//     </Animatable.View>
//   );
// };

// const Trending = ({ posts }) => {
//   const [activeItem, setActiveItem] = useState(posts[0]);

//   const viewableItemsChanged = ({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setActiveItem(viewableItems[0].key);
//     }
//   };

//   return (
//     <FlatList
//       data={posts}
//       horizontal
//       keyExtractor={(item) => item.$id}
//       renderItem={({ item }) => (
//         <TrendingItem activeItem={activeItem} item={item} />
//       )}
//       onViewableItemsChanged={viewableItemsChanged}
//       viewabilityConfig={{
//         itemVisiblePercentThreshold: 70,
//       }}
//       contentOffset={{ x: 170 }}
//     />
//   );
// };

// export default Trending;


const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} video={item} posts={posts}/>
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
