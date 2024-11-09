import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

const Messages = () => {

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
        // Add more messages as needed
      ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.vibeItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.faceCard }} resizeMode="cover" style={styles.avatar} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <TouchableOpacity style={styles.messageContainer} onPress={() => handlePressMessage(item.textMessage)}>
          <Text style={styles.textMessage}>
            {item.textMessage.length > 70 ? `${item.textMessage.substring(0, 70)}...` : item.textMessage}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item.newMessages}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
<SafeAreaView className="bg-black h-full">
   <StatusBar translucent backgroundColor="transparent" />
   <View style={{ marginTop: '10%'}}> 
   <Text className="text-lg font-pregular text-gray-100 mb-3 ml-4">
               Messages
              </Text>
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatListContent}
      style={styles.flatList}
    />
    </View>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: 'black',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  vibeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: '#333',
    marginHorizontal: '2%',
    borderRadius: 10,
    marginBottom: 5,
    height: 100,
    borderWidth: 1,
  },
  avatarContainer: {
    height: 75,
    width: 75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff9c01',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  usernameContainer: {
    backgroundColor: 'black',
    bottom: 45,
    position: 'absolute',
  },
  username: {
    color: 'white',
    fontSize: 16,
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
    backgroundColor: '#ff9c01',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft:10,
    height:30,
    width:30
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Messages;
