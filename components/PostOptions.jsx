import React, { useState, useRef, useEffect, } from "react";
import { View, Text, TouchableOpacity, Image, Animated, TextInput, Platform, Modal, KeyboardAvoidingView,BackHandler, StyleSheet, Dimensions, FlatList, StatusBar, SafeAreaView } from "react-native";
import { icons } from "../constants";
import { createBookmark } from "../lib/appwrite";
import LottieView from 'lottie-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const PostOptions = ({ docId, bookmark }) => {
  const [selectedLottie, setSelectedLottie] = useState(require('../assets/lottie/happy.json'));
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocus] = useState(bookmark);
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMarginTop, setModalMarginTop] = useState('130%');
  const [shareMarginTop, setShareModalMarginTop] = useState('50%');
  const textInputRef = useRef(null);
  const [textInputValue, setTextInputValue] = useState('');
  const [messageInputValue, messagesetTextInputValue] = useState('');
  const [searchInputValue, searchsetTextInputValue] = useState('');
  const [shareVisible ,setShareModalVisible] = useState(false);
  const [sendStates, setSendStates] = useState({});

  const lotties = [
    { id: '1', source: require('../assets/lottie/love.json') },
    { id: '2', source: require('../assets/lottie/thubsup.json') },
    { id: '3', source: require('../assets/lottie/angry.json') },
    { id: '4', source: require('../assets/lottie/relax.json') },
    { id: '5', source: require('../assets/lottie/specs.json') },
    { id: '6', source: require('../assets/lottie/happy.json') },
  ];


  const messages = [
    {
      id: '1',
      username: 'JohnDoe',
      textMessage: 'Hey, how are you doing today? It’s been a while since we last talked.',
      faceCard: 'https://randomuser.me/api/portraits/men/1.jpg',
      newMessages: 3,
    },
    {
      id: '2',
      username: 'JaneSmith',
      textMessage: 'Just wanted to check in and see if everything is okay.',
      faceCard: 'https://randomuser.me/api/portraits/women/2.jpg',
      newMessages: 1,
    },
    {
      id: '3',
      username: 'AlexBrown',
      textMessage: 'Are we still on for the meeting tomorrow?',
      faceCard: 'https://randomuser.me/api/portraits/men/3.jpg',
      newMessages: 2,
    },
    {
      id: '4',
      username: 'AlexBrown',
      textMessage: 'Are we still on for the meeting tomorrow?',
      faceCard: 'https://randomuser.me/api/portraits/men/3.jpg',
      newMessages: 2,
    },
    {
      id: '5',
      username: 'AlexBrown',
      textMessage: 'Are we still on for the meeting tomorrow?',
      faceCard: 'https://randomuser.me/api/portraits/men/3.jpg',
      newMessages: 2,
    },
    {
      id: '6',
      username: 'AlexBrown',
      textMessage: 'Are we still on for the meeting tomorrow?',
      faceCard: 'https://randomuser.me/api/portraits/men/3.jpg',
      newMessages: 2,
    },
    {
      id: '7',
      username: 'AlexBrown',
      textMessage: 'Are we still on for the meeting tomorrow?',
      faceCard: 'https://randomuser.me/api/portraits/men/3.jpg',
      newMessages: 2,
    },
    // Add more messages as needed
  ];

  const handleSendPress = (id) => {
    // Toggle the send state for the specific message
    setSendStates((prevSendStates) => ({
      ...prevSendStates,
      [id]: !prevSendStates[id], // Toggle between true and false for the clicked item
    }));
  };

// const renderItem = ({ item }) => (


// <View style={styles.vibeItem}>
//   <View style={styles.avatarContainer}>
//     <Image source={{ uri: item.faceCard }} resizeMode="cover" style={styles.avatar} />
//   </View>
//   <View style={{ flex: 1 }}>
//     <View style={styles.usernameContainer}>
//       <Text style={styles.username}>{item.username}</Text>
//     </View>
//   </View>
// <TouchableOpacity
//   style={[
//     styles.badgeContainer, 
//     { backgroundColor: send ? '#ff9c01' : '#818cf8' } // Apply the conditional color
//   ]}
//   onPress={() => setSend(!send)} // Toggle the state
// >
//   <Text style={styles.badgeText}>Send</Text>
// </TouchableOpacity>
// </View>
// );

