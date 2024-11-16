// import React from 'react';
// import PhotoCard from './PhotoCard'; 
// import VideoCard from './VideoCard';


// export const renderItem = ({ item , user }) => {
  
//   if (item.photo !== null && item.photo !== undefined) {
//     return (
//       <PhotoCard
//         docId={item.$id}
//         title={item.title}
//         photo={item.photo}
//         creator={item.creator.username}
//         avatar={item.creator.avatar}
//         bookmark={item.bookmark}
//         titleRec ={item.titleRec }
//         name={user.username}
//         userID={user.$id}
//         // height={item.height} 
//       />
//     );
//   } else if (item.video) {
//     return (
//       <VideoCard
//         docId={item.$id}
//         title={item.title}
//         thumbnail={item.thumbnail}
//         video={item.video}
//         creator={item.creator.username}
//         avatar={item.creator.avatar}
//         bookmark={item.bookmark}
//         titleRec ={item.titleRec }
//       />
//     );
//   } else {
//     return null; // Return null if item doesn't have photo or video
//   }
// };

// export const renderSearchPosts = ({ item }) => {
  
//   if (item.photo !== null && item.photo !== undefined) {
//     return (
//       <PhotoCard
//         docId={item.$id}
//         title={item.title}
//         photo={item.photo}
//         creator={item.creator.username}
//         avatar={item.creator.avatar}
//         bookmark={item.bookmark}
//         titleRec ={item.titleRec }
//       />
//     );
//   } else {
//     return null; // Return null if item doesn't have photo or video
//   }
// };
// export const renderSearchVideos = ({ item }) => {
  
//   if (item.video) {
//     return (
//       <VideoCard
//       docId={item.$id}
//       title={item.title}
//       thumbnail={item.thumbnail}
//       video={item.video}
//       creator={item.creator.username}
//       avatar={item.creator.avatar}
//       bookmark={item.bookmark}
//       titleRec ={item.titleRec }
//     />
//     );
//   } else {
//     return null; // Return null if item doesn't have photo or video
//   }
// };

// export const explorePost = ({ item }) => {
  
//   if (item.photo !== null && item.photo !== undefined) {
//     return (
//       <PhotoExploreCard
//         docId={item.$id}
//         title={item.title}
//         photo={item.photo}
//         creator={item.creator.username}
//         avatar={item.creator.avatar}
//         bookmark={item.bookmark}
//         titleRec ={item.titleRec }
//         // height={item.height} 
//       />
//     );
//   } else if (item.video) {
//     return (
//       <VideoExploreCard
//         docId={item.$id}
//         title={item.title}
//         thumbnail={item.thumbnail}
//         video={item.video}
//         creator={item.creator.username}
//         avatar={item.creator.avatar}
//         bookmark={item.bookmark}
//         titleRec ={item.titleRec }
//       />
//     );
//   } else {
//     return null; // Return null if item doesn't have photo or video
//   }
// };

import React from 'react';
import PhotoCard from './PhotoCard'; 
import VideoCard from './VideoCard';
import Carousel from 'react-native-reanimated-carousel';
import useAppwrite from '../lib/useAppwrite';
import { getAllPosts } from '../lib/appwrite';
import { Dimensions } from 'react-native';


export const renderItem = ({ item, user, posts }) => {

  return (
    // <Carousel
    //   loop
    //   width={500}
    //   height={300}
    //   data={item}
    //   scrollAnimationDuration={1000}
    //   onSnapToItem={(index) => console.log("current index:", index)}
    //   renderItem={({ item }) => {
    //     if (item.photo !== null && item.photo !== undefined) {
    //       return (
    //         <PhotoCard
    //           docId={item.$id}
    //           title={item.title}
    //           photo={item.photo}
    //           creator={item.creator.username}
    //           avatar={item.creator.avatar}
    //           bookmark={item.bookmark}
    //           titleRec={item.titleRec}
    //           name={user.username}
    //           userID={user.$id}
    //         />
    //       );
    //     } else if (item.video) {
    //       return (
    //         <VideoCard
    //           docId={item.$id}
    //           title={item.title}
    //           thumbnail={item.thumbnail}
    //           video={item.video}
    //           creator={item.creator.username}
    //           avatar={item.creator.avatar}
    //           bookmark={item.bookmark}
    //           titleRec={item.titleRec}
    //         />
    //       );
    //     } else {
    //       return null; // Fallback if neither `photo` nor `video` is defined
    //     }
    //   }}
    // />

              <PhotoCard
                docId={item.$id}
                title={item.title}
                photo={item.photo}
                creator={item.creator.username}
                avatar={item.creator.avatar}
                bookmark={item.bookmark}
                titleRec={item.titleRec}
                name={user.username}
                userID={user.$id}
                video={item.video}
                thumbnail={item.thumbnail}
                posts={posts}
              />
  );
};







    

export const renderSearchPosts = ({ item }) => {
  
  if (item.photo !== null && item.photo !== undefined) {
    return (
      <PhotoCard
        docId={item.$id}
        title={item.title}
        photo={item.photo}
        creator={item.creator.username}
        avatar={item.creator.avatar}
        bookmark={item.bookmark}
        titleRec ={item.titleRec }
        video={item.video}
      />
    );
  } else {
    return null; // Return null if item doesn't have photo or video
  }
};
export const renderSearchVideos = ({ item }) => {
  
  if (item.video) {
    return (
      <VideoCard
      docId={item.$id}
      title={item.title}
      thumbnail={item.thumbnail}
      video={item.video}
      creator={item.creator.username}
      avatar={item.creator.avatar}
      bookmark={item.bookmark}
      titleRec ={item.titleRec }
    />
    );
  } else {
    return null; // Return null if item doesn't have photo or video
  }
};

export const explorePost = ({ item }) => {
  
  if (item.photo !== null && item.photo !== undefined) {
    return (
      <PhotoExploreCard
        docId={item.$id}
        title={item.title}
        photo={item.photo}
        creator={item.creator.username}
        avatar={item.creator.avatar}
        bookmark={item.bookmark}
        titleRec ={item.titleRec }
        // height={item.height} 
      />
    );
  } else if (item.video) {
    return (
      <VideoExploreCard
        docId={item.$id}
        title={item.title}
        thumbnail={item.thumbnail}
        video={item.video}
        creator={item.creator.username}
        avatar={item.creator.avatar}
        bookmark={item.bookmark}
        titleRec ={item.titleRec }
      />
    );
  } else {
    return null; // Return null if item doesn't have photo or video
  }
};

