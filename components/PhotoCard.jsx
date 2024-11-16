// import { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, Image, Dimensions , ActivityIndicator, ImageBackground} from "react-native";
// import { icons } from "../constants";
// import { createBookmark, fetchComments} from "../lib/appwrite";
// import Waveform from "./Waveform";
// import PostOptions from "./PostOptions";
// import MenuComponent from "./MenuComponent";
// import { TouchableWithoutFeedback } from "react-native";
// import { Visibility } from "@mui/icons-material";
// import { BlurView } from "expo-blur";
// import CommentsSection from "./CommentsSection";
// import useAppwrite from "../lib/useAppwrite";
// import { combineTransition } from "react-native-reanimated";
// import Carousel from "react-native-reanimated-carousel";
// import { ResizeMode, Video } from "expo-av";

// const PhotoCard = ({ docId ,title, creator, avatar, photo, bookmark , titleRec, name,userID, data, video, thumbnail }) => {

//  const lenght = 1;

//  const [play, setPlay] = useState(false);
// //  const [focused, setFocus] = useState(bookmark);
//  const [videoDimensions, setVideoDimensions] = useState({ width: '100%', height: 200 });
// //  const [loading, setLoading] = useState(false);

//  const handleVideoLoad = (status) => {
//    if (status.isLoaded && status.naturalSize) {
//      const { width, height } = status.naturalSize;
//      const screenWidth = Dimensions.get('window').width * 0.9; // 90% of screen width
//      const aspectRatio = width / height;
//      let finalWidth = screenWidth;
//      let finalHeight = screenWidth / aspectRatio;

//      const maxHeight = 200;
//      if (finalHeight > maxHeight) {
//        finalHeight = maxHeight;
//        finalWidth = maxHeight * aspectRatio;
//      }

//      setVideoDimensions({ width: finalWidth, height: finalHeight });
//    }
//    setLoading(false);
//  };


//   const [focused, setFocus] = useState(bookmark);
//   const handlePress = () => {
//     setFocus((prevFocused) => !prevFocused);
//     createBookmark(docId , !focused);
//   };
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   const [loading, setLoading] = useState(true);
//   const [visible , setVisibility] = useState(false);

//   const carouselW = dimensions.width;
//   const carouselH = dimensions.height;



//   useEffect(() => {
//     Image.getSize(photo, (width, height) => {
//       // Calculate the maximum width and height of the container
//       const maxWidth = Dimensions.get('window').width*0.9; // 90% of the screen width
//       const maxHeight = Dimensions.get('window').height*0.9; // You can adjust this value as needed
//       // const new_height = height/1.5;
//       const new_height = height;
//       // Calculate the aspect ratio
//       // const aspectRatio = width / height;
//       const aspectRatio =  width/new_height;
//       // Determine the final width and height to fit inside the container while maintaining aspect ratio
//       let finalWidth = maxWidth;
//       let finalHeight = maxWidth / aspectRatio;

//       if (finalHeight > maxHeight) {
//         finalHeight = maxHeight;
//         finalWidth = maxHeight * aspectRatio;
//       }

//       setDimensions({ width: finalWidth, height: finalHeight });
//       setLoading(false);
//     }, (error) => {
//       console.log('Error loading image dimensions:', error);
//       setLoading(false);
//     });
//   }, [photo]);
// const onPress = () => {
//   setVisibility(false);
// }

// //fetching latest comments for the post 
// const { data: comments, refetch } = useAppwrite(fetchComments,docId );


//   return (
//     <TouchableWithoutFeedback onPress={onPress}>
//     <View className="flex flex-col items-center px-1 mb-5">
//       <View className="flex flex-row gap-3 items-start">
//         <View className="flex justify-center items-center flex-row flex-1">
//           <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
//             <Image
//               source={{ uri: avatar }}
//               className="w-full h-full rounded-lg"
//               resizeMode="cover"
//             />
//           </View>

//           <View className="flex justify-center flex-1 ml-3 gap-y-1">
//             <Text
//               className="font-psemibold text-sm text-white"
//               numberOfLines={1}
//             >
//               {creator}
//             </Text>
//             {title &&(
//             <Text
//               className="text-xs text-gray-100 font-pregular"
//               numberOfLines={1}
//             >
//               {title}
//             </Text>
//             )}
//           </View>
//         </View>

//         <View className="pt-2">
//               <MenuComponent onPress={visible}/> 
//         </View>
         
//       </View>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
// //       <ImageBackground
// //   source={{ uri: `${photo}` }}
// //   resizeMode="cover"
// //   style={{
// //     width: '100%',
// //     height: dimensions.height,
// //     borderRadius: 20,
// //     marginVertical: 12,
// //     alignItems: 'center',
// //     justifyContent: 'center'
// //   }}
// //   onError={(error) => console.log("Error loading image:", error)}
// // >
// //   <View
// //     style={{
// //       position: 'absolute',
// //       bottom: 0, // Aligns the BlurView at the bottom
// //       left: 0,
// //       right: 0,
// //       height: 45,
// //     }}
// //   >
// //     <BlurView
// //       style={{
// //         height: 45,
// //         // paddingHorizontal: 10,
// //         flex: 1,
// //         alignSelf: 'stretch', // Stretches to fill the width
// //         justifyContent: 'center' , 
        
