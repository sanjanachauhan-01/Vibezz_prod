import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../constants";
import Waveform from "./Waveform";
import PostOptions from "./PostOptions";

const VideoCard = ({ docId, title, creator, avatar, thumbnail, video, bookmark, titleRec }) => {
  const [play, setPlay] = useState(false);
  const [focused, setFocus] = useState(bookmark);
  const [videoDimensions, setVideoDimensions] = useState({ width: '100%', height: 200 });
  const [loading, setLoading] = useState(false);

  const handleVideoLoad = (status) => {
    if (status.isLoaded && status.naturalSize) {
      const { width, height } = status.naturalSize;
      const screenWidth = Dimensions.get('window').width * 0.9; // 90% of screen width
      const aspectRatio = width / height;
      let finalWidth = screenWidth;
      let finalHeight = screenWidth / aspectRatio;

      const maxHeight = 200;
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = maxHeight * aspectRatio;
      }

      setVideoDimensions({ width: finalWidth, height: finalHeight });
    }
    setLoading(false);
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <TouchableOpacity>
              <Image
                source={{ uri: avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {creator}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Video
            source={{ uri: video }}
            style={{ width: videoDimensions.width, height: videoDimensions.height, borderRadius: 20, marginTop: 12 }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onLoad={handleVideoLoad}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        )
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
            setLoading(true);
          }}
          className="w-full h-80 rounded-xl mt-2 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            style={{ width: videoDimensions.width, height: videoDimensions.height, borderRadius: 20, marginTop: 12 }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', width: '100%', marginTop: 10, height: 45 }}>
        <PostOptions docId={docId} bookmark={bookmark} />
      </View>

      {titleRec && (
        <View style={{ height: 40, width: "100%" }}>
          <Waveform recordingUri={titleRec} nodelete={true} />
        </View>
      )}
    </View>
  );
};

export default VideoCard;
