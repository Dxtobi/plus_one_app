import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TextCustom from '@/components/ui/CustomText';
import { formatCurrency } from '@/utils/HelperFunctions';
import { useColorScheme } from 'nativewind';
import { useAuth } from '@/context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { getProfile } from '@/utils/APIprofiles';
import { User } from '@/types/user_related';

const HomeScreen = () => {
  const router = useRouter()
  const {colorScheme} = useColorScheme()
  
  const [user, setUser] = React.useState<User|null>(null);
 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getProfile().then((res) => {
        // console.log('Profile data:', res);
        setUser(res);
      }).catch((error) => {
        // console.error('Error fetching profile data:', error);
      });
      // console.log('Screen is focused. Fetching data...');
      // Perform any action here, such as fetching data or updating state
    }
  }, [isFocused]);



  return (
    <ScrollView className=" px-4 pb-20 pt-16 " contentContainerStyle={{ flexGrow: 1 }}>
     
      <View className="">
        <TextCustom className="dark:text-gray-200 text-gray-500 text-sm my-2 mb-6">Hi {user?.username},</TextCustom>
        <View>
          <Text className="text-5xl py-4 dark:text-green-500 text-green-600 font-Exo_bold">{formatCurrency(user?.balance)}</Text>
        </View>
      </View>

      
      <View className="flex-row items-center my-4 ">
        <FontAwesome5 name="coins" size={18} color="green" />
        <Text className=" ml-2 dark:text-green-500 text-green-600">POINTS</Text>
        <Text className=" ml-2 dark:text-green-500 text-green-600">{user?.points  }</Text>
      </View>

     
      <TextCustom className="text-gray-500 dark:text-white my-4">Here are some things you can do</TextCustom>
      <ScrollView className="flex-1">
    
        <View className='flex-row justify-between my-2'>
          <TouchableOpacity className="bg-green-100 dark:bg-whatsapp p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/WhatsappForm')}>
            <FontAwesome name="whatsapp" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <TextCustom className="text-lg font-medium">Boost Whatsapp</TextCustom>
            <TextCustom className="text-sm text-gray-500">
            Get more customers on whatsapp
            </TextCustom>
          </TouchableOpacity>

        
          <TouchableOpacity className="bg-twitter  p-4 rounded-lg w-[45%] text-white dar" onPress={()=>router.navigate('/forms/XForm')}>
          <FontAwesome6 name="x-twitter" size={24} color={colorScheme === 'dark' ? 'white' : 'white'} />
            <Text className="text-lg font-medium text-gray-100  dark:text-white">X impressions</Text>
            <TextCustom className="text-sm text-white">
              Boost your X account with more followers
            </TextCustom>
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-between my-2'>
          <TouchableOpacity className="bg-blue-100 dark:bg-facebook p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/Facebook')}>
          <FontAwesome name="facebook-square" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <TextCustom className="text-lg font-medium">Facebook boost</TextCustom>
            <TextCustom className="text-sm text-gray-500">
              Get more likes and follow of Facebook
            </TextCustom>
          </TouchableOpacity>

          {/* Pay Bill */}
          <TouchableOpacity className="bg-blue-300 dark:bg-blue-600 p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/Website')}>
          <Foundation name="web" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <TextCustom className="text-lg font-medium">Website visit</TextCustom>
            <TextCustom className="text-sm text-gray-500">
              Get more website visits
            </TextCustom>
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-between my-2'>
          <TouchableOpacity className="bg-pink-100 dark:bg-instagram p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/Instagram')}>
          <FontAwesome name="instagram" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <TextCustom className="text-lg font-medium">Insta boost</TextCustom>
            <TextCustom className="text-sm text-gray-500">
              Get more likes and follow of Instagram
            </TextCustom>
          </TouchableOpacity>

          {/* Pay Bill */}
          <TouchableOpacity className="bg-purple-100 dark:bg-tiktok  p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/TickTock')}>
          <FontAwesome5 name="tiktok" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <TextCustom className="text-lg font-medium">TicTok Boost</TextCustom>
            <TextCustom className="text-sm text-gray-500">
            Get more likes and follow of TicTok
            </TextCustom>
          </TouchableOpacity>
        </View>

        <View className='flex-row justify-between my-2'>
          <TouchableOpacity className="bg-red-100 dark:bg-red-500 p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/Youtube')}>
            <FontAwesome name="youtube" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <TextCustom className="text-lg font-medium">Youtube</TextCustom>
            <TextCustom className="text-sm text-gray-500">
              Improve your Youtube channel
            </TextCustom>
          </TouchableOpacity>

          {/* 
          <TouchableOpacity className="bg-purple-100 dark:bg-tiktok  p-4 rounded-lg w-[45%]" onPress={()=>router.navigate('/forms/TickTock')}>
          <FontAwesome5 name="tiktok" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <TextCustom className="text-lg font-medium"> Telegram</TextCustom>
            <TextCustom className="text-sm text-gray-500">
            Get more likes and follow of TicTok
            </TextCustom>
          </TouchableOpacity> */}
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
