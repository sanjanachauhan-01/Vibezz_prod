import React, { useState, useEffect, useRef,  } from "react";
import { SafeAreaView, Animated, FlatList, Image, RefreshControl, Text, View , StyleSheet} from "react-native";
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
import { useNavigation } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import * as Notifications from 'expo-notifications';


const Home = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(1);

  const { data: posts, refetch } = useAppwrite(getAllPosts, 'video');
  const { data: latestPosts } = useAppwrite(getLatestPosts, 'latest');

  const [refreshing, setRefreshing] = useState(false);
  const [showMoods, setShowMoods] = useState(true);  // State to manage Moods visibility

  const slideAnim = useRef(new Animated.Value(0)).current;

  const startSlideAnimation = () => {
    // Reset the animation value to the start position
    slideAnim.setValue(-200);
    
    // Trigger the slide down animation
    Animated.timing(slideAnim, {
      toValue: 0,  // Slide down to its final position
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
   
  useEffect(() => {
    startSlideAnimation();
    setShowMoods(true);
  }, []);
  
  const handlePress = () => {
    // Navigate to the index screen (PostsScreen)
   navigation.navigate('screens/Messages');
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotificationCount(prevCount => prevCount + 1);
    });

    return () => subscription.remove();
  }, []);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);

      // Re-trigger the slide animation after refresh
      startSlideAnimation();
      setShowMoods(true);

  };

  return (
    <SafeAreaView className="bg-black h-full">
      <StatusBar translucent backgroundColor="transparent" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => renderItem({ item })} 
        ListHeaderComponent={() => (
          // <View className="flex my-6 px-4 space-y-6 mt-10" style={{ backgroundColor: 'pink'}}>
          <View style={{ flex: 1 , marginTop: '10%' , marginHorizontal: '5%'}}> 
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
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
              {/* <TouchableOpacity
                 onPress={()=> handlePress()} 
                 >    
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10 ml-1"
                  resizeMode="contain"
                />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handlePress}>    
        <View style={styles.imageContainer}>
          <Image
            source={images.logoSmall}
            className="w-9 h-10 ml-1"
            resizeMode="contain"
          />
          
  
          {notificationCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
                 <TouchableOpacity style={{ height: 18 , width:45 , backgroundColor:'white' , borderRadius: 10 , borderWidth:1 , borderColor:'white', marginTop:2}}
                 onPress={()=> setShowMoods(!showMoods)} 
                 >    
                 <Text style={{ fontSize: 10 , textAlign:'center'}}>#Moods</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View className="w-full flex-1 pt-5 pb-8"> */}
            <View style={{flex: 1 , marginTop: -20
            }}> 
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
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />


       {showMoods && (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            position: 'absolute',  // Position absolutely so it doesn't affect other components
            top: '70%',  // Align it to the top of the screen
            left: '5%',
            right: '5%',
            zIndex: 2,  // Make sure it stays above other components
            marginTop: 90,  // Adjust as needed,
            height:'100%'
          }}
        >
          <Moods onClose={() => setShowMoods(false)} />
        </Animated.View>
      )}


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
    top: -4,
    right: -4,
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
  // moodsButton: {
  //   height: 18,
  //   width: 45,
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderColor: 'white',
  //   marginTop: 2,
  // },
  // moodsText: {
  //   fontSize: 10,
  //   textAlign: 'center',
  // },
});

export default Home;
