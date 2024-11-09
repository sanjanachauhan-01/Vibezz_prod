

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, ActivityIndicator, Modal, StatusBar, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { checkIfAlreadyRequested, getUserPosts, vibeRequest, withdrawRequest } from '../../lib/appwrite';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap , TabBar} from 'react-native-tab-view';
import SwipeUpButton from '../../components/SwipeUpButton';
import * as Haptics from 'expo-haptics';
import { InfoBox, VideoCard } from '../../components';
import PhotoCard from '../../components/PhotoCard';
import { Video } from 'expo-av';
import Avatar from '../../components/AvatarStyles/Avatar';
import useAppwrite from '../../lib/useAppwrite';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { renderSearchPosts, renderSearchVideos } from '../../components/RenderFunctions';

const SearchUser = () => {
  const route = useRoute();
  const { user: userReq } = route.params;
  const [posts, setPosts] = useState([]);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useGlobalContext();
  const [index, setIndex] = useState(0);
  const [displayIsPicture , setDisplayPicture] = useState('https://i.pinimg.com/564x/8f/b9/99/8fb99928f76b2bbf838357b542931bce.jpg');
  const [mediaType, setMediaType] = useState(null);
  var height = Dimensions.get('screen').height;
  var width = Dimensions.get('screen').width;
  //fetch function to get the posts of the UserReq. and send that list to the photocard and videoCard.
  const { data: userReqposts , refetch } = useAppwrite(()=>getUserPosts(userReq.$id));
  console.log("USER REQ" , userReqposts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  
  const [routes] = useState([
    { key: 'pictures', title: 'Pictures' },
    { key: 'videos', title: 'Videos' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor:'black',}} // Change this to your desired color
      labelStyle={{ color: 'white' }} // Change this to your desired color
    />
  );

  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const fetchFollowRequestStatus = async () => {
    const requested = await checkIfAlreadyRequested(user.accountId, userReq.accountId);
    setAlreadyRequested(requested);
  };
  const fetchdisplay = async () => {
    if (userReq.displayPicture) {
      console.log("user appwrite pic" ,userReq.displayPicture );
      setDisplayPicture(userReq.displayPicture);
    }
   
  };

  const checkUserDisplayPictureType = async () => {
    if(userReq.displayPictureType == 'image'){
      setMediaType('image');
    }else{
      setMediaType('video');
    }
  }

  useEffect(() => {
    checkUserDisplayPictureType();
    fetchdisplay ();
    fetchFollowRequestStatus();
  }, [user, userReq]);

  const requestToFollow = async (user, userReq) => {
    Haptics.selectionAsync();
    setLoading(true);
    try {
      const response = await vibeRequest(user, userReq);
      if (response) {
        console.log("RESPONSE", response);
        setAlreadyRequested(true);
      }
    } catch (error) {
      console.error("Error sending follow request", error);
    } finally {
      setLoading(false);
    }
  };

  const onCancelRequest = async (userId, userReqId) => {
    try {
      const response = await withdrawRequest(userId, userReqId);
      if (response) {
        console.log("WITHDRAWN", response);
        setAlreadyRequested(false);
      }
    } catch (error) {
      console.error("Error withdrawing follow request", error);
    }
  };

  const onSwipeUp = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const renderScene = SceneMap({
    pictures: () => (
      <SafeAreaView className="bg-black h-full">
        <View style={{ marginTop:15}}> 
<FlatList
      data={userReqposts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => renderSearchPosts({ item })} 
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this profile"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // ListHeaderComponent={() => ()}
        />
        </View>
        </SafeAreaView>
    ),
    videos: () => (
      <SafeAreaView className="bg-black h-full">
         <View style={{ marginTop:15}}> 
        <FlatList
      data={userReqposts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => renderSearchVideos({ item })} 
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this profile"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // ListHeaderComponent={() => ()}
        />
        </View>
        </SafeAreaView>
      
    )
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' />
      {mediaType == 'image' ? (
      <ImageBackground
        // source={{ uri: 'https://i.pinimg.com/736x/1b/e8/de/1be8de9d3605465045e9ffec498ab968.jpg' }}
        source={{ uri: `${displayIsPicture}`}}
        style={styles.imageBackground}
        resizeMode="cover"
      >

        <View style={styles.overlay} />
        <View style={{ flexDirection: 'row', paddingLeft: 5, marginTop: height/20 }}>
        <Avatar uri={userReq.avatar}/>
         <InfoBox title={userReq.username} containerStyles="mt-1 ml-2" />
         {/* titleStyles="text-lg" */}
        <View style={styles.vibingContainer}>
          <Text style={styles.vibing}>1.2k</Text>
        </View>
        </View>
        {/* Bio */}
        <View style={{ marginTop:Dimensions.get('window').height/3, top: Dimensions.get('window').height/3  , marginHorizontal: Dimensions.get('window').width / 25 }}>
         {userReq.bio ? (
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{truncateText(`${userReq.bio}`, 50)}</Text>
         ): (
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}></Text>
         )}
        </View>

        {/* Vibezz button */}
        {/* {user.accountId !== userReq.accountId && (
          <View style={{ marginHorizontal: 10 }}>
            {!alreadyRequested ? (
              <TouchableOpacity onPress={() => requestToFollow(user, userReq)} disabled={loading}>
                <View style={[styles.vibezButtonStyle, { backgroundColor: loading ? 'gray' : '#818cf8' }]}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                      Vibe
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{
                height: 50,
                width: Dimensions.get('window').width * 0.9,
                backgroundColor: 'green',
                opacity: 0.8,
                top: Dimensions.get('window').height * 0.4,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  Buzzed
                </Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => onCancelRequest(user.accountId, userReq.accountId)}>
                  <MaterialIcons name="cancel" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )} */}

        {/* Swipe Up Button */}
        {/* {userReq && (
          <SwipeUpButton onSwipeUp={onSwipeUp} onClose={onClose} isModalVisible={isModalVisible} />
        )} */}

        {/* Modal for Pictures and Videos */}
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    />
          </View>
        </Modal> */}
      </ImageBackground>
      ): (
        <View style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 10 }}>
        <Video
        source={{ uri:  `${displayIsPicture}` }}
        style={{ width: '100%', height: '100%', borderRadius: 10 }}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
     {/* <View style={styles.overlay} /> */}
        
        <View style={{ zIndex: 2, position: 'absolute', top: 0, left: 0,}}>
          <View style={{  flexDirection: 'row', paddingLeft: 5, marginTop: height/20 }}> 
        <Avatar uri={userReq.avatar}/>
         <InfoBox title={userReq.username} containerStyles="mt-1 ml-2" /> 
      <View style={styles.vibingContainer}>
          <Text style={styles.vibing}>1.2k</Text>
        </View>
        </View>
        {/* Bio */}
        <View style={{ top: height * 0.29, marginHorizontal: width / 25 }}>
         {userReq.bio ? (
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>{truncateText(`${userReq.bio}`, 50)}</Text>
         ): (
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}></Text>
         )}
        </View>
        </View>

        {/* Vibezz button */}
        {/* {user.accountId !== userReq.accountId && (
          <View style={{ marginHorizontal: 10 }}>
            {!alreadyRequested ? (
              <TouchableOpacity onPress={() => requestToFollow(user, userReq)} disabled={loading}>
                <View style={[styles.vibezButtonStyle, { backgroundColor: loading ? 'gray' : '#818cf8' }]}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                      Vibe
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{
                height: 50,
                width: Dimensions.get('window').width * 0.9,
                backgroundColor: 'green',
                opacity: 0.8,
                top: Dimensions.get('window').height * 0.4,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  Buzzed
                </Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => onCancelRequest(user.accountId, userReq.accountId)}>
                  <MaterialIcons name="cancel" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )} */}
        
        {/* Swipe Up Button */}
        {/* {userReq && (
          <SwipeUpButton onSwipeUp={onSwipeUp} onClose={onClose} isModalVisible={isModalVisible} />
        )} */}

        {/* Modal for Pictures and Videos */}
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    />
          </View>
        </Modal> */}
      </View> 
     
      )}
      {/* Vibezz button */}
      <View style={{ zIndex: 2, position: 'absolute', top: '53%', left: 0,}}> 
       {user.accountId !== userReq.accountId && (
          <View style={{ marginHorizontal: 10 }}>
            {!alreadyRequested ? (
              <TouchableOpacity onPress={() => requestToFollow(user, userReq)} disabled={loading}>
                <View style={[styles.vibezButtonStyle, { backgroundColor: loading ? 'gray' : '#818cf8' }]}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                      Vibe
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{
                height: 50,
                width: Dimensions.get('window').width * 0.9,
                backgroundColor: 'green',
                opacity: 0.8,
                top: Dimensions.get('window').height * 0.4,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  Buzzed
                </Text>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => onCancelRequest(user.accountId, userReq.accountId)}>
                  <MaterialIcons name="cancel" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )} 

        {/* Swipe Up Button */}
        {userReq && ( 
          <View style={{ marginHorizontal: '50%', marginTop: '88%'}}> 
          <SwipeUpButton onSwipeUp={onSwipeUp} onClose={onClose} isModalVisible={isModalVisible} />
          </View>
        )}

        {/* Modal for Pictures and Videos */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    />
          </View>
        </Modal> 
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageBackground: {
    flex: 1,
    borderRadius: 10,
    // justifyContent: 'center',
    alignItems: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fill the entire parent view
  },
  avatarContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 25,
    left: Dimensions.get('window').width / 25,
    width: 64,
    height: 64,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff9c01',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: '90%',
      height: '90%',
      borderRadius: 10,
  },
  usernameContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 25,
    left: Dimensions.get('window').width / 4.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  username: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  vibingContainer: {
    position: 'absolute',
    // top:  Dimensions.get('window').height  / 22,
    left:  Dimensions.get('window').width  / 5,
    backgroundColor: 'rgba(60, 237, 240, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop:25
  },
  vibing: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  vibezButtonStyle: {
    height: 50,
    width: Dimensions.get('window').width * 0.93,
    opacity: 0.8,
    top: Dimensions.get('window').height * 0.36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginHorizontal: Dimensions.get('window').width * 0.005,
    borderWidth: 2,
    borderColor: '#ff9c01',
  },
});

export default SearchUser;