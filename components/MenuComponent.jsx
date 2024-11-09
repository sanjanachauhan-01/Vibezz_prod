import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet,} from 'react-native';
import { icons } from "../constants";
import Feather from '@expo/vector-icons/Feather';

const MenuComponent = ({ onPress }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleoption1= () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handleoption2= () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handledownload= () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <View style={styles.container} show={onPress}>
      <TouchableOpacity onPress={handleMenuClick}>
        <Image source={icons.menu} style={styles.menuIcon} resizeMode="contain" />
      </TouchableOpacity>
      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleoption1}>
            <Text style={styles.menuText}>Share to Social Media</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleoption2}>
            <Text style={styles.menuText}>Send via Direct Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handledownload}>
            <Text style={styles.menuText}>Save to Gallery</Text>
            <View style={{ paddingLeft: 10}}> 
            <Feather name="download" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Allows alignment to the left
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  menu: {
    position: 'absolute',
    top: 30,
    right:'5%', // Aligns the menu to the left edge of the screen
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    zIndex: 1000,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    minWidth: 150,
    flexDirection: 'row'
  },
  menuText: {
    color: 'white',
    fontSize: 14,
  },
});

export default MenuComponent;
