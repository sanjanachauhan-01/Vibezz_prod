import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions , ActivityIndicator} from "react-native";
import { icons } from "../constants";
import { createBookmark} from "../lib/appwrite";
import Waveform from "./Waveform";
import PostOptions from "./PostOptions";

const PhotoCard = ({ docId ,title, creator, avatar, photo, bookmark , titleRec , height }) => {
  const [focused, setFocus] = useState(bookmark);
  const handlePress = () => {
    setFocus((prevFocused) => !prevFocused);
    createBookmark(docId , !focused);
  };
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Image.getSize(photo, (width, height) => {
      // Calculate the maximum width and height of the container
      const maxWidth = Dimensions.get('window').width*0.9; // 90% of the screen width
      const maxHeight = Dimensions.get('window').height*0.9; // You can adjust this value as needed

      // Calculate the aspect ratio
      const aspectRatio = width / height;

      // Determine the final width and height to fit inside the container while maintaining aspect ratio
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
  

  return (
    <View className="flex flex-col items-center px-4 mb-5">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
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
      
          {/* <Image
              source={{ uri: `${photo}`}}
              resizeMode="cover"
              className="w-full h-64 rounded-2xl my-3"
              //  style={{ width: '100%', height: `${height}` }} // Use the passed height
        // className="rounded-2xl my-3"
              onError={(error) => console.log("Error loading image:", error)}
          /> */}


      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Image
          source={{ uri: `${photo}` }}
          resizeMode="cover"
          style={{ width: dimensions.width, height: dimensions.height, borderRadius: 20, marginVertical: 12 }}
          onError={(error) => console.log("Error loading image:", error)}
        />
      )}
  
    {/* <TouchableOpacity style={{ marginLeft: '90%'}} onPress={()=> handlePress()}> 
        <Image  source={icons.bookmark} 
         tintColor={focused ? '#818cf8' : 'white'} className="w-5 h-5" resizeMode="contain" />
    </TouchableOpacity> */}
    <View style={{ justifyContent: 'center' , alignItems: 'center' ,
        backgroundColor: 'transparent' , width: '100%' , marginTop: 10 , 
        height: 45}}>
       <PostOptions docId={docId} bookmark={bookmark}/>
        </View>
    

    {/* to play recording */}
    { titleRec && (
        <View style={{ backgroundColor: white , hieght: 40 , width: 200}}>
          <Waveform recordingUri={titleRec} onDelete={handleDeleteRecording} />
        </View>
        )}
    
    </View>
  );
};

export default PhotoCard;

