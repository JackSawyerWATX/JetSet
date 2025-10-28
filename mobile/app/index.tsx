import React from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router'

const HomeScreen = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // signOut updates Clerk's auth state; await it so we can navigate after completion
      await signOut();
      // replace the current route with the auth flow so the user lands on sign-in screens
      router.replace('/(auth)');
    } catch (err) {
      console.error('Logout failed', err);
      Alert.alert('Logout failed', 'Please try again.');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-2xl font-bold text-gray-900 mb-8">Home Screen</Text>
        <Button onPress={handleLogout} title="Logout" />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;