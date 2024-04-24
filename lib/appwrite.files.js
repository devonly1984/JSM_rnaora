import { databases,storage } from "./appwrite.config";
import { Config } from "./appwrite.config";

const { videoCollectionId, storageId } = Config;
export const createVideo = async (form) => {
    try {
      const [thumbnailUrl, videoUrl] = Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
      const newPost = await databases.createDocument(
        databaseId,
        videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
      return newPost;
    } catch (error) {
      throw new Error();
    }
  };
  export const uploadFile = async(file,type)=>{
    if (!file) return;
    const { mimeType, ...rest } = file;
    const asset = {
      name: file.fileName,
      type: file.mimeType,
      size: file.fileSize,
      uri: file.uri,
    };
    try {
        const uploadedFile = await storage.createFile(
          storageId,
          ID.unique(),
          asset
        );
        const fileUrl = await getFilePreview(uploadedFile.$id,type)
        return fileUrl
    } catch (error) {
      throw new Error
    }
  }
  export const getFilePreview  = async(fileId,type)=>{
    let fileurl;
    try {
      if (type==='video') {
        fileUrl = storage.getFileView(storageId, fileId);
      }  else if (type==='image'){
        fileUrl = storage.getFilePreview(
          storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      }    else {
        throw new Error("Invalid file type")
      }
      if (!fileUrl) {
        throw Error;
      }
      return fileUrl;
    } catch (error) {
      throw new Error
    }
  }