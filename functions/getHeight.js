import { Image } from "react-native";
import { Video } from "expo-av";

export const getAssetHeight = async (asset, selectType) => {
  return new Promise((resolve, reject) => {
    if (selectType === "image") {
      Image.getSize(
        asset.uri,
        (width, height) => resolve(height),
        (error) => reject("Failed to get image size:", error)
      );
    } else if (selectType === "video") {
      const video = new Video();
      video.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          resolve(status.naturalSize.height);
          video.setOnPlaybackStatusUpdate(null); // Remove listener after getting the height
        }
      });
      video
        .loadAsync({ uri: asset.uri }, {}, false)
        .catch((error) => reject("Failed to load video:", error));
    } else {
      reject("Unsupported asset type");
    }
  });
};
