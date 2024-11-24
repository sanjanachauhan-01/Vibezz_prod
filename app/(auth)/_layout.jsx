// // // import { Redirect, Stack } from "expo-router";
// // // import { StatusBar } from "expo-status-bar";
// // // import Loader from "../../components/Loader";
// // // import { useGlobalContext } from "../../context/GlobalProvider";

// // // const AuthLayout = () => {
// // //   const {loading, isLogged } = useGlobalContext();

// // //   if (!loading && isLogged) return <Redirect href="/home" />;

// // //   return (
// // //     <>
// // //       <Stack>
// // //         <Stack.Screen
// // //           name="signin"
// // //           options={{
// // //             headerShown: false,
// // //           }}
// // //         />
// // //         <Stack.Screen
// // //           name="signup"
// // //           options={{
// // //             headerShown: false,
// // //           }}
// // //         />
// // //       </Stack>

// // //       <Loader isLoading={loading} />
// // //       <StatusBar backgroundColor="#161622" style="light" />
// // //     </>
// // //   );
// // // };

// // // export default AuthLayout;


// // import React, { useState, useEffect } from "react";
// // import { Redirect, Stack } from "expo-router";
// // import { StatusBar } from "expo-status-bar";
// // import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
// // import { useGlobalContext } from "../../context/GlobalProvider";
// // import SplashScreen from "../../components/SplashScreen";


// // const AuthLayout = () => {
// //   const { loading, isLogged } = useGlobalContext();
 
// //   if (!loading && isLogged) {
// //     return <Redirect href="/home" />;
// //   }

// //   return (
// //     <>
// //       <Stack>
// //         <Stack.Screen
// //           name="signin"
// //           options={{
// //             headerShown: false,
// //           }}
// //         />
// //         <Stack.Screen
// //           name="signup"
// //           options={{
// //             headerShown: false,
// //           }}
// //         />
// //       </Stack>
// //       <StatusBar backgroundColor="#161622" style="light" />
// //     </>
// //   );
// // };

// // export default AuthLayout;

import React, { useState, useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import SplashScreen from "../../components/SplashScreen";
import { getwallpaper } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const AuthLayout = () => {
  const { user, loading, isLogged } = useGlobalContext();
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility
  const {data} = useAppwrite(getwallpaper, 'contributors');

  useEffect(() => {
    // Show splash screen for 10 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 10000);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

  if (showSplash && isLogged && user) {
    // Render the splash screen while the timer runs
    return <SplashScreen user={user} data={data}/>;
  }

  if (!loading && isLogged) {
    // Redirect to home after splash screen and when the user is logged in
    return <Redirect href="/home" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;


