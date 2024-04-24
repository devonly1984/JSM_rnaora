import {   ID, Query } from "react-native-appwrite";
import { Config, storage,account, databases } from "./appwrite.config";

const  {databaseId,userCollectionId} = Config;


// Register User
export const createUser = async(email,password,username)=>{

  try {
    const newAccount = await account.create(ID.unique(),email,password,username)
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
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
    throw new Error
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
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export const signOut = async()=>{
  try {
      const session = await account.deleteSession("current");
      return session;
  } catch (error) {
   throw new Error(error)
  }
}
