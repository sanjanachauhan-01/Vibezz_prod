import React from 'react';
import PhotoCard from './PhotoCard'; 
import VideoCard from './VideoCard';


export const renderItem = ({ item }) => {
  
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
        // height={item.height} 
      />
    );
  } else if (item.video) {
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


