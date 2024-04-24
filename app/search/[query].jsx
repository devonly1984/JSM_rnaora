import { View, Text, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EmptyState, SearchInput,  VideoCard } from "../../components";
import { useEffect } from "react";
import { searchPosts } from "../../lib/appwrite.posts";
import useAppWrite from '../../lib/useAppWrite';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams();
  
  const { data: posts, refetch, isLoading } = useAppWrite(()=>searchPosts(query));

useEffect(() => {
refetch();
}, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No Videos found for this query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;