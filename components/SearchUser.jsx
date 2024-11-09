import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchResults } from '../lib/appwrite';
import { StatusBar } from 'expo-status-bar';

const SearchUser = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getResults = async () => {
      if (query.length > 0) {
        const combinedResults = await fetchResults(query);
        setResults(combinedResults || []);
      } else {
        setResults([]);
      }
    };
    getResults();
  }, [query]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Clear the results and query when the screen loses focus
        setResults([]);
        setQuery('');
        setResults([])
      };
    }, [])
  );

  const handleUserPress = (user) => {
    navigation.navigate('users/SearchUser', { user });
  };

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar translucent backgroundColor='transparent' />
      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          placeholder="Search a user, topic etc"
          placeholderTextColor="#CDCDE0"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {results.length > 0 && (
        <View 
        style={styles.dropdown}
        >
          <FlatList
            data={results}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.resultItem} 
                onPress={() => handleUserPress(item)}>
                {item.type === 'user' && (
                  <>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <Text style={styles.resultText}>{item.username}</Text>
                  </>
                )}
                {item.type === 'post' && (
                  <Text style={styles.resultText}>Post: {item.title}</Text>
                )}
                {item.type === 'video' && (
                  <Text style={styles.resultText}>Video: {item.title}</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {query !== '' && results.length === 0 && (
        <View style={styles.dropdown}>
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>No results found</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 16,
    // backgroundColor: '#000',
    zIndex: 999,
  },
  dropdown: {
    marginTop: 15,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
    position: 'absolute',
    top: 100, // Adjust based on your search bar height
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e3d6d6',
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  resultText: {
    color: 'white',
  },
});

export default SearchUser;
