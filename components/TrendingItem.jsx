import { useEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import navigation
import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item , video, posts}) => {
  const [play, setPlay] = useState(false);
  const navigation = useNavigation(); // Access navigation

  const handleImagePress = (item) => {
    // alert(item)
    // console.log(video)
    if(!play){
      console.log(video)
    navigation.navigate('screens/LatestVideos' , {video , posts});
    }
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false); // Stop playing when the video finishes
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          // style={{ backgroundColor:'purple' }}
          activeOpacity={0.7}
          // onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          >
            {/* Touchable outside play button */}
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={handleImagePress}
            >
              {/* Empty pressable area to capture clicks outside the play button */}
            </TouchableOpacity>
          </ImageBackground>

          <TouchableOpacity
            onPress={() => setPlay(true)}
            style={{ position: 'absolute' }}
            activeOpacity={0.7}
          >
            <Image
              source={icons.play}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingItem;
