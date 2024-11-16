import * as FileSystem from "expo-file-system";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { Alert, Platform } from "react-native";
import { err } from "react-native-svg";
const client = new Client();

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID,
  bookmarkCollectionId: process.env.EXPO_PUBLIC_BOOKMARK_COLLECTION_ID,
  photosCollectionId: process.env.EXPO_PUBLIC_PHOTOS_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
  storageIDfilephoto: process.env.EXPO_PUBLIC_STORAGE_ID_FILE_PHOTO,
  latestVideoCollectionId: process.env.EXPO_PUBLIC_LATEST_COLLECTION_ID,
  vibeRequestId: process.env.EXPO_PUBLIC_VIBE_REQUEST,
  commentsCollectionId: process.env.EXPO_PUBLIC_COMMENTS,
  reactionsCollectionId: process.env.EXPO_PUBLIC_REACTIONS,
  commentReplyCollectionId: process.env.EXPO_PUBLIC_COMMENT_REPLY,
};
let platformID;
if (Platform.OS === "ios") {
  // Platform is iOS
  platformID = process.env.EXPO_PUBLIC_PLATFORM_IOS;
} else if (Platform.OS === "android") {
  // Platform is Android
  platformID = process.env.EXPO_PUBLIC_PLATFORM_ANDROID;
}

client
  .setEndpoint(appwriteConfig.endpoint) // Appwrite Endpoint
  .setProject(appwriteConfig.projectId) //  Project ID
  .setPlatform(platformID);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
// Convert recording to uri
async function getFileProperties(fileUri) {
  try {
    // Get file info from the file system
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    const fileName = fileUri.split("/").pop(); // Extract file name from the URI

    if (!fileInfo.exists) {
      throw new Error("File does not exist at the given URI");
    }

    const fileProperties = {
      name: fileName,
      type: "audio/m4a", // Assuming the mime type based on the extension
      size: fileInfo.size,
      uri: fileUri,
    };

    return fileProperties;
  } catch (error) {
    console.error("Error getting file properties:", error);
    throw error;
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  let assetUploading, asset;

  if (!file) return;
  if (type !== "rec") {
    asset = {
      name: file.fileName,
      type: file.mimeType,
      size: file.fileSize,
      uri: file.uri,
    };
  }
  try {
    if (type === "rec") {
      const fileProperties = await getFileProperties(file);

      if (fileProperties) {
        assetUploading = {
          name: fileProperties.name,
          type: fileProperties.type,
          size: fileProperties.size,
          uri: fileProperties.uri,
        };
      }
    } else {
      assetUploading = asset;
    }
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      assetUploading
    );
    if (uploadedFile) {
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      console.log(fileUrl, type);
      return fileUrl;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image" || type === "photo") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else if (type === "rec") {
      console.log("IAM HERE", fileId, type);
      if (!fileId) {
        throw new Error("File is required for type 'rec'");
      }
      // Get the file view URL
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
      console.log("FIEL URL ", fileUrl, type);
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Modify getAllPosts function to retrieve both photos and videos
export async function getAllPosts(dataType) {
  let collectionID;
  collectionID = appwriteConfig.videoCollectionId;

  if (dataType === "bookmarks")
    collectionID = appwriteConfig.bookmarkCollectionId;
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionID,
      [Query.orderDesc("$createdAt")]
    );

    // Combine photos and videos into a single array
    const allPosts = [...videos.documents];
    return allPosts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchDatabase(query) {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.search("username", query)]
    );

    const videos = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.photosCollectionId,
      [Query.search("content", query)]
    );

    // Combine and return results from all collections
    const searchResults = {
      users: users.documents,
      videos: videos.documents,
      posts: posts.documents,
    };

    return searchResults;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.latestVideoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

//To fetch the bookmarked posts
export async function getBookmarkedPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Import necessary functions and variables

export async function createPost(form) {
  try {
    let postUrl, thumbnailurl, titleRecUrl;

    if (form.postType === "Photo") {
      const [photoUrl] = await Promise.all([uploadFile(form.photo, "image")]);
      postUrl = photoUrl;
    } else if (form.postType === "video") {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
      postUrl = videoUrl;
      thumbnailurl = thumbnailUrl;
    } else return;
    if (form.titleRec) {
      const [titleRecording] = await Promise.all([
        uploadFile(form.titleRec, "rec"),
      ]);
      titleRecUrl = titleRecording;
    }

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: form.postType === "Photo" ? null : thumbnailurl,
        video: form.postType === "Photo" ? null : postUrl,
        photo: form.postType === "Photo" ? postUrl : null,
        prompt: form.prompt,
        titleRec: titleRecUrl,
        creator: form.userId,
        height: form.postType === "Video" ? form.thumbnail.height : form.height,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

//To bookmark a post
export async function createBookmark(docsID, isBookmarked) {
  try {
    // Fetch the document by its ID
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      docsID
    );

    // If the document exists, update its bookmark status
    if (response) {
      const updateData = {
        bookmark: isBookmarked,
      };

      // Update the document with the new bookmark status
      const updateDocument = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        docsID,
        updateData
      );
    }
  } catch (error) {
    throw new Error(error);
  }
}

// Function to filter documents in the collection
export async function filterDocuments(userID) {
  try {
    // Call the Appwrite SDK method to filter documents
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("bookmark", true)],
      Query.equal("creator", userID)
    );
    return response.documents; // Return the filtered documents
  } catch (error) {
    throw error;
  }
}

