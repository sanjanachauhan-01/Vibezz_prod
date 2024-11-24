// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   StatusBar,
//   Animated,
// } from "react-native";

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Image } from "react-native";
// import * as Speech from 'expo-speech';



// const SplashScreen = ({ user }) => {
//   const [countdown, setCountdown] = useState(10);
//   const animatedValue = React.useRef(new Animated.Value(1)).current; // Starts at full circle (1).

//   useEffect(() => {
//     // Start countdown
//     const interval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev > 1) return prev - 1;
//         clearInterval(interval); // Stop the interval when countdown reaches 1.
//         return 0;
//       });
//     }, 1000);

//     // Start animation
//     Animated.timing(animatedValue, {
//       toValue: 0, // Ends at an empty circle (0).
//       duration: 10000, // 10 seconds duration.
//       useNativeDriver: true,
//     }).start();

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
  
//       const thingToSay = 'Take a deep breath';
//        return Speech.speak(thingToSay);

//   })

//   const circleInterpolation = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"], // Circular rotation.
//   });

//   return (

//     <View style={styles.splashContainer}>
//       <StatusBar translucent backgroundColor="transparent" />
//       <ImageBackground
//         source={require("../assets/images/splash2.jpeg")} // Your wallpaper image path
//         style={styles.splashImage}
//         resizeMode="cover"
//       >
//         <Text style={styles.splashText}>Michal Smith</Text>
//         <Text style={styles.splashText1}>Take a deep breath</Text>
//         <View style={styles.loaderContainer}>
//           <Animated.View
//             style={[
//               styles.circularLoader,
//               { transform: [{ rotate: circleInterpolation }] },
//             ]}
//           />
//           <Text style={styles.countdownText}>{countdown}</Text>
//         </View>
//       <View style={{ top:'29%'}}> 
//       <Text style={{ fontSize:8}}> created by: </Text>
   
//         <View style={styles.creatorBox}>
//          <View style={styles.circleBox}>
//           <Image
//           source={require("../assets/images/ded.jpeg")} // Your wallpaper image path
//           style={{
//           height:30,
//           width:30,
//           borderRadius:15,
//           alignItems:'center',
//           justifyContent:'center'
//         }}
//           resizeMode="cover"
//           />
//         {/* image */}
//          </View>
//          <TouchableOpacity style={{ flexDirection:'column' , flex:1, width:120}}> 
//          {/* creator details */}
//          <View style={{  flexDirection:'column', alignItems:'center', flexWrap:'wraps'}}>
//          <Text style={{ color:'white', fontSize:12}}>  {`sanjana chauhanycgueirchbvi4uhngio4hvogo4ruo`.slice(0, 15)}</Text>
//          <Text style={{ fontSize: 10, color:'black'}}>339K</Text>
       
//          </View>
//          </TouchableOpacity>
    
//     {/* followbutton */}
//          <TouchableOpacity>
//          <MaterialIcons name="person-add-alt-1" size={20} color="#64748b" />
//          </TouchableOpacity>
//          </View>
        
//         </View>
//       </ImageBackground>
//     </View>
   
//   );
// };

// const styles = StyleSheet.create({
//   splashContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   splashImage: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   splashText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 10,
//     bottom:'20%'
//   },
//   splashText1: {
//     fontSize: 18,
//     color: "white",
//     marginBottom: 20,
//     top:'40%'
//   },
//   loaderContainer: {
//     position: "relative",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 100,
//     height: 100,
//     top:'15%'
//   },
//   circularLoader: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     borderWidth: 20,
//     borderColor: "#74adee", // Adjust the color.
//     borderRadius: 50,
//     borderTopColor: "transparent", // Create the circular effect.
//     opacity:0.9
//   },
//   countdownText: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   creatorBox: {
//     height:40,
//     width: 170,
//     backgroundColor: 'transparent',
//     shadowOpacity:0.9,
//     borderRadius:10,
//     flexDirection:'row',
//     padding:5,
//     alignItems:'center',
//     justifyContent:'center'
 
//   },
//   circleBox: {
//     height:30,
//     width:30,
//     borderRadius:30,
//     // borderWidth:0.5,
//     borderColor:'white'

//   }
// });

// export default SplashScreen;



import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Animated,
} from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import * as Speech from 'expo-speech';

const SplashScreen = ({ user , data }) => {
  console.log("data of creator", data)
  const [countdown, setCountdown] = useState(15);
  const animatedValue = React.useRef(new Animated.Value(1)).current; // Starts at full circle (1).

  useEffect(() => {
    // Start countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval); // Stop the interval when countdown reaches 1.
        return 0;
      });
    }, 1000);

    // Start animation
    Animated.timing(animatedValue, {
      toValue: 0, // Ends at an empty circle (0).
      duration: 10000, // 10 seconds duration.
      useNativeDriver: true,
    }).start();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Text-to-speech logic
    const speakText = () => {
      Speech.speak(`${user.username}`, {
        rate: 0.7, // Slower pace
        onDone: () => {
          setTimeout(() => {
            Speech.speak("Take a deep breath", { rate: 0.8 });
          }, 1000); // Pause for 1 second before the next text
        },
      });
    };

    speakText();
  }, []);

  // Interpolate the circle's opacity and rotation
  const circleInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Circular rotation.
  });

  const circleOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Opacity decreases as the countdown progresses.
  });

  return (
    <View style={styles.splashContainer}>
      <StatusBar translucent backgroundColor="transparent" />
       <ImageBackground
       source={ data && data[0] ? { uri: data[0].wallpaper } : require("../assets/images/splash2.jpeg")} // Your wallpaper image path
       style={styles.splashImage}
       resizeMode="cover"
      >
        <Text style={styles.splashText}>{user.username}</Text>
        <Text style={styles.splashText1}>Take a deep breath</Text>
        <View style={styles.loaderContainer}>
          <Animated.View
            style={[
              styles.circularLoader,
              {
                transform: [{ rotate: circleInterpolation }],
                opacity: circleOpacity, // Apply interpolated opacity
              },
            ]}
          />
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>
        { data && data[0] &&
        <View style={{ top: '29%' }}>
          <Text style={{ fontSize: 8 }}> created by: </Text>

          <View style={styles.creatorBox}>
            <View style={styles.circleBox}>
              <Image
               source={
                data && data[0]?.users?.displayPicture!=null
                  ? { uri: data[0].users.displayPicture }
                  : require("../assets/images/logo.png") // Fallback to hardcoded image
              }
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity style={{ flexDirection: 'column', flex: 1, width: 120 }}>
              <View style={{ flexDirection: 'column', alignItems: 'center', flexWrap: 'wraps' }}>
                <Text style={{ color: 'white', fontSize: 12 }}>
                  { data && data[0] ? `${data[0].users.username}`.slice(0, 15) : null}
                </Text>
                <Text style={{ fontSize: 10, color: 'black' }}>339K</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialIcons name="person-add-alt-1" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    bottom: '20%',
  },
  splashText1: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    top: '40%',
  },
  loaderContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    top: '15%',
  },
  circularLoader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 20,
    borderColor: "#74adee",
    borderRadius: 50,
    borderTopColor: "transparent",
  },
  countdownText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  creatorBox: {
    height: 40,
    width: 170,
    backgroundColor: 'transparent',
    shadowOpacity: 0.9,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBox: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderColor: 'white',
  },
});

export default SplashScreen;

