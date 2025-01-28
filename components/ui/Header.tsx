

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {  TouchableOpacity, View } from "react-native";
import Heading from "./CustomText";

interface HeadingProps {
  className?: string;
  children: React.ReactNode;
}

const GoBackHeader: React.FC<HeadingProps> = ({ className = "", children }) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-4 px-4">
        <TouchableOpacity className="flex-row items-center gap-4 " activeOpacity={0.5} onPress={() => router.back()}>
            <Ionicons name="arrow-back" color={"#fff9"} size={24} />
            <Heading className="text-xl font-light dark:text-white text-gray-800">{children}</Heading>
        </TouchableOpacity>
    </View>
  );
};

export default GoBackHeader;
