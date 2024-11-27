import React, { useState, useEffect, useRef,  } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { icons } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import Waveform from './Waveform';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { BorderRight } from '@mui/icons-material';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  record,
  showAIbutton,
  onRecordingComplete, // New prop for handling the recording URI
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [ showAI, setShowAI] = useState(false);
  const [message, setMessage] = useState('');

  const textInputRef = useRef(null);
  const [textInputValue, setTextInputValue] = useState('');
  
  const handleInputChange = (text) => {
    setMessage(text); // Update state with the current input value
  };
  const handleSend = () => {

    console.log("message");
  }

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission...');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording...');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording...');
    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecordingUri(uri);
    setIsRecording(false);
    setTimer(0);
    onRecordingComplete(uri); // Call the callback with the recording URI
    console.log('Recording stopped and stored at', uri);
  }

  const handleDeleteRecording = () => {
    setRecordingUri(null);
  };


  
  const HandleAIprompts = (value) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        height: screenHeight*0.80,
        width: screenWidth *0.90,
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius:20,
        flexWrap:'wrap'
      }}
    >
      <View style={{ top:15 , flexDirection:'row', justifyContent:'space-around', alignContent:'space-around'}}> 
      <View> 
      <Text style={{color:'white'}}>Enter your title</Text>
      <Text style={{ fontSize:10, color:'gray'}}> click the send button and choose from your desired titles</Text>
      </View>
      <TouchableOpacity
        onPress={() => setShowAI(false)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 5,
          borderRadius: 5,
          left:0
        }}
      >
        <AntDesign name="closecircleo" size={20} color="black" />
      </TouchableOpacity>
      </View>
      <View style={{ top:30 , borderRadius:20 , marginHorizontal:5}}> 
       <View style={[styles.container]}>
      <TextInput
         ref={textInputRef}
         style={styles.input}
         placeholder= { value ?  value :  "Type your title"}
        //  onFocus={handleTextInputFocus}
         value={textInputValue}
         onChangeText={handleInputChange}
         placeholderTextColor="white"
         multiline={true}
          
      />
      <TouchableOpacity style={{ height:24 , width:24, borderRadius:24}} onPress={handleSend}>
        {/* <Text style={styles.buttonText}>Send</Text> */}
        <Feather name="send" size={20} color="black" />
      </TouchableOpacity>
    </View>
      </View>
    </View>
  )
  }
  return (
    <View style={{ marginBottom: 16, ...otherStyles }}>
      <Text style={{ fontSize: 16, color: '#7B7B8B', marginBottom: 8 }}>{title}</Text>
      <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: '#000', 
          borderRadius: 10, 
          borderWidth: 2, 
          borderColor: '#7B7B8B',
          padding: 10
        }}>
        {!isRecording ? (
          <TextInput
            style={{ flex: 1, color: 'white', fontSize: 16 }}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
          />
        ) : (
          <Text style={{ flex: 1, color: '#818cf8', fontSize: 16 }}>
            {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}
          </Text>
        )}
        {title === "Password" && !isRecording && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

<View style={{ flexDirection:'row' , width:65, alignItems:'center', justifyContent:'center'}}>
{showAIbutton &&  value && (
  <TouchableOpacity style={{ paddingRight:40}} onPress={()=> setShowAI(true)}> 
  <MaterialCommunityIcons name="magic-staff" size={24} color="white" />
  </TouchableOpacity>
)}
        {record && (
          <>
            <TouchableOpacity 
              onPress={recording ? stopRecording : startRecording}
              style={{
                position: 'absolute',
                right: recordingUri ? 44 : 10, // Adjust position if recordingUri exists
                zIndex: 1
              }}
            >
              {!recordingUri && (
                <Ionicons
                  name={recording ? "stop-circle" : "mic-circle"}
                  size={24}
                  color="red"
                />
              )}
            </TouchableOpacity>
            {recordingUri && (
              <Waveform recordingUri={recordingUri} onDelete={handleDeleteRecording} />
            )}
          </>
        )}
     </View>
      </View>
      {showAI && ( <HandleAIprompts value={value}/> )}
    </View>

    
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    backgroundColor:'#7B7B8B',
    borderRadius:20
  },
  input: {
    flex:1,
    height: 30,
    color:'white'
    // borderColor: '#ccc',
    // borderWidth: 1,
    // borderRadius: 20,
    // paddingLeft: 10,
  },
  // button: {
  //   backgroundColor: '#007BFF',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 20,
  //   marginLeft: 10,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
});


         