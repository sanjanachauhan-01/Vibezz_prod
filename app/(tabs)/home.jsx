// import React, { useState, useEffect, useRef,  } from "react";
// import { SafeAreaView, Animated, FlatList, Image, RefreshControl, Text, View , StyleSheet, ActivityIndicator} from "react-native";
// import { images } from "../../constants";
// import useAppwrite from "../../lib/useAppwrite";
// import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
// import { EmptyState, SearchInput, Trending } from "../../components";
// import { renderItem } from "../../components/RenderFunctions";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import FloatingButton from "../../components/FloatingButton";
// import { StatusBar } from "expo-status-bar";
// import Moods from "../../components/Moods/Moods";
// import { TouchableOpacity } from "react-native";
// import { SplashScreen, useNavigation } from "expo-router";
// import Entypo from '@expo/vector-icons/Entypo';
// import * as Notifications from 'expo-notifications';
// import { BlurView } from "expo-blur";
// import { LinearGradient } from "expo-linear-gradient";
// import VLogo from "../../components/Logos/Vlogo";
// import MoodSticker from "../../components/Moods/MoodSticker";




// const Home = () => {
//   const { user } = useGlobalContext();
//   const navigation = useNavigation();
//   const [notificationCount, setNotificationCount] = useState(1);

//   const { data: posts, refetch } = useAppwrite(getAllPosts, 'video');
//   const { data: latestPosts } = useAppwrite(getLatestPosts, 'latest');

//   const [refreshing, setRefreshing] = useState(false);
//   const [showMoods, setShowMoods] = useState(true);  // State to manage Moods visibility

//   const slideAnim = useRef(new Animated.Value(0)).current;


//   const startSlideAnimation = () => {
//     // Reset the animation value to the start position
//     slideAnim.setValue(-200);
    
//     // Trigger the slide down animation
//     Animated.timing(slideAnim, {
//       toValue: 0,  // Slide down to its final position
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   };
   

//   useEffect(() => {
//     startSlideAnimation();
//     setShowMoods(true);
//   }, []);
  
//   const handlePress = () => {
//     // Navigate to the index screen (PostsScreen)
//    navigation.navigate('screens/Messages');
//   };

//   useEffect(() => {
//     const subscription = Notifications.addNotificationReceivedListener(notification => {
//       setNotificationCount(prevCount => prevCount + 1);
//     });

//     return () => subscription.remove();
//   }, []);
  
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);

//       // Re-trigger the slide animation after refresh
//       startSlideAnimation();
//       setShowMoods(true);

//   };

//   return (
//     <SafeAreaView className="bg-black h-full">
//       <StatusBar translucent backgroundColor="transparent" />
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.$id}
//         renderItem={({ item }) => renderItem({ item , user, posts})} 
//         ListHeaderComponent={() => (
//           // <View className="flex my-6 px-4 space-y-6 mt-10" style={{ backgroundColor: 'pink'}}>
//        <View style={{ flex: 1 , marginTop: '10%' ,
//        }}>  
//       <LinearGradient
//         colors={['rgba(0, 0, 0, 1)', '#5b21b6']} // Black to deep purple
//         className="flex justify-between items-start flex-row mb-6 w-full pl-5 pr-5 pt-5 pb-3"
//       >
//               <View >
//                 <Text className="font-pmedium text-sm text-gray-100" >
//                   Welcome Back
//                 </Text>
//                 {user ? (
//                   <Text className="text-2xl font-psemibold text-white">
//                     {user.username}
//                   </Text>
//                 ) : null}
//               </View>
//               <View className="mt-1.5">
//               <TouchableOpacity
//                  onPress={()=> handlePress()} 
//                  ><VLogo/>
//                 </TouchableOpacity> 

//                 <TouchableOpacity onPress={handlePress}>    
//         <View style={styles.imageContainer}>
  
