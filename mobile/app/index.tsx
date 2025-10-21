import React from 'react'
import { View, Text, Button, Alert } from 'react-native'
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
    <View>
      <Text>Home Screen</Text>
      <Button onPress={handleLogout} title="Logout" />
    </View>
  )
}

export default HomeScreen;