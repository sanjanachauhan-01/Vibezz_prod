// import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch, Alert, Dimensions } from 'react-native';
// import React, { useState, useCallback } from 'react';
// import { CustomButton, FormField } from '../../components';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { icons } from '../../constants';
// import { Entypo } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import { ResizeMode, Video } from "expo-av";
// import { createPost } from "../../lib/appwrite";
// import { useFocusEffect } from '@react-navigation/native';
// import { router } from "expo-router";

// const Create = () => {
//   const { user } = useGlobalContext();
//   const [uploading, setUploading] = useState(false);
//   const [isVideo, seTisVideo] = useState(false);
//   const [videoCard, setVideoCard] = useState(false);
//   const [uploadPost, setUploadPost] = useState(true);
//   const [isPhoto, setIsPhoto] = useState(false);
//  console.log(isVideo);
//   const [form, setForm] = useState({
//     title: "",
//     titleRec: null,
//     video: null,
//     thumbnail: null,
//     prompt: "",
//     photo: null,
//   });

//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   useFocusEffect(
//     useCallback(() => {
//       // Reset all states when the screen is focused
//       setUploading(false);
//       seTisVideo(false);
//       setVideoCard(false);
//       setUploadPost(true);
//       setIsPhoto(false);
//       setForm({
//         title: "",
//         titleRec: null,
//         video: null,
//         thumbnail: null,
//         prompt: "",
//         photo: null,
//       });
//       setIsEnabled(false);
//     }, [])
//   );

//   const getFileSize = async (uri) => {
//     try {
//       const fileInfo = await FileSystem.getInfoAsync(uri);
//       const fileSizeInBytes = fileInfo.size;
//       const fileSizeInKB = fileSizeInBytes / 1024;
//       return fileSizeInKB;
//     } catch (error) {
//       console.error('Error getting file size:', error);
//       return null;
//     }
//   };

//   const getAssetDimensions = async (uri) => {
//     return new Promise((resolve, reject) => {
//       Image.getSize(uri, (width, height) => {
//         resolve({ width, height });
//       }, (error) => {
//         reject(error);
//       });
//     });
//   };

//   const openPicker = async () => {
//     // setUploadPost(false);
//     const mediaType = ImagePicker.MediaTypeOptions.All;

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: mediaType,
//       // mediaTypes: ImagePicker.MediaTypeOptions.All, // Allows both images and videos
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setUploadPost(false);
//       const asset = result.assets[0];
//       console.log("MY ASSET", asset);

//       if (asset) {
//         if (asset.type === "video") {
//           setVideoCard(true);
//         } else if (asset.type === "image" && !isVideo) {
//           setIsPhoto(true);
//         }

//         if (!asset.fileName) {
//           if (asset.type === "image") {
//             asset.fileName = `image_${Date.now()}.jpg`;
//           } else {
//             asset.fileName = `video_${Date.now()}.mp4`;
//           }
//         }

//         if (!asset.fileSize) {
//           const file_size = await getFileSize(asset.uri);
//           if (file_size) {
//             asset.fileSize = file_size;
//             if (file_size > 5 * 1024) {
//               Alert.alert("File size exceeds 5 MB limit. Please choose a smaller file.");
//               return;
//             }
//           } else {
//             Alert.alert("Unable to determine file size. Please try again.");
//             return;
//           }
//         }

//         const { width, height } = await getAssetDimensions(asset.uri);
//         asset.width = width;
//         asset.height = height;

//         if (asset.type === "image" && isVideo) {
//           setForm({
//             ...form,
//             thumbnail: asset,
//           });
//         } else if (asset.type === "video") {
//           seTisVideo(true);
//           setForm({
//             ...form,
//             video: asset,
//           });
//         }

//         if (asset.type === "image" && !isVideo) {
//           setForm({
//             ...form,
//             photo: asset,
//           });
//         }
//       }
//     }
//   };

//   const submit = async () => {
//     if (isVideo) {
//       if (!form.video || !form.thumbnail) return Alert.alert("Please provide all fields");
    

//     setUploading(true);
//     try {
//       await createPost({
//         ...form,
//         userId: user.$id,
//         postType: "video",
//       });
//       Alert.alert("Success", "Post uploaded successfully");
//       router.push("/home");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setForm({
//         title: "",
//         titleRec: null,
//         video: null,
//         thumbnail: null,
//         prompt: "",
//       });
//       setUploading(false);
//     }
//   } else {
//     setUploading(true);
//     try {
//       const result =  await createPost({
//         ...form,
//         userId: user.$id,
//         postType: "Photo",
//       });
//       alert(result);
//       Alert.alert("Success", "Post uploaded successfully");
//       router.push("/home");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setForm({
//         title: "",
//         titleRec: null,
//         video: null,
//         thumbnail: null,
//         prompt: "",
//        photo: null
//       });
//       setUploading(false);
//     }