//           {notificationCount > 0 && (
//             <View style={styles.badgeContainer}>
//               <Text style={styles.badgeText}>{notificationCount}</Text>
//             </View>
//           )}
//         </View>
//       </TouchableOpacity>
//               </View>
//             </LinearGradient>
//             <View style={{flex: 1 , marginTop: -15 , marginHorizontal: '5%'
//             }}> 
//               <Text className="text-lg font-pregular text-gray-100 mb-3">
//                 Latest Videos
//               </Text>
//               <Trending posts={latestPosts} />
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={() => (
//           <EmptyState
//             title="No Videos Found"
//             subtitle="No videos created yet"
//             show={true}
//           />
//         )}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       />


//        {showMoods && (
//         <Animated.View
//           style={{
//             transform: [{ translateY: slideAnim }],
//             position: 'absolute',  // Position absolutely so it doesn't affect other components
//             top: '70%',  // Align it to the top of the screen
//             // left: '5%',
//             // right: '5%',
//             zIndex: 2,  // Make sure it stays above other components
//             marginTop: 90,  // Adjust as needed,
//             height:'100%' , 
//             width:'100%'
//           }}
//         >
//           <Moods onClose={() => setShowMoods(false)} />
//         </Animated.View>
//       )}

//        <MoodSticker onClick={()=> setShowMoods(!showMoods)} mood={showMoods}/>
//       <FloatingButton />

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   imageContainer: {
//     position: 'relative',
//     width: 36,
//     height: 40,
//   },
//   badgeContainer: {
//     position: 'absolute',
//     top: -10,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 18,
//     height: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   glassEffect: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
//     borderRadius: 10,
//   },
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 120,
//   },

// });

// export default Home;

import React, { useState, useEffect, useRef,  } from "react";
import { SafeAreaView, Animated, FlatList, Image, RefreshControl, Text, View , StyleSheet, ActivityIndicator} from "react-native";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending } from "../../components";
import { renderItem } from "../../components/RenderFunctions";
import { useGlobalContext } from "../../context/GlobalProvider";
import FloatingButton from "../../components/FloatingButton";
import { StatusBar } from "expo-status-bar";
import Moods from "../../components/Moods/Moods";
import { TouchableOpacity } from "react-native";
import { SplashScreen, useNavigation } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import * as Notifications from 'expo-notifications';
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import VLogo from "../../components/Logos/Vlogo";
import MoodSticker from "../../components/Moods/MoodSticker";
import LottieView from "lottie-react-native";

const Home = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(1);

  const { data: posts, refetch, loading: postsLoading } = useAppwrite(getAllPosts, 'video');
  const { data: latestPosts, loading: latestPostsLoading } = useAppwrite(getLatestPosts, 'latest');

  const [refreshing, setRefreshing] = useState(false);
  const [showMoods, setShowMoods] = useState(true);  // State to manage Moods visibility

  const slideAnim = useRef(new Animated.Value(0)).current;

  const startSlideAnimation = () => {
    slideAnim.setValue(-200);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startSlideAnimation();
    setShowMoods(true);
  }, []);

  const handlePress = () => {
    navigation.navigate('screens/Messages');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
    startSlideAnimation();
    setShowMoods(true);
  };

  // Check if any of the API calls are loading
  const isLoading = postsLoading || latestPostsLoading;

  return (
    <SafeAreaView className="bg-black h-full">
      <StatusBar translucent backgroundColor="transparent" />
      
      {isLoading ? (
        // Show Lottie animation when loading
        <View style={{ 
          position: "absolute", // Make the loading overlay absolute
          top: 0,
          left: 0,
          right: 0,
          bottom: 0, // Covers the entire screen including the tab bar
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.9)", // Slight transparency for better effect
          height: '100%', // Use full screen height
          width:'100%', // Use full screen width
          zIndex: 10, // Ensures it appears above all other components
          
          }}>
    <StatusBar translucent backgroundColor="transparent" />
    <LottieView
      source={require("../../assets/lottie/loading.json")} // Replace with your Lottie JSON file path
      autoPlay
      loop
      style={{width:'70%', height:'70%'}}
    />
  </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => renderItem({ item, user, posts })}
          ListHeaderComponent={() => (
            <View style={{ flex: 1, marginTop: '10%' }}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 1)', '#5b21b6']}
                className="flex justify-between items-start flex-row mb-6 w-full pl-5 pr-5 pt-5 pb-3"
              >
                <View >
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  {user ? (
                    <Text className="text-2xl font-psemibold text-white">
                      {user.username}
                    </Text>
                  ) : null}
                </View>
                <View className="mt-1.5">
                  <TouchableOpacity onPress={() => handlePress()}><VLogo /></TouchableOpacity>
                  <TouchableOpacity onPress={handlePress}>
                    <View style={styles.imageContainer}>
                      {notificationCount > 0 && (
                        <View style={styles.badgeContainer}>
                          <Text style={styles.badgeText}>{notificationCount}</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <View style={{ flex: 1, marginTop: -15, marginHorizontal: '5%' }}>
                <Text className="text-lg font-pregular text-gray-100 mb-3">
                  Latest Videos
                </Text>
                <Trending posts={latestPosts} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos created yet"
              show={true}
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      {showMoods && (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            position: 'absolute',
            top: '70%',
            zIndex: 2,
            marginTop: 90,
            height: '100%',
            width: '100%',
          }}
        >
          <Moods onClose={() => setShowMoods(false)} />
        </Animated.View>
      )}

      <MoodSticker onClick={() => setShowMoods(!showMoods)} mood={showMoods} />
      <FloatingButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: 36,
    height: 40,
  },
  badgeContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Home;
