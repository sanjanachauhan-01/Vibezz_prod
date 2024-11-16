import { View, Text } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const MoodSticker = ({ onClick, mood }) => {
  // Place the hook logic inside the component function
  return (
    <View
      style={{
        height: 30,
        width: 100,
        backgroundColor: 'transparent',
        borderWidth: 0.9,
        borderRightWidth: 0,
        borderColor: 'gray',
        marginTop: 2,
        position: 'absolute',
        top: '15%',
        right: -10,
        borderTopLeftRadius: 5,
      }}
    >
      
        <TouchableOpacity onPress={onClick} >
                <BlurView style={{ width: '100%' , height:'100%' , borderTopLeftRadius:5}}>
         <Text className="font-psemibold text-lg text-white pl-1"
          > 
            #Moods
            </Text>
            </BlurView>
        </TouchableOpacity>
     
    </View>
  );
};

export default MoodSticker;
