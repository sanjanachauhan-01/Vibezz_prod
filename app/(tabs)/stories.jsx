import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, renderItem} from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import StoryComponent from "../../components/StoryComponent";
import { icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
const Stories = () => {
  const { user } = useGlobalContext();
  const { data: latestPosts, refetch } = useAppwrite(getLatestPosts, 'latest');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation(); // Access navigation


  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleImagePress = () => {
    // Navigate to the LatestVideos screen if clicked outside the play button
      navigation.navigate('screens/FrizzComponent');
  };


  const renderStoryItem = ({ item }) => (
    <TouchableOpacity onPress={handleImagePress}>
    <View style={{ width: 170, height: 200, borderRadius: 10, margin:5}}>
      <View style={{ position: 'absolute', top: 5, left: 5, zIndex: 1 }}>
        <Image source={icons.timer} style={{ width: 20, height: 20 , tintColor: 'white'}} />
      </View>
      <Image source={{ uri: item.thumbnail }} style={{ width: 170, height: 200, borderRadius: 10 }} />
    </View>
    </TouchableOpacity>
    
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161622" }}>
      <FlatList
        data={latestPosts}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Stories;
