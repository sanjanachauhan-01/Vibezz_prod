import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch, Alert, Dimensions } from 'react-native';
import React, { useState, useCallback } from 'react';
import { CustomButton, FormField } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ResizeMode, Video } from "expo-av";
import { createPost } from "../../lib/appwrite";
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [isVideo, seTisVideo] = useState(false);
  const [videoCard, setVideoCard] = useState(false);
  const [uploadPost, setUploadPost] = useState(true);
  const [isPhoto, setIsPhoto] = useState(false);
 console.log(isVideo);
  const [form, setForm] = useState({
    title: "",
    titleRec: null,
    video: null,
    thumbnail: null,
    prompt: "",
    photo: null,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useFocusEffect(
    useCallback(() => {
      // Reset all states when the screen is focused
      setUploading(false);
      seTisVideo(false);
      setVideoCard(false);
      setUploadPost(true);
      setIsPhoto(false);
      setForm({
        title: "",
        titleRec: null,
        video: null,
        thumbnail: null,
        prompt: "",
        photo: null,
      });
      setIsEnabled(false);
    }, [])
  );

  const getFileSize = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileSizeInBytes = fileInfo.size;
      const fileSizeInKB = fileSizeInBytes / 1024;
      return fileSizeInKB;
    } catch (error) {
      console.error('Error getting file size:', error);
      return null;
    }
  };

  const getAssetDimensions = async (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(uri, (width, height) => {
        resolve({ width, height });
      }, (error) => {
        reject(error);
      });
    });
  };

  const openPicker = async () => {
    setUploadPost(false);
    const mediaType = ImagePicker.MediaTypeOptions.All;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType,
      // mediaTypes: ImagePicker.MediaTypeOptions.All, // Allows both images and videos
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      console.log("MY ASSET", asset);

      if (asset) {
        if (asset.type === "video") {
          setVideoCard(true);
        } else if (asset.type === "image" && !isVideo) {
          setIsPhoto(true);
        }

        if (!asset.fileName) {
          if (asset.type === "image") {
            asset.fileName = `image_${Date.now()}.jpg`;
          } else {
            asset.fileName = `video_${Date.now()}.mp4`;
          }
        }

        if (!asset.fileSize) {
          const file_size = await getFileSize(asset.uri);
          if (file_size) {
            asset.fileSize = file_size;
            if (file_size > 5 * 1024) {
              Alert.alert("File size exceeds 5 MB limit. Please choose a smaller file.");
              return;
            }
          } else {
            Alert.alert("Unable to determine file size. Please try again.");
            return;
          }
        }

        const { width, height } = await getAssetDimensions(asset.uri);
        asset.width = width;
        asset.height = height;

        if (asset.type === "image" && isVideo) {
          setForm({
            ...form,
            thumbnail: asset,
          });
        } else if (asset.type === "video") {
          seTisVideo(true);
          setForm({
            ...form,
            video: asset,
          });
        }

        if (asset.type === "image" && !isVideo) {
          setForm({
            ...form,
            photo: asset,
          });
        }
      }
    }
  };

  const submit = async () => {
    if (isVideo) {
      if (!form.video || !form.thumbnail) return Alert.alert("Please provide all fields");
    

    setUploading(true);
    try {
      await createPost({
        ...form,
        userId: user.$id,
        postType: "video",
      });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        titleRec: null,
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  } else {
    setUploading(true);
    try {
      await createPost({
        ...form,
        userId: user.$id,
        postType: "Photo",
      });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        titleRec: null,
        video: null,
        thumbnail: null,
        prompt: "",
       photo: null
      });
      setUploading(false);
    }


  }
}

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-9">
        <Text className="text-2xl text-white font-psemibold">Upload Post</Text>
        <FormField
          title="Title"
          value={form.title}
          placeholder="Type or Record"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
          record={true}
          onRecordingComplete={(uri) => setForm({ ...form, titleRec: uri })}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Post
          </Text>
          {uploadPost ? (
            <TouchableOpacity onPress={() => openPicker()}>
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => openPicker()}>
              {form.video ? (
                <Video
                  source={{ uri: form.video?.uri }}
                  style={{ width: form.video?.width, height: form.video?.height }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                isPhoto && form.photo && (
                  <Image
                    source={{ uri: form.photo?.uri }}
                    style={{ width: '100%', aspectRatio: form.photo.width / form.photo.height, borderRadius: 10, borderColor: '#ff9001', borderWidth: 1, marginBottom: 15 }}
                    resizeMode="contain"
                    onError={(error) => console.log("Error loading image:", error)}
                  />
                )
              )}
            </TouchableOpacity>
          )}
        </View>
        {isVideo &&
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">Add a thumbnail</Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail?.uri }}
                  style={{ width: '100%', aspectRatio: form.thumbnail.width / form.thumbnail.height }}
                  resizeMode="contain"
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        }

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text className="text-base text-gray-100 font-pmedium">Private Post</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#818cf8' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5, paddingLeft: 5 }}>
          <Text style={{ color: 'gray', fontSize: 12 }}> Add people to the Private Party</Text>
          <Entypo name="plus" size={24} color="white" />
        </View>
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
