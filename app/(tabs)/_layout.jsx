import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name }) => {
  return (
    <View style={{ alignItems: 'center', width:200}}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
      <Text style={{ color: color, fontSize: 10, marginTop: 2 }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#818cf8",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 60,
          justifyContent: 'space-around',
          alignItems: 'center',
          width: Dimensions.get('screen').width*1.35,
         
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          // width: 'auto',
          flex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="GlobalSearch"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.search}
              color={color}
              name="Search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          title: "Frizz",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.timer}
              color={color}
              name="Frizz"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: "Post",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Post"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          title: "Notifications",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.bell}
              color={color}
              name="Notifications"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
