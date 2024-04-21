import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import {icons} from '../constants'

const SearchInput = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4 ">
      <TextInput
        className="text-base mt-0.5 font-pregular text-white flex-1"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => {
          setQuery(3);
        }}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;