const renderItem = ({ item }) => {
  const send = sendStates[item.id]; // Get the send state for this specific item
  return (
    <View style={styles.vibeItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.faceCard }} resizeMode="cover" style={styles.avatar} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.badgeContainer, { backgroundColor: send ? "#ff9c01" : "#818cf8" }]} // Change background color based on send state
        onPress={() => handleSendPress(item.id)}
      >
        {send ? (<Text style={[ styles.badgeContainer,{ width: 65 ,backgroundColor: "#ff9c01" ,  fontWeight: 'bold',
    fontSize: 14,  }]}>Unsend</Text>) : (<Text style={styles.badgeText}>Send</Text>) }
      </TouchableOpacity>
    </View>
  );
};


  const onLottieClick = (item) => {
    setSelectedLottie(item.source);
    setShowPicker(false);
  };


  const handleClose =() => {
    setModalVisible(!modalVisible);
    setModalMarginTop('130%');
    setTextInputValue('');

  }
  
    const handleInputChange = (text) => {
    setTextInputValue(text); // Update state with the current input value
  };

  const handleShareInputChange = (text) => {
    searchsetTextInputValue(text); // Update state with the current input value
  };

  const handleMessageInputChange = (text) => {
    messagesetTextInputValue(text); // Update state with the current input value
  };
  const handleLike = () => {
    setShowPicker(!showPicker);
    if (showPicker) {
      hidePicker();
    } else {
      showPickerAnim();
    }
  };


  const handleShareClose = () => {
  setShareModalVisible(!shareVisible);
  searchsetTextInputValue('');
  messagesetTextInputValue('');
  }
  const handlePress = () => {
    setFocus((prevFocused) => !prevFocused);
    createBookmark(docId, !focused);
  };

  const handleComment = () => {
        setModalVisible(true);
      };
    
      const handleShare = () => {
        // setFocus((prevFocused) => !prevFocused);
          setShareModalVisible(true);
          // setModalMarginTop('90%'); // Reset modal marginTop
      
      
      };

      const handleSent = () => {
        console.log('Submitted Text:', textInputValue); // Log the final submitted value
        setModalVisible(!modalVisible);
        setModalMarginTop('130%');
        // Additional logic to handle the submission
      };
    
  const handleSubmit = () => {
    console.log('Submitted Text:', textInputValue); // Log the final submitted value
    setModalVisible(!modalVisible);
    setModalMarginTop('130%');
    // Additional logic to handle the submission
  };
  const showPickerAnim = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hidePicker = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleTextInputFocus = () => {
    setModalMarginTop('40%');
  };

  const handleShareTextInputFocus = () => {
    setShareModalMarginTop('40%');
  };
  const handleMessageTextInputFocus = () => {
    setShareModalMarginTop('30%');
  };

  const renderMoodItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => onLottieClick(item)}
      style={{ marginRight: 10, marginLeft: 2 }}
    >
      <LottieView
        source={item.source}
        autoPlay
        loop
        style={{ width: 40, height: 40 }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ 
      flexDirection: 'row',
      backgroundColor: 'transparent', 
      width: Dimensions.get('window').width,
      alignItems: 'center',
      paddingHorizontal: '5%'
    }}>
      <TouchableOpacity onPress={handleLike}>
        <LottieView
          source={selectedLottie}
          autoPlay
          loop
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleComment} style={{ marginHorizontal: 5 }}>
        <LottieView
          source={require('../assets/lottie/comment_1.json')}
          autoPlay
          loop
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShare} style={{ marginHorizontal: 5 }}>
        <LottieView
          source={require('../assets/lottie/send_4.json')}
          autoPlay
          loop
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePress} style={{ marginLeft: '50%' }}>
        <Image
          source={icons.bookmark}
          tintColor={focused ? '#818cf8' : 'white'}
          style={{ width: 24, height: '100%' }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Animated.View style={{
        position: 'absolute',
        right: '40%',
        transform: [{ translateY: slideAnim }],
        top: -50,
        zIndex: 1,
      }}>
        {/* {showPicker && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'  , 
          backgroundColor: 'pink',
          width:'85%',
          height: 50,
          marginLeft:'41%',
          borderRadius:10,
          }}>             
        <FlatList
        data={lotties}
        renderItem={renderMoodItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
        </View>
        )} */}

{showPicker && (
  <View style={{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    // backgroundColor: 'pink',
    backgroundColor: '#334155',
    width: '100%',
    height: 50,
    marginLeft: '35%',
    borderRadius: 10,
    flex: 1, // Make this view take up remaining space to allow scrolling
    borderWidth:1,
    borderColor: '#7561fd'
  }}>             
    <FlatList
      data={lotties}
      renderItem={renderMoodItem}
      keyExtractor={(item) => item.id}
      // horizontal
      scrollEnabled={true}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }} // Add padding if needed
    />
</View>
)}
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={[styles.modalViewComment, { marginTop: modalMarginTop }]}>
            <View style={{ flexDirection: 'row'}}> 
            <Text style={styles.modalText}>Add a Comment</Text>
            <TouchableOpacity style={{ left: '250%'}} onPress={handleClose}> 
            <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
            </View>
            <View style={[styles.input, { height: 140 , padding: 10}]}>
            <TextInput
              ref={textInputRef}
              // style={[styles.input, { height: 140}]}
              placeholder="Type your comment"
              onFocus={handleTextInputFocus}
              value={textInputValue}
              onChangeText={handleInputChange}
              placeholderTextColor="gray"
              multiline={true}
            />
             </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => handleClose()}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity> */}
          </View>
        </Modal>
      </KeyboardAvoidingView>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={shareVisible}
          onRequestClose={() => {
            setShareModalVisible(!shareVisible);
          }}
        >
          <View style={[styles.modalView, { marginTop: shareMarginTop , flex: 1 }]}>
            <View style={{ flexDirection: 'row'}}> 
            <Text style={styles.modalText}>share</Text>
            <TouchableOpacity style={{ left: '400%'}} onPress={handleShareClose}> 
            <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
            </View>

            <TextInput
              ref={textInputRef}
              style={styles.inputMessage}
              placeholder="Write your message here"
              onFocus={handleMessageTextInputFocus}
              value={messageInputValue}
              onChangeText={handleMessageInputChange}
              placeholderTextColor="white"
            
            />

            <TextInput
              ref={textInputRef}
              style={[styles.input , {height:40 }]}
              placeholder="Search"
              onFocus={handleShareTextInputFocus}
              value={searchInputValue}
              onChangeText={handleShareInputChange}
              placeholderTextColor="white"
            />

