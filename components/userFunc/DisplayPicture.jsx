
// import React, { useState, useEffect } from 'react';
// import { View, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StyleSheet, Text, Dimensions } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Video } from 'expo-av';
// import { icons } from "../../constants";
// import InfoBox from '../InfoBox';
// import EvilIcons from '@expo/vector-icons/EvilIcons';
// import { createdisplayPicture } from '../../lib/appwrite';

// const DisplayPicture = ({ avatar, username, userID, logout, displayPicUrl, type: initialType, bio }) => {
//   const [displayIsPicture, setDisplayPicture] = useState(initialType == null ?('https://i.pinimg.com/564x/8f/b9/99/8fb99928f76b2bbf838357b542931bce.jpg' ): (displayPicUrl))
//   const [newMedia, setNewMedia] = useState(null);
  
//   const [uploadConfirmed, setUploadConfirmed] = useState(false);
//   const [mediaType, setMediaType] = useState(initialType || 'image');
//   const[imageObject , setNewImageObject] = useState(null);
//   const [isUploading, setIsUploading] = useState(false); // State to track if the media is uploading
 
//   const openImagePicker = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [7, 9],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setNewMedia(result.assets[0].uri); // Show selected image immediately
//       setNewImageObject(result.assets[0]);
//       setMediaType(result.assets[0].type);
//     }
//   };
 
//    // Effect to update mediaType based on newMedia
//    useEffect(() => {
//     if (newMedia) {
//       // Extract media type from URI or file object
//       const mediaTypeFromUri = newMedia.endsWith('.mp4') ? 'video' : 'image';
//       setMediaType(mediaTypeFromUri);
//     }
//   }, [newMedia]);

//   useEffect(() => {
//     const handleUpload = async () => {
//       if (newMedia && uploadConfirmed) {
//         setIsUploading(true); // Show loader
//         const {newDisplayPicUrl, mediaTypeNew} = await createdisplayPicture(userID,imageObject, imageObject.type );
//         if (newDisplayPicUrl) setDisplayPicture(newDisplayPicUrl);
//         setMediaType(mediaTypeNew);

//         setIsUploading(false); // Hide loader
//         setUploadConfirmed(false);
//         setNewMedia(null); // Clear temporary media
       
//       }
//     };

//     handleUpload();
//   }, [uploadConfirmed]); // Effect runs only when `uploadConfirmed` changes
 
//   return (
//     <View style={{ paddingBottom: 5, borderWidth: 7, borderRadius: 10, height:Dimensions.get('screen').height/2 }}>
//       {mediaType === 'video' ? (
//         <View style={{ position: 'relative', width: '100%', height: Dimensions.get('screen').height/2, borderRadius: 10 }}>
//           <Video
//             source={{ uri: newMedia || displayIsPicture || displayPicUrl}}
//             style={{ width: '100%', height: '100%', borderRadius: 10 }}
//             resizeMode="cover"
//             shouldPlay
//             isLooping
//           />

//           <View style={styles.overlay}>
//             <TouchableOpacity onPress={logout} style={styles.logoutButton}>
//               <Image source={icons.logout} resizeMode="contain" style={{ width: 24, height: 24 }} />
//             </TouchableOpacity>

//             <View style={styles.avatarContainer}>
//               <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
//             </View>

//             <InfoBox title={username} containerStyles="mt-5" titleStyles="text-lg" />
//             <View style={{ alignItems: 'center', zIndex: 999 , position: 'static', flexWrap: 'wrap', width: '99%', paddingTop: 10, paddingHorizontal:'10%'}}>
//               <Text>{bio}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'srrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</Text>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <ImageBackground
//           source={{ uri: newMedia || displayIsPicture || displayPicUrl}} // Show the selected image or the current one
//           style={{ width: '100%', height: Dimensions.get('screen').height/2, borderRadius: 10 }}
//           resizeMode="cover"
//         >
//           <View className="w-full flex justify-center items-center mt-10 mb-12 px-4">
//             <TouchableOpacity
//               onPress={logout}
//               className="flex w-full items-end mb-10"
//             >
//               <Image
//                 source={icons.logout}
//                 resizeMode="contain"
//                 className="w-6 h-6"
//               />
//             </TouchableOpacity>

//             <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center mt-10">
//               <Image
//                 source={{ uri: avatar }}
//                 className="w-[90%] h-[90%] rounded-lg"
//                 resizeMode="cover"
//               />
//             </View>

//             <InfoBox
//               title={username}
//               containerStyles="mt-5"
//               titleStyles="text-lg"
//             />
//           </View>
//         </ImageBackground>