export const fetchResults = async (searchQuery) => {
  try {
    const usersPromise = databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.search("username", searchQuery), // Adjust 'userField' to the actual field you want to search in your users collection
      ]
    );

    // const postsPromise = databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.photosCollectionId, [
    //   Query.search('title', searchQuery) // Adjust 'postField' to the actual field you want to search in your posts collection
    // ]);

    const videosPromise = databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [
        Query.search("title", searchQuery), // Adjust 'videoField' to the actual field you want to search in your videos collection
      ]
    );

    const [usersResponse, videosResponse] = await Promise.all([
      usersPromise,
      videosPromise,
    ]);
    const combinedResults = [
      ...usersResponse.documents.map((doc) => ({ ...doc, type: "user" })),
      ...videosResponse.documents.map((doc) => ({ ...doc, type: "video" })),
    ];
    return combinedResults;

    // setResults(combinedResults);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

export async function vibeRequest(currentuser, userID) {
  console.log("Curent user", currentuser, " to User ", userID);
  try {
    const newRequest = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.vibeRequestId,
      ID.unique(),
      {
        followReqfrom: currentuser.username,
        followReqfromID: currentuser.accountId,
        followReqto: userID.username,
        followReqtoID: userID.accountId,
      }
    );
    console.log("NEW REQUST", newRequest);
    return newRequest; // Return the filtered documents
  } catch (error) {
    throw error;
  }
}

export async function checkIfAlreadyRequested(currentUserId, userReqId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.vibeRequestId,
      [
        Query.equal("followReqfromID", currentUserId),
        Query.equal("followReqtoID", userReqId),
      ]
    );

    return response.documents.length > 0;
  } catch (error) {
    console.error("Error checking follow request", error);
    return false;
  }
}

export async function withdrawRequest(currentUserId, userReqId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.vibeRequestId,
      [
        Query.equal("followReqfromID", currentUserId),
        Query.equal("followReqtoID", userReqId),
      ]
    );

    if (response.documents.length > 0) {
      const requestId = response.documents[0].$id;
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.vibeRequestId,
        requestId
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error withdrawing follow request", error);
    return false;
  }
}

//first get the image and upload it to storage  ID ,
//get the user using the userID from ur database
//update the display picture link in that database.

export async function createdisplayPicture(userID, picture, type) {
  console.log("hahahaha", userID, picture, type);
  let displayPicUrl, displayPictype;

  try {
    let postUrl;
    if (!userID) return;

    if (picture.type === "image") {
      const [photoUrl] = await Promise.all([uploadFile(picture, "image")]);
      postUrl = photoUrl;
    } else if (picture.type === "video") {
      const [videoUrl] = await Promise.all([uploadFile(picture, "video")]);
      postUrl = videoUrl;
    }

    if (!postUrl) {
      Alert.alert("Display Picture could not be uploaded!");
      return;
    } else {
      const updatedDisplayPicture = await uploadDisplayPicture(
        userID,
        postUrl,
        type
      );
      if (updatedDisplayPicture)
        displayPicUrl = updatedDisplayPicture.displayPicture;
      displayPictype = updatedDisplayPicture.displayPictureType;
      console.log("UPDATED DISPLAY PICTURE", displayPicUrl, displayPictype);
    }

    return displayPicUrl, displayPictype;
  } catch (error) {
    throw new Error(error.message);
  }
}