<View style={{ width: '100%' , flex: 1}}>
   <View> 
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatListContent}
      style={styles.flatList}
      showsVerticalScrollIndicator
    />
    </View>
     </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 5,
    height: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    opacity: 1,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 20,
   
  },
  modalViewComment: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 5,
    height: 270,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    opacity: 1,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 20,
   
  },
  input: {
    height: 60,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
   borderRadius:10,
  },
  
  button: {
    backgroundColor: '#818cf8',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize:15
  },

  flatList: {
    backgroundColor: '#1e293b',
    width: '100%',
    marginHorizontal: 10,
    alignSelf: 'center',
    borderRadius:10,
  },
  flatListContent: {
    paddingBottom: 20,
    // backgroundColor: 'pink',
    width: '100%',

  },
  vibeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // borderBottomColor: '#333',
    marginHorizontal: '2%',
    borderRadius: 10,
    marginBottom: 5,
    height: 70,
  borderBottomWidth:1
  
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff9c01',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  usernameContainer: {
   position: 'absolute',
   alignSelf: 'flex-start'
  },
  username: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  messageContainer: {
    paddingTop: 10,
  },
  textMessage: {
    fontSize: 12,
    color: 'gray',
  },
  badgeContainer: {
    // backgroundColor: '#ff9c01',
    backgroundColor: '#818cf8',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft:10,
    height:30,
    width:50
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputMessage: {
    height: 30,
    width: '100%',
    borderColor: 'gray',
    // borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
   borderRadius:10,
  },
});

export default PostOptions;



