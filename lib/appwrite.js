import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.hobby.aora",
  projectId: "6623b63c066bd8c8d30c",
  databaseId: "6623b73e1dc92961c2a0",
  userCollectionId: "6623b754487ea528ca88",
  videoCollectionId: "6623b77a624a8f21de51",
  storageId: "6623b8743c9e45555cf6",
};
// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
    .setProject(Config.projectId) // Your project ID
    .setPlatform(Config.platform) // Your application ID or bundle ID.
;const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
// Register User
export const createUser = async(email,password,username)=>{

  try {
    const newAccount = await account.create(ID.unique(),email,password,username)
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
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
    console.log(error);
    throw new Error(error)
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}