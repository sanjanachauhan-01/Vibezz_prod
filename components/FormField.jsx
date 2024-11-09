import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { icons } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import Waveform from './Waveform';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  record,
  onRecordingComplete, // New prop for handling the recording URI
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

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
  );
};

export default FormField;
