import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { SearchInput } from '../../components';
import Tabs_Bar from '../users/Tabs_Bar';

const Notifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <View style={styles.tabsContainer}>
        <Tabs_Bar />
      </View>
      <Text>hello</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchContainer: {
    paddingHorizontal: '5%',
    marginTop: '10%',
  },
  tabsContainer: {
    flex: 1,
    marginTop: 10, // Optional, for spacing between SearchInput and Tabs_Bar
  },
});

export default Notifications;
