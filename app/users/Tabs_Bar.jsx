






import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import BannerBoxAds from '../../components/Ads/BannerBoxAds';

const Tab = createMaterialTopTabNavigator();

const VibesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const vibesData = [
    { id: '1', username: 'Manasi Dande', faceCard: 'https://i.pinimg.com/736x/ca/a5/bc/caa5bc1aa8032ac67989423beac51db5.jpg', textMessage: "Hey there! I hope you're having a great day. I noticed we share some similar interests, and I thought it would be fun to connect. What's something exciting you've been up to lately?" },
    { id: '2', username: 'Surya Mehta', faceCard: 'https://i.pinimg.com/474x/11/6c/be/116cbeb65943b239050b252a4b88737f.jpg', textMessage: "Hey there! I hope you're having a great day. I noticed we share some similar interests, and I thought it would be fun to connect. What's something exciting you've been up to lately?" },
    { id: '3', username: 'Roshni Ahuja', faceCard: 'https://i.pinimg.com/474x/a0/9b/af/a09bafb0d92381851c837f868d40a3bc.jpg', textMessage: "Hey there! I hope you're having a great day. I noticed we share some similar interests, and I thought it would be fun to connect. What's something exciting you've been up to lately?" },
    { id: '4', username: 'Darshan Ahuja', faceCard: 'https://i.pinimg.com/474x/a6/29/90/a62990858d3439e5a7cad7096cbe7c0b.jpg', textMessage: "Hey there!! how are you doing? I am Darshan and can I share something w you" },
  ];

  const handlePressMessage = (message) => {
    setSelectedMessage(message);
    setModalVisible(true);
  };

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
      <TouchableOpacity style={styles.acceptButton}>
        <Feather name="check" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton}>
        <AntDesign name="close" size={20} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={vibesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        // ListFooterComponent={<Text style={styles.endText}>End of the list</Text>}
        ListFooterComponent={<BannerBoxAds/>}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.fullTextMessage}>{selectedMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const NotificationsScreen = () => {
  const notificationsData = [
    { id: '1', text: 'Notification 1' },
    { id: '2', text: 'Notification 2' },
    { id: '3', text: 'Notification 3' },
    { id: '4', text: 'Notification 4' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={notificationsData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.flatList}
      contentContainerStyle={styles.flatListContent}
      ListFooterComponent={<Text style={styles.endText}>Banner Ad</Text>}
    />
  );
};

const Tabs_Bar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: '#818cf8',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: '#818cf8' },
      }}
    >
      <Tab.Screen name="Vibes" component={VibesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
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
    // borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginHorizontal: '2%',
    borderRadius: 10,
    marginBottom: 5,
    height: 100,
    borderWidth:1,
    
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
  acceptButton: {
    backgroundColor: '#86efac',
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButton: {
    backgroundColor: "#fca5a5",
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    borderRadius: 5,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginHorizontal: '1%',
    borderRadius: 10,
    marginBottom: 5,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
  },
  endText: {
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    borderWidth:1,
    borderColor: '#818cf8'
  },
  fullTextMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  closeModalButton: {
    backgroundColor: '#818cf8',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4f46e5'
  },
  closeModalText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Tabs_Bar;