// //       }}
// //     >
// //       <PostOptions docId={docId} bookmark={bookmark} username={name} userID={userID} refetch={refetch}/>
// //     </BlurView>
// //   </View>
// // </ImageBackground>

// <Carousel
// loop
// width={carouselW || Dimensions.get('screen').width}
// height={carouselH}
// data={[lenght]} // Assuming data is just a placeholder here
// scrollAnimationDuration={1000}
// onSnapToItem={(index) => console.log('current index:', index)}
// renderItem={({ item }) => {
//   // Conditional rendering for photo/video
//   if (photo) {
//     return (
//       <ImageBackground
//         source={{ uri: photo }}
//         resizeMode="cover"
//         style={{
//           width: '100%',
//           height: dimensions.height,
//           borderRadius: 20,
//           marginVertical: 12,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//         onError={(error) => console.log('Error loading image:', error)}
//       />
//     );
//   }
//   // Video rendering part (ensure `video` is available)
//   if (video) {
//     return (
//       <> 
//       {play ? (
//         loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           <Video
//             source={{ uri: video }}
//             style={{ width: '100%', height: 300, borderRadius: 20, marginTop: 12 }}
//             resizeMode={ResizeMode.CONTAIN}
//             useNativeControls
//             shouldPlay
//             onLoad={handleVideoLoad}
//             onPlaybackStatusUpdate={(status) => {
//               if (status.didJustFinish) {
//                 setPlay(false);
//               }
//             }}
//           />
//         )
//       ) : (
//         <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={() => {
//             setPlay(true);
//             setLoading(true);
//           }}
//           className="w-full h-80 rounded-xl mt-2 relative flex justify-center items-center"
//         >
//           <Image
//             source={{ uri: thumbnail }}
//             style={{ width: '100%', height: 300, borderRadius: 20, marginTop: 12 }}
//             resizeMode="cover"
//           />

//           <Image
//             source={icons.play}
//             className="w-12 h-12 absolute"
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       )}
//       </>
//     );
//   }
//   return null; // Fallback if no photo/video
// }}
// />
// )}
// <View
//     style={{
//       position: 'absolute',
//       bottom: '5%', // Aligns the BlurView at the bottom
//       left: 0,
//       right: 0,
//       height: 45,
//       // backgroundColor:'yellow'
//     }}
//   >
//     <BlurView
//       style={{
//         height: 45,
//         // paddingHorizontal: 10,
//         flex: 1,
//         alignSelf: 'stretch', // Stretches to fill the width
//         justifyContent: 'center' , 
        
//       }}
//     >
//       <PostOptions docId={docId} bookmark={bookmark} username={name} userID={userID} refetch={refetch}/>
//     </BlurView>
//   </View>
  
//     {/* to play recording */}
//     { titleRec && (
//         <View style={{ backgroundColor:'transparent' , hieght: 40 , width: '100%'}}>
//         <Waveform recordingUri={titleRec} nodelete={true}/>
//       </View>
//         )}
//    {/* comments sections */}
//    <CommentsSection postID={docId} userID={userID} avatar={avatar} username={name} comments={comments} refetch={refetch}/>
//    </View>
//     </TouchableWithoutFeedback>

  
//   );
// };

// export default PhotoCard;


import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator, ImageBackground } from "react-native";
import { createBookmark, fetchComments } from "../lib/appwrite";
import Waveform from "./Waveform";
import PostOptions from "./PostOptions";
import MenuComponent from "./MenuComponent";
import { TouchableWithoutFeedback } from "react-native";
import { BlurView } from "expo-blur";
import CommentsSection from "./CommentsSection";
import useAppwrite from "../lib/useAppwrite";
import { ResizeMode, Video } from "expo-av";
import Carousel from "react-native-reanimated-carousel";
import { icons } from "../constants";

