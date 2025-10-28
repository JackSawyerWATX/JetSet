import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-2xl font-bold text-gray-900 mb-8">Home Screen</Text>
        <SignOutButton/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen