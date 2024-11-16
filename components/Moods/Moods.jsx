
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Alert } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
const moodsData = [
  // { id: '1', lottie: require('../../assets/lottie/happy.json'), mood: 'Happy' },
  { id: '1', lottie: require('../../assets/lottie/sunny.json'), mood: 'Happy' },
  { id: '2', lottie: require('../../assets/lottie/sad.json'), mood: 'Sad' },
  { id: '3', lottie: require('../../assets/lottie/angry.json'), mood: 'Angry' },
  { id: '4', lottie: require('../../assets/lottie/relax.json'), mood: 'Relaxed' },
  { id: '5', lottie: require('../../assets/lottie/excited.json'), mood: 'Excited' },
];

const Moods = ({ onClose}) => {
  const showAlert = (mood) => {
    Alert.alert(
        "Mood Selected",
        `You selected: ${mood}`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") },
          { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
        ],
        { cancelable: true }
        
      );
      onClose();

  
  };

  const renderMoodItem = ({ item  }) => (
    <TouchableOpacity onPress={() => showAlert(item.mood)} style={styles.moodItem}>
      <View>
        <LottieView
          autoPlay
          loop
          style={styles.lottieStyle}
          source={item.lottie}
        />
        <Text style={styles.moodText}>{item.mood}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ 
      backgroundColor: 'transparent' , 
      // backgroundColor:'red',
    height: '40%',
    width:'100%'
    }}> 
        <Text style={{ textAlign:'center' , color: '#bfdbfe'}}>How are you feeling today?</Text>
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        {/* <Ionicons name="close" size={19} color="white" /> */}
        <AntDesign name="close" size={19} color="white" />
      </TouchableOpacity>
      <FlatList
        data={moodsData}
        renderItem={renderMoodItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: '100%',
    height: '30%', 
    backgroundColor: '#374151',
    borderRadius: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#818cf8',
    position: 'relative', // To position the close button
  },
  moodItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    backgroundColor: 'transparent',   
  },
  lottieStyle: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    
  },
  moodText: {
    marginTop: 1,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',  // Ensure the button is positioned absolutely
    right: '1.5%',
    backgroundColor: 'gray',
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: '#c4b5fd',
    // padding: 5,            // Add padding to make the button bigger
    width: 20,
    height:20,
    alignContent: 'center',
    justifyContent: 'center',
    top:'10%'
  },
});

export default Moods;