// export async function uploadDisplayPicture(userId, postURL) {
//   try {
//     console.timeLog("gagagagagagga", userId);
//     // Fetch the user by userId
//     // const user = await getUserById(userId);
//     const user = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", userId)]
//     );

//     if (user) {
//       // Update the user's displayPicture attribute
//       const updateData = {
//         displayPicture: postURL,
//       };

//       const updatedUser = await databases.updateDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.userCollectionId, // Assuming this is the user collection ID
//         userId,
//         updateData
//       );
//       console.log("trying to update", updatedUser);
//       return updatedUser;
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     // throw new Error(`Failed to upload display picture: ${error.message}`);
//     console.log(`Failed to upload display picture: ${error.message}`);
//   }
// }
export async function uploadDisplayPicture(userId, postURL, type) {
  try {
    console.log("Updating display picture for user:", type);

    // Fetch the user by userId
    const userResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", userId)]
    );

    console.log("USER ACCOUNT ID ", userResponse);

    if (userResponse && userResponse.documents.length > 0) {
      const user = userResponse.documents[0];

      // Update the user's displayPicture attribute
      const updateData = {
        displayPicture: postURL,
        displayPictureType: type,
      };

      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        user.$id, // Use the user's document ID for updating
        updateData
      );

      console.log("Successfully updated display picture:", updatedUser);
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(`Failed to upload display picture: ${error.message}`);
    throw new Error(`Failed to upload display picture: ${error.message}`);
  }
}

//handle likes/reactions
// export async function createLike(docsID, isLiked) {

//   try {
//     // Fetch the document by its ID
//     const response = await databases.getDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       docsID
//     );

//     // If the document exists, update its bookmark status
//     if (response) {
//       const updateData = {
//         likes: isLiked,
//       };

//       // Update the document with the new bookmark status
//       const updateDocument = await databases.updateDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.videoCollectionId,
//         docsID,
//         updateData
//       );
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }
export async function addOrUpdateReaction(postID, username, userID, isLiked) {
  try {
    // First, create a comment document in commentsCollectionId
    const reactionDocs = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.reactionsCollectionId,
      ID.unique(),
      { reactions: isLiked, username: username, postID: postID, userID: userID }
    );
    if (reactionDocs) console.log(reactionDocs);

    // Then, update the video document's comments attribute with the new comment ID
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      postID,
      {
        reactions: reactionDocs.$id, // If multiple comments, add this ID to the existing array of comment IDs
      }
    );
    return reactionDocs;
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

export async function fetchReactions(postID) {
  try {
    //Get the comments based on the post
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.reactionsCollectionId,
      [Query.equal("postID", postID)]
    );
    console.log("response", response);
    if (response.documents.length > 0) {
      const reactions = response.documents;
      return reactions;
    } else {
      return null;
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

export async function addComment(commentID, postID, username, userID, comment) {
  // alert(comment);
  try {
    // First, create a comment document in commentsCollectionId
    const commentDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      ID.unique(),
      { comment: comment, username: username, postID: postID, userID: userID }
    );
    if (commentDocument) alert("done");

    // Then, update the video document's comments attribute with the new comment ID
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      postID,
      {
        comments: [commentDocument.$id], // If multiple comments, add this ID to the existing array of comment IDs
      }
    );
    return commentDocument;
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

export async function fetchComments(docID) {
  try {
    //Get the comments based on the post
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      [Query.equal("postID", docID)]
    );
    console.log("response", response);
    if (response.documents.length > 0) {
      const comments = response.documents;
      return comments;
    } else {
      return null;
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

export async function AddCommentReplys(
  commentID,
  postID,
  username,
  userID,
  commentReply
) {
  try {
    // First, create a comment document in commentsCollectionId
    const commentDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentReplyCollectionId,
      ID.unique(),
      {
        commentReply: commentReply,
        username: username,
        postID: postID,
        userID: userID,
        commentID: commentID,
      }
    );
    if (commentDocument) alert("done");

    // Then, update the video document's comments attribute with the new comment ID
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      commentID,
      {
        commentReplies: [commentDocument.$id], // If multiple comments, add this ID to the existing array of comment IDs
      }
    );
    return commentDocument;
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

export async function fetchCommentReplys(commentID) {
  try {
    //Get the comments based on the post
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.commentReplyCollectionId,
      [Query.equal("commentID", commentID)]
    );
    console.log("response", response);
    if (response.documents.length > 0) {
      const comments = response.documents;
      return comments;
    } else {
      return null;
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
}
