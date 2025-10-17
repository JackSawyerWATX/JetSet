import "../global.css"
import { Text,  View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to JetSet!
      </Text>
      <Ionicons name="airplane" size={32} color="blue" />
    </View>
  );
}
