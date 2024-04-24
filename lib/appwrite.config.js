import { Account, Avatars, Client, Databases, Storage } from "react-native-appwrite";


export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.hobby.aora",
  projectId: "6623b63c066bd8c8d30c",
  databaseId: "6626e659960b734b3410",
  userCollectionId: "6626e67e052b8a7f2d20",
  videoCollectionId: "6626e6a9250dc6e73b04",
  storageId: "6623b8743c9e45555cf6",
};
export const client = new Client();
// Init your react-native SDK
client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.const account = new Account(client);
 export const databases = new Databases(client);
 export const avatars = new Avatars(client);

export const account = new Account(client);
export const storage = new Storage(client);