//   }
// }

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <ScrollView className="px-4 my-9">
//         <Text className="text-2xl text-white font-psemibold">Upload Post</Text>
//         <FormField
//           title="Title"
//           value={form.title}
//           placeholder="Type or Record"
//           handleChangeText={(e) => setForm({ ...form, title: e })}
//           otherStyles="mt-10"
//           record={true}
//           onRecordingComplete={(uri) => setForm({ ...form, titleRec: uri })}
//         />
//         <View className="mt-7 space-y-2">
//           <Text className="text-base text-gray-100 font-pmedium">
//             Upload Post
//           </Text>
//           {uploadPost && !isPhoto && !isVideo ? (
//             <TouchableOpacity onPress={() => openPicker()}>
//               <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
//                 <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
//                   <Image
//                     source={icons.upload}
//                     resizeMode="contain"
//                     alt="upload"
//                     className="w-1/2 h-1/2"
//                   />
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity onPress={() => openPicker()}>
//               {form.video ? (
//                 <Video
//                   source={{ uri: form.video?.uri }}
//                   style={{ width: form.video?.width, height: form.video?.height }}
//                   useNativeControls
//                   resizeMode={ResizeMode.COVER}
//                   isLooping
//                 />
//               ) : (
//                 isPhoto && form.photo && (
//                   <Image
//                     source={{ uri: form.photo?.uri }}
//                     style={{ width: '100%', aspectRatio: form.photo.width / form.photo.height, borderRadius: 10, borderColor: '#ff9001', borderWidth: 1, marginBottom: 15 }}
//                     resizeMode="contain"
//                     onError={(error) => console.log("Error loading image:", error)}
//                   />
//                 )
//               )}
//             </TouchableOpacity>
//           )}
//         </View>
//         {isVideo &&
//           <View className="mt-7 space-y-2">
//             <Text className="text-base text-gray-100 font-pmedium">Add a thumbnail</Text>
//             <TouchableOpacity onPress={() => openPicker("image")}>
//               {form.thumbnail ? (
//                 <Image
//                   source={{ uri: form.thumbnail?.uri }}
//                   style={{ width: '100%', aspectRatio: form.thumbnail.width / form.thumbnail.height }}
//                   resizeMode="contain"
//                   className="w-full h-64 rounded-2xl"
//                 />
//               ) : (
//                 <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
//                   <Image
//                     source={icons.upload}
//                     resizeMode="contain"
//                     alt="upload"
//                     className="w-5 h-5"
//                   />
//                   <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>
//         }

//         <FormField
//           title="AI Prompt"
//           value={form.prompt}
//           placeholder="The AI prompt of your video...."
//           handleChangeText={(e) => setForm({ ...form, prompt: e })}
//           otherStyles="mt-7"
//         />
//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Text className="text-base text-gray-100 font-pmedium">Private Post</Text>
//           <Switch
//             trackColor={{ false: '#767577', true: '#818cf8' }}
//             thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
//             ios_backgroundColor="#3e3e3e"
//             onValueChange={toggleSwitch}
//             value={isEnabled}
//           />
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5, paddingLeft: 5 }}>
//           <Text style={{ color: 'gray', fontSize: 12 }}> Add people to the Private Party</Text>
//           <Entypo name="plus" size={24} color="white" />
//         </View>
//         <CustomButton
//           title="Submit & Publish"
//           handlePress={submit}
//           containerStyles="mt-7"
//           isLoading={uploading}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Create;


import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch, Alert, Dimensions, StyleSheet } from 'react-native';
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
import { router, useNavigation } from "expo-router";
import { FlatList } from 'react-native-gesture-handler';
import { TimeToLeave } from '@mui/icons-material';
import { BlurView } from 'expo-blur';
import PostOptions from '../../components/PostOptions';
import Waveform from '../../components/Waveform';
import MenuComponent from '../../components/MenuComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';