const PhotoCard = ({ docId, title, creator, avatar, photo, bookmark, titleRec, name, userID, video, thumbnail, posts }) => {
  const [play, setPlay] = useState(false);
  // const [videoDimensions, setVideoDimensions] = useState({ width: '100%', height: 200 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [visible, setVisibility] = useState(false);

  const handleVideoLoad = (status) => {
    if (status.isLoaded && status.naturalSize) {
      const { width, height } = status.naturalSize;
      const screenWidth = Dimensions.get('window').width * 0.9;
      const aspectRatio = width / height;
      let finalWidth = screenWidth;
      let finalHeight = screenWidth / aspectRatio;


      // const [loading, setLoading] = useState(false);
      const maxHeight = 200;
      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = maxHeight * aspectRatio;
      }

      setVideoDimensions({ width: finalWidth, height: finalHeight });
    }
    setLoading(false);
  };

  useEffect(() => {
    Image.getSize(photo, (width, height) => {
      const maxWidth = Dimensions.get('window').width * 0.9;
      const maxHeight = Dimensions.get('window').height * 0.9;
      const aspectRatio = width / height;
      let finalWidth = maxWidth;
      let finalHeight = maxWidth / aspectRatio;

      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = maxHeight * aspectRatio;
      }

      setDimensions({ width: finalWidth, height: finalHeight });
      setLoading(false);
    }, (error) => {
      console.log('Error loading image dimensions:', error);
      setLoading(false);
    });
  }, [photo]);

  useEffect(() => {
    Image.getSize(thumbnail, (width, height) => {
      const maxWidth = Dimensions.get('window').width * 0.9;
      const maxHeight = Dimensions.get('window').height * 0.9;
      const aspectRatio = width / height;
      let finalWidth = maxWidth;
      let finalHeight = maxWidth / aspectRatio;

      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = maxHeight * aspectRatio;
      }

      setDimensions({ width: finalWidth, height: finalHeight });
      setLoading(false);
    }, (error) => {
      console.log('Error loading image dimensions:', error);
      setLoading(false);
    });
  }, [thumbnail]);

  const { data: comments, refetch } = useAppwrite(fetchComments, docId);

  const onPress = () => {
    setVisibility(false);
  };
  // alert(video)
 return (
  <>
    <TouchableWithoutFeedback onPress={onPress}>
      <View className="flex flex-col items-center px-1 mb-1">
        <View className="flex flex-row gap-3 items-start">
          <View className="flex justify-center items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
              <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
            </View>

            <View className="flex justify-center flex-1 ml-3 gap-y-1">
              <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
                {creator}
              </Text>
              {title && (
                <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                  {title}
                </Text>
              )}
            </View>
          </View>

          <View className="pt-2">
            <MenuComponent onPress={visible} />
          </View>
        </View>

        {loading ? (
          <View style={{ height:dimensions.height , width:'100%', alignItems:'center', justifyContent:'center'}}> 
          <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <Carousel
          loop
          enabled={false} //this will change when each post will have multiple docs     
          width={Dimensions.get('window').width*0.9}
          snapEnabled
          style={{ alignItems:'center', justifyContent:'center'}}
          height={dimensions.height*0.9}
          data={posts} // Placeholder data for the carousel item
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => {
            // Conditional rendering for photo/video
            if (photo) {
              return (
                <ImageBackground
                  source={{ uri: photo }}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: dimensions.height,
                    borderRadius: 20,
                    marginVertical: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onError={(error) => console.log('Error loading image:', error)}
                />
              );
            } else if (video) {
              return (
            <>
                  {play ? (
                    loading ? (
                      <View style={{ height: dimensions.height , width:'100%', alignItems:'center', justifyContent:'center'}}> 
                      <ActivityIndicator size="large" color="#0000ff" />
                      </View>
                    ) : (
                      <Video
                        source={{ uri: video }}
                        style={{ width: '100%', height:dimensions.height}}
                        resizeMode={ResizeMode.CONTAIN}
                        // resizeMode={ResizeMode.COVER}
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
                      // className="w-full h-80 rounded-xl mt-2 relative flex justify-center items-center"
                      // className="w-full h-100 rounded-xl  relative flex justify-center items-center"
                      style={{ width: '100%', height:100 , position:'relative', flex: 1 , justifyContent:'center' , alignItems:'center'}}
                    >
                      <Image
                        source={{ uri: thumbnail }}
                        style={{ width: '100%', height: 500 }}
                        resizeMode="cover"
                      />
                      <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
             </>
             
              );
            }
            return null; // Fallback if neither photo nor video
          }}
        />
        )}
<View style={{   
   position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%', flexDirection:'column', justifyContent:'center', alignItems:'center', flex:1}}> 
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 45,
          }}
        >
          <BlurView
            style={{
              height: 45,
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}
          >
            <PostOptions docId={docId} bookmark={bookmark} username={name} userID={userID} refetch={refetch} />
          </BlurView>
        {/* </View> */}

        {/* Recording section */}
        {titleRec && (
          <View style={{ backgroundColor: 'transparent', height: 40, width: '100%' }}>
            <Waveform recordingUri={titleRec} nodelete={true} />
          </View>
        )}

        </View>
           {/* Comments sections */}
        {/* <CommentsSection postID={docId} userID={userID} avatar={avatar} username={name} comments={comments} refetch={refetch} /> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
<View style={{ top:0, left:0, bottom:0, marginBottom:10, marginHorizontal:5}}> 
     <CommentsSection postID={docId} userID={userID} avatar={avatar} username={name} comments={comments} refetch={refetch} />
     </View>
    </>
  );
};

export default PhotoCard;