//       )}

//       <TouchableOpacity style={{ marginLeft: '85%' , zIndex: 999}} onPress={openImagePicker}>
//         <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#818cf8', alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
//           <EvilIcons name="pencil" size={25} color="black" />
//         </View>
//       </TouchableOpacity>

//       {newMedia && !uploadConfirmed && (
//         <View style={{ alignItems: 'center' }}>
//           <TouchableOpacity style={styles.uploadButton} onPress={() => setUploadConfirmed(true)}>
//             <Text style={styles.uploadButtonText}>
//               {mediaType === 'video' ? 'Upload Video' : 'Upload Image'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {isUploading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="#818cf8" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   logoutButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//   },
//   avatarContainer: {
//     width: 64,
//     height: 64,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ff9c01',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
    
//   },
//   avatar: {
//     width: '90%',
//     height: '90%',
//     borderRadius: 10,
//   },
//   uploadButton: {
//     backgroundColor: '#818cf8',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loaderContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default DisplayPicture;


import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ImageBackground, ActivityIndicator, StyleSheet, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { icons } from "../../constants";
import InfoBox from '../InfoBox';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { createdisplayPicture } from '../../lib/appwrite';

const DisplayPicture = ({ avatar, username, userID, logout, displayPicUrl, type: initialType, bio }) => {
  const [displayIsPicture, setDisplayPicture] = useState(initialType == null ? 'https://i.pinimg.com/564x/8f/b9/99/8fb99928f76b2bbf838357b542931bce.jpg' : (displayPicUrl));
  const [newMedia, setNewMedia] = useState(null);
  const [uploadConfirmed, setUploadConfirmed] = useState(false);
  const [mediaType, setMediaType] = useState(initialType || 'image');
  const [imageObject, setNewImageObject] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [7, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setNewMedia(result.assets[0].uri);
      setNewImageObject(result.assets[0]);
      setMediaType(result.assets[0].type);
    }
  };

  useEffect(() => {
    if (newMedia) {
      const mediaTypeFromUri = newMedia.endsWith('.mp4') ? 'video' : 'image';
      setMediaType(mediaTypeFromUri);
    }
  }, [newMedia]);

  useEffect(() => {
    const handleUpload = async () => {
      if (newMedia && uploadConfirmed) {
        setIsUploading(true);
        const { newDisplayPicUrl, mediaTypeNew } = await createdisplayPicture(userID, imageObject, imageObject.type);
        if (newDisplayPicUrl) setDisplayPicture(newDisplayPicUrl);
        setMediaType(mediaTypeNew);

        setIsUploading(false);
        setUploadConfirmed(false);
        setNewMedia(null);
      }
    };

    handleUpload();
  }, [uploadConfirmed]);

  return (
    <View style={{ paddingBottom: 5, borderRadius: 10, height:Dimensions.get('screen').height/2, marginHorizontal:10}}>
      {mediaType === 'video' ? (
        <View style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 10 }}>
          <Video
            source={{ uri: newMedia || displayIsPicture || displayPicUrl }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            resizeMode="cover"
            shouldPlay
            isLooping
          />

          <View style={styles.overlay}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image source={icons.logout} resizeMode="contain" style={{ width: 24, height: 24 }} />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
            </View>

            <InfoBox title={username} containerStyles="mt-5" titleStyles="text-lg" />

            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>{bio}</Text>
            </View>
          </View>
        </View>
      ) : (
        <ImageBackground
          source={{ uri: newMedia || displayIsPicture || displayPicUrl }}
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image source={icons.logout} resizeMode="contain" style={{ width: 24, height: 24 }} />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
            </View>

            <InfoBox title={username} containerStyles="mt-5" titleStyles="text-lg" />

            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>{bio}</Text>
            </View>
          </View>
        </ImageBackground>
      )}

      <TouchableOpacity style={{ marginLeft: '85%', zIndex: 999 }} onPress={openImagePicker}>
        <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#818cf8', alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
          <EvilIcons name="pencil" size={25} color="black" />
        </View>
      </TouchableOpacity>

      {newMedia && !uploadConfirmed && (
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => setUploadConfirmed(true)}>
            <Text style={styles.uploadButtonText}>
              {mediaType === 'video' ? 'Upload Video' : 'Upload Image'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isUploading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#818cf8" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  avatarContainer: {
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
  bioContainer: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignItems: 'center',
    zIndex: 999,
  },
  bioText: {
    color: 'white',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#818cf8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayPicture;