const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [isVideo, seTisVideo] = useState(false);
  const [videoCard, setVideoCard] = useState(false);
  const [uploadPost, setUploadPost] = useState(true);
  const [isPhoto, setIsPhoto] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [media, setMedia] = useState([]);
  const [form, setForm] = useState({
    title: "",
    titleRec: null,
    thumbnail: null,
    prompt: "",
    post: [],
    privatePost: null,
  });
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const handleShowPreview = () => setPreviewVisible(true);
  const handleClosePreview = () => setPreviewVisible(false);
  // const [showAIbutton, setShowAIbutton] = useState(false);


  // const handleTitle = (e) => {
  //   setShowAIbutton(true);
  //   setForm({ ...form, title: e })
  // }
  // console.log(user)
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
    thumbnail: null,
    prompt: "",
    post: [],
    privatePost: null,
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

  // const getAssetDimensions = async (uri) => {
  //   return new Promise((resolve, reject) => {
  //     Image.getSize(uri, (width, height) => {
  //       resolve({ width, height });
  //     }, (error) => {
  //       reject(error);
  //     });
  //   });
  // };
 

  const openPicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow images and videos
      allowsMultipleSelection: true, // Currently, Expo doesn't natively support multiple selections
    });
  
    if (!result.canceled) {
      const selectedMedia = result.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
      }));
  
      setMedia([...media, ...selectedMedia]); // Add new media to existing media state
    }
    // console.log(media)
  };


    // Function to handle delete
    const handleDeletepost = (uri) => {
      setMedia(prevMedia => prevMedia.filter(item => item.uri !== uri)); // Remove the media with the matching URI
      // setPreviewVisible(false); // Hide preview
    };

    const handleDeleteMedia = () => {
      setMedia([]); // Clear the entire media array
      setPreviewVisible(false); // Hide preview
    };



  const renderItem = ({ item }) => {
    return (
      <View style={styles.mediaItem}>
        {item.type.startsWith('image') ? (
          <Image source={{ uri: item.uri }} style={styles.media} />
        ) : (
          <View style={styles.videoPlaceholder}>
            <Video
            source={{ uri: item.uri }}
            style={styles.media}
            resizeMode={ResizeMode.CONTAIN} // Choose the resize mode you prefer
            useNativeControls={true} // This will add play/pause buttons, etc.
            isLooping
            />
          </View>
        )}
      </View>
    );
  };
  

const ShowPreview = ({ media, closePreview, title, titleRec, username }) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        height: '100%',
        width: '100%',
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* FlatList for media preview */}
      <FlatList
        data={media}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          // height: screenHeight , // Limit height to 80% of the screen
          // backgroundColor:'yellow',
        }}
        renderItem={({ item }) => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', gap: 3, alignItems: 'flex-start' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 0.9 }}>
                  <View style={{ width: 46, height: 46, borderRadius: 10, borderColor: '#ccc', borderWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <Image
                      source={{ uri: user.avatar }} // Example avatar URL
                      style={{ width: '100%', height: '100%', borderRadius: 10 }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10, gap: 5 }}>
                    <Text style={{ fontWeight: '600', color: 'white' }} numberOfLines={1}>
                      {username}
                    </Text>
                    {title && (
                      <Text style={{ fontSize: 12, color: '#ccc' }} numberOfLines={1}>
                        {title}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ paddingTop: 10 }}>
                  <MenuComponent onPress={() => {}} />
                </View>
              </View>
              {/* Image Preview */}
              {item.type.startsWith('image') ? (
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: screenWidth,
                  height: screenHeight * 0.6, // Limit the height of the image
                  resizeMode: 'contain',
                }}
              />
              ): (
                <Video
                source={{ uri: item.uri }}
                style={{
                  width: screenWidth,
                  height: screenHeight * 0.6, // Limit the height of the image
                  resizeMode: 'contain',
                }}
                resizeMode={ResizeMode.CONTAIN} // Choose the resize mode you prefer
                useNativeControls={true} // This will add play/pause buttons, etc.
                isLooping
                />
              )}
              {/* Bottom Action and Options */}
              <View style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop:10 }}>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 45 }}>
                  <BlurView
                    style={{
                      height: 45,
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                    }}
                  >
                    <PostOptions
                      docId={'xyx'}
                      bookmark={'none'}
                      username={username}
                      userID={'123'}
                    />
                  </BlurView>
                </View>
              </View>
            </View>
                    {/* Recording section */}
                    {titleRec && (
                  <View style={{ backgroundColor: 'transparent', height: 50, width: '100%' }}>
                    <Waveform recordingUri={titleRec} nodelete={true} />
                  </View>
                )}
          {/* </View> */}

