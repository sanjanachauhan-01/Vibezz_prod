import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, RefreshControl, ImageBackground } from "react-native";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox,} from "../../components";
import { renderItem } from "../../components/RenderFunctions";
import { useState } from "react";
import DisplayPicture from "../../components/userFunc/DisplayPicture";
import { StatusBar } from "expo-status-bar";


const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts , refetch } = useAppwrite(()=>getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false);
   
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/signin");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
    <StatusBar translucent backgroundColor='transparent' />
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => renderItem({ item })} 
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this profile"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => (
        <>
         
      {/* <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/1b/e8/de/1be8de9d3605465045e9ffec498ab968.jpg' }}
        style={{ paddingBottom: 10 , borderWidth: 7,}}
        resizeMode="cover"
      > */}
            {/* <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                onPress={logout}
                className="flex w-full items-end mb-10"
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
          
              <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center mt-10">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>
           
              <InfoBox
                title={user?.username}
                containerStyles="mt-5"
                titleStyles="text-lg"
              />
            </View>
        
          
           </ImageBackground> */}
           <DisplayPicture  avatar={user?.avatar} 
           username={user?.username}
           userID={user?.accountId}
           displayPicUrl={user?.displayPicture}
           type={user?.displayPictureType}
           bio={user?.bio}
           logout={logout}
              />
       

          <View className="mt-5 flex flex-row justify-center pb-5">
            <InfoBox
              title={posts.length || 0}
              subtitle="Moments"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <InfoBox
              title="1.2k"
              subtitle="Vibing"
              titleStyles="text-xl"
            />
          </View>
        </>
      )}
    />
  </SafeAreaView>
  );
};

export default Profile;