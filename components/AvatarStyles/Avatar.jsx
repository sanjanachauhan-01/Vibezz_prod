import { View, Text, Image, StyleSheet
 } from 'react-native'
import React from 'react'

const Avatar = ({uri, typeofScreen}) => {
  return (
    <View style={styles.avatarContainer}>
              <Image source={{ uri: uri }} style={styles.avatar} resizeMode="cover" />
            </View>
  )
}
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
      width: 60,
      height: 60,
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
export default Avatar