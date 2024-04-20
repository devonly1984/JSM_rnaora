import { View, Text, ScrollView, Image, Alert } from 'react-native'
import {images} from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';
import { Link } from 'expo-router';
import { CustomButton, FormField } from "../../components";
import { signIn } from '../../lib/appwrite';
const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password:''
  })
  const [isSumitting, setisSumitting] = useState(false)
  const submit = async() => {
    if ( !form.email || !form.password){
      Alert.alert("Error","Please fill all fields")
    }
    setisSumitting(true);
    try {
    await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally{
      setisSumitting(false);
    }
    

  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-6 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">
            Log into Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSumitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg text-secondary font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;