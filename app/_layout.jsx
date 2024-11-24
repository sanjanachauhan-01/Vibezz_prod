import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import GlobalProvider from '../context/GlobalProvider';
import SearchUser from './users/SearchUser';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    // "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
       <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='screens/PostsScreen'
          options={{
            headerShown: true,
            headerTitle: 'Post',
            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: '#818cf8',
            },
          }}
        />
        <Stack.Screen name='search/[query]' options={{ headerShown: false }} />
        <Stack.Screen name='users/SearchUser'  options={{ headerShown: false }} />
        <Stack.Screen name='screens/Messages'  options={{ headerShown: false }} />
        <Stack.Screen name='screens/LatestVideos'  options={{ headerShown: false }} />
        <Stack.Screen name='screens/FrizzComponent'  options={{ headerShown: false }} />

      </Stack>
      </GestureHandlerRootView>
    </GlobalProvider>
  );
};

export default RootLayout;
