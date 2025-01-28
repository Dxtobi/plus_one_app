import Ionicons from '@expo/vector-icons/build/Ionicons';
import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TextCustom from '@/components/ui/CustomText';
import { formatCurrency } from '@/utils/HelperFunctions';

const HomeScreen = () => {
  const router = useRouter()
  return (
    <ScrollView className=" px-4 pb-20 pt-16 " contentContainerStyle={{ flexGrow: 1 }}>
     
      <View className="">
        <TextCustom className="dark:text-gray-200 text-gray-500 text-sm my-2 mb-6">Hi Ehi,</TextCustom>
        <View>
          <TextCustom className="text-4xl  dark:text-white font-Poppins_bold">{formatCurrency(1234, )}</TextCustom>
        </View>
      </View>

      
      <View className="flex-row items-center my-4 ">
        <FontAwesome5 name="coins" size={18} color="green" />
        <TextCustom className="text-gray-500 ml-2 dark:text-white">POINTS</TextCustom>
      </View>

     
      <TextCustom className="text-gray-500 dark:text-white my-4">Here are some things you can do</TextCustom>
      <ScrollView className="flex-1">
    
        <View className='flex-row justify-between my-2'>
          <TouchableOpacity className="bg-green-100 dark:bg-green-400 p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/WhatsappForm')}>
            <FontAwesome name="whatsapp" size={24} color="black" />
            <TextCustom className="text-lg font-medium">Boost Whatsapp</TextCustom>
            <TextCustom className="text-sm text-gray-500">
            Get more customers on whatsapp
            </TextCustom>
          </TouchableOpacity>

        
          <TouchableOpacity className="dark:bg-neutral-800 bg-neutral-200 p-4 rounded-lg w-[45%] text-white" onPress={()=>router.navigate('/forms/XForm')}>
          <FontAwesome6 name="x-twitter" size={24} color="gray" />
            <TextCustom className="text-lg font-medium dark:text-gray-200 text-gray-500">X impressions</TextCustom>
            <TextCustom className="text-sm text-gray-500 dark:text-white">
              Boost your X account with more followers
            </TextCustom>
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-between my-2'>
          <TouchableOpacity className="bg-blue-100 dark:bg-blue-400 p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/Facebook')}>
          <FontAwesome name="facebook-square" size={24} color="black" />
            <TextCustom className="text-lg font-medium">Facebook boost</TextCustom>
            <TextCustom className="text-sm text-gray-500">
              Get more likes and follow of Facebook
            </TextCustom>
          </TouchableOpacity>

          {/* Pay Bill */}
          <TouchableOpacity className="bg-blue-300 dark:bg-blue-600 p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/Website')}>
          <Foundation name="web" size={24} color="black" />
            <TextCustom className="text-lg font-medium">Website visit</TextCustom>
            <TextCustom className="text-sm text-gray-500">
              Get more website visits
            </TextCustom>
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-between my-2'>
          <TouchableOpacity className="bg-pink-100 dark:bg-pink-400 p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/Instagram')}>
          <FontAwesome name="instagram" size={24} color="black" />
            <TextCustom className="text-lg font-medium">Insta boost</TextCustom>
            <TextCustom className="text-sm text-gray-500">
              Get more likes and follow of Instagram
            </TextCustom>
          </TouchableOpacity>

          {/* Pay Bill */}
          <TouchableOpacity className="bg-purple-100 dark:bg-purple-400  p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/TickTock')}>
          <FontAwesome5 name="tiktok" size={24} color="black" />
            <TextCustom className="text-lg font-medium">TicTok Boost</TextCustom>
            <TextCustom className="text-sm text-gray-500">
            Get more likes and follow of TicTok
            </TextCustom>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
     

      {/* Favorites Section */}
      <TextCustom className="text-gray-500 mt-8">Transfer points to friends</TextCustom>
      <View className="flex-row mt-4 items-start">
        {/* Add Button */}
        <TouchableOpacity className="bg-gray-200 w-14 h-14 rounded-full justify-center items-center">
          <TextCustom className="text-xl font-bold">+</TextCustom>
        </TouchableOpacity>

        {/* Favorite Contact 1 */}
        <TouchableOpacity className="ml-4 items-center">
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/44.jpg', // Replace with contact image
            }}
            className="w-14 h-14 rounded-full"
          />
          <TextCustom className="text-sm mt-1">Grace L.</TextCustom>
        </TouchableOpacity>

        {/* Favorite Contact 2 */}
        <TouchableOpacity className="ml-4 items-center">
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/32.jpg', // Replace with contact image
            }}
            className="w-14 h-14 rounded-full"
          />
          <TextCustom className="text-sm mt-1">Lawrence A.</TextCustom>
        </TouchableOpacity>
      </View>

      <View className='h-[30vh] '>

      </View>
    
    </ScrollView>
  );
};

export default HomeScreen;
