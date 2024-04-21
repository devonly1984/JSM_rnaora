import { Account, Avatars, Client, Databases } from "react-native-appwrite";
import { Config } from "./appwrite.config";
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
    console.log("I'm signed in", email);
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
    console.log("New User Created",newUser
  )
  debugger;
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {

    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};
export const getCurrentUser = async()=>{
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
      
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}