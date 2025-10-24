import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'

type Topic = {
  topic: string;
  posts: number;
}

const formatPostCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

const SearchScreen = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/topics/trending');
      const data = await response.json();
      setTopics(data.trendingTopics);
    } catch (err) {
      setError('Failed to load trending topics');
      console.error('Error fetching topics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-200'>
      {/* HEADER */}
      <View className='px-4 py-3 border-b border-gray-500'>
        <View className='flex-row items-center bg-gray-300 rounded-full px-4 py-3'>
          <Feather name='search' size={20} color="#657786" />
          <TextInput
            placeholder='Search topics or posts'
            className='flex-1 ml-3 text-base'
            placeholderTextColor="#657786"/>
        </View>
      </View>

      {/* TRENDING TOPICS */}
      <ScrollView 
        className='flex-1'
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        contentContainerStyle={{ paddingBottom: 20 }}>
        <View className='p-4'>
          <Text className='text-gray-500 text-base font-medium'>Trending Topics</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#00BFFF" style={{ marginTop: 20 }} />
          ) : error ? (
            <Text className='text-red-500 mt-4'>{error}</Text>
          ) : topics.length === 0 ? (
            <Text className='text-gray-500 mt-4'>No trending topics found</Text>
          ) : (
            topics.map((item, index) => (
              <TouchableOpacity key={index} className='py-3 border-b border-gray-500'>
                <Text className='font-bold text-gray-900 text-lg'>{item.topic}</Text>
                <Text className='text-gray-500 text-sm'>{formatPostCount(item.posts)} posts</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchScreen