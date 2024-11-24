import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EmojiPicker from 'react-native-emoji-selector';




// Define the reactions
const reactions = [
    { id: '1', lottie: require('../assets/lottie/happy.json'), mood: 'Happy' },
    { id: '2', lottie: require('../assets/lottie/sad.json'), mood: 'Sad' },
    { id: '3', lottie: require('../assets/lottie/angry.json'), mood: 'Angry' },
    { id: '4', lottie: require('../assets/lottie/relax.json'), mood: 'Relaxed' },
    { id: '5', lottie: require('../assets/lottie/excited.json'), mood: 'Excited' },
];

const CommentReaction = ({ onSelectReaction, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-200)).current;  // Slide from the right
  const [selectedReaction, setSelectedReaction] = useState(null);

  // Trigger the slide animation
  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0, // Slide to the center
      useNativeDriver: true,
    }).start();
  }, []);

  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
    onSelectReaction(reaction); // Send the selected reaction back to the parent
  };

  const[show, setShow] = useState(false);

  const handleEmoji = () => {
    setShow(true);
    alert("hii")
  }
  

  return (<View style={{ flexDirection:'column'}}>
  <Animated.View style={[styles.reactionContainer, { transform: [{ translateX: slideAnim }] }]}>
  <View style={{ flex: 1, alignItems: 'center' }}>
  <FontAwesome5 name="laugh-squint" size={20} color="gold" />
  </View>
  <View style={{ flex: 1, alignItems: 'center' }}>
  <FontAwesome6 name="angry" size={20} color="red" />
  </View>
  <View style={{ flex: 1, alignItems: 'center' }}>
  <FontAwesome5 name="grin-hearts" size={20} color="mediumvioletred" />
  </View>
  <View style={{ flex: 1, alignItems: 'center' }}>
  <MaterialIcons name="heart-broken" size={20} color="fuchsia" />
  </View>
  <View style={{ flex: 1, alignItems: 'center' }}>
  <Ionicons name="heart-half" size={20} color="deeppink" />
  </View>
  <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={handleEmoji}>
  <MaterialIcons name="add-reaction" size={20} color="cyan" />
  </TouchableOpacity>
    </Animated.View>
    {show && 
    <EmojiPicker height={800} width={400}  />
}
</View>
  );
};

const styles = StyleSheet.create({
  reactionContainer: {
    width: 250,
    backgroundColor:'#374151',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width:'100%', 
    borderRadius:10,
    height:30
  },
  reactionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'gray',
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: '#c4b5fd',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommentReaction;