<TouchableOpacity style={{   
  position: 'absolute',
    top: '90%',
    right: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
    }} onPress={()=> handleDeletepost(item.uri)}> 
    <Text style={{ color:'white', fontSize:10, paddingRight:10}} className="font-pthin">Delete this post?</Text>
    <AntDesign name="delete" size={20} color="red" />
    </TouchableOpacity>
    </View>
        )}
        ListEmptyComponent={
        <View style={{ alignContent:'center', alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity style={styles.addButton} onPress={() => openPicker()}>
        <Ionicons name="add-circle" size={40} color="#818cf8" />
      </TouchableOpacity>
          </View>
          }
      />
      
      <View
        style={{
          position: 'absolute',
          top: '5%',
          left: 20,
          // backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}>
  <Text style={{ color:'white', fontSize:25}} className="font-pmedium">Preview</Text> 
      </View>
    
      
      {/* Close Button */}
      <TouchableOpacity
        onPress={closePreview}
        style={{
          position: 'absolute',
          top: '10%',
          right: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 10,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Close</Text>
      </TouchableOpacity>

    
    </View>
  );
};



const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.addButton} onPress={() => openPicker()}>
        <Ionicons name="add-circle" size={40} color="#818cf8" />
      </TouchableOpacity>
    </View>
  );
  
//   const submit = async () => {
//     if (isVideo) {
//       if (!form.video || !form.thumbnail) return Alert.alert("Please provide all fields");
//     setUploading(true);
//     try {
//       await createPost({
//         ...form,
//         userId: user.$id,
//         postType: "video",
//       });
//       Alert.alert("Success", "Post uploaded successfully");
//       router.push("/home");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setForm({
//         title: "",
//         titleRec: null,
//         video: null,
//         thumbnail: null,
//         prompt: "",
//       });
//       setUploading(false);
//     }
//   } else {
//     setUploading(true);
//     try {
//       const result =  await createPost({
//         ...form,
//         userId: user.$id,
//         postType: "Photo",
//       });
//       alert(result);
//       Alert.alert("Success", "Post uploaded successfully");
//       router.push("/home");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setForm({
//         title: "",
//         titleRec: null,
//         video: null,
//         thumbnail: null,
//         prompt: "",
//        photo: null
//       });
//       setUploading(false);
//     }


//   }
// }

const submit = async () => {
  if (media.length > 0) {
    setForm((prev) => ({
      ...prev,
      post: [...media], // Assign media to post
    }));
  }
  console.log("Media submitted:", media); // Debug the media state

}
console.log(form)

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-9">
        <Text className="text-2xl text-white font-psemibold">Upload Post</Text>
        <FormField
          title="Title"
          value={form.title}
          placeholder="Type or Record"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          showAIbutton={true}
          otherStyles="mt-10"
          record={true}
          onRecordingComplete={(uri) => setForm({ ...form, titleRec: uri })}
        />
        {/* upload post image */}
        <View className="mt-7 space-y-2 mb-5">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Post
          </Text>
          {media.length === 0 ? (
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
                <Text style={{ color: 'white' , marginTop:10}}>Click to select</Text>
              </View>
             
            </TouchableOpacity>
          ) : (
           <View> 
            <FlatList
            data={media}
            keyExtractor={(item, index) => `${item.uri}-${index}`}
            renderItem={renderItem}
            horizontal
            style={styles.flatList}
            ListFooterComponent={renderFooter} // Add the footer here
          />
          <View style={{flexDirection:'row'}}> 
          <TouchableOpacity style={{ marginTop:10 , flexDirection:'row', paddingHorizontal:5, borderRadius:5}} className="bg-zinc-600" onPress={()=> setPreviewVisible(true)}> 
          <Text style={{ color:'white'}} className="font-pextralight">Preview</Text>
          <Text style={{ color:'#cbd5e1' , paddingLeft:5 , fontSize:10, paddingTop:4.5}}
          className="font-pextralight"
        > See how this post looks on your feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingTop:10, marginLeft:'15%'}} onPress={()=> handleDeleteMedia()}> 
          <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
          </View>
          </View>
          )}
        </View>
 {/* upload post image end */}

         {/* {isVideo &&
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
        }  */}

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
          // handlePres={checkingAllFileds}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
      {isPreviewVisible && (
  <ShowPreview media={media} closePreview={handleClosePreview} title={form.title} titleRec={form.titleRec!= null?  form.titleRec : false} username={user.username}/>
)}
    </SafeAreaView>
  );
};

export default Create;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  flatList: {
    flexGrow: 0,
  },
  mediaItem: {
    marginRight: 10,
  },
  media: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  videoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoText: {
    fontSize: 14,
    color: '#000',
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    marginRight: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  itemText: {
    color: 'white',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    // backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewButton: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  previewText: {
    color: 'gray',
    fontSize: 10,
    paddingLeft: 5,
    paddingTop: 4.5,
  },
});

