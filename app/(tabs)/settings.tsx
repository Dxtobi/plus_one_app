

import { useAuth } from '@/context/AuthContext';
import { useState, useRef, useEffect, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Image, Animated, Easing, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from "@react-native-community/blur";
import TextCustom from '@/components/ui/CustomText';
import CustomInput from '@/components/ui/CustomInput';
import CustomButton from '@/components/ui/Button';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function HomeScreen() {
  const { logout } = useAuth();
  const [_email, set_email] = useState('');
  const [_name, set_name] = useState('');
  const [_gender, set_gender] = useState('');
  const [_age, set_age] = useState('');
  const [modalVisible, setModalVisible] = useState(false);



  // Animation Ref
  const slideAnim = useRef(new Animated.Value(500)).current; // Start off-screen (bottom)

  // Animate Modal Entry
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide up to Y: 0
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // Animate Modal Exit
  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 500, // Slide back down
      duration: 400,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  useEffect(() => {
    if (modalVisible) {
      slideUp();
    }
  }, [modalVisible]);

  return (
    <SafeAreaView className="flex-1 ">
     
      <View className="p-6">
        
        <Text className="text-2xl font-bold dark:text-white mb-6">Settings</Text>

        
        <View>
          <Text className="text-gray-400 text-lg mb-2">Account</Text>
          <TouchableOpacity
            className="flex-row items-center justify-between dark:bg-neutral-900 bg-neutral-200 p-4 rounded-lg  mb-6"
            onPress={() => setModalVisible(true)}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: 'https://i.pinimg.com/736x/7b/26/10/7b261080350fab8d67e18a4458463553.jpg' }}
                className="w-12 h-12 bg-gray-300 rounded-full mr-4"
              />
              <View>
                <Text className="text-lg font-semibold dark:text-white">David Cleriseau</Text>
                <Text className="text-gray-500">Personal Info</Text>
              </View>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="gray" />
          </TouchableOpacity>
        </View>

       

        {/* Settings Options */}
        <View className="gap-4">
          <Text className="text-gray-400 text-lg mb-2">Settings</Text>

          {/* Language */}
          <View className="flex-row items-center justify-between dark:bg-neutral-900 bg-neutral-200 bg-nau p-4 rounded-lg  mb-4">
            <Text className="dark:text-white font-medium">Language</Text>
            <Text className="text-gray-500">English</Text>
          </View>

          {/* Notifications */}
          <View className="flex-row items-center justify-between dark:bg-neutral-900 bg-neutral-200 p-4 rounded-lg  mb-4">
            <Text className="dark:text-white font-medium">Notifications</Text>
            <Text className="text-gray-400"><MaterialIcons name="navigate-next" size={24} color="gray" /></Text>
          </View>

          {/* Dark Mode */}
          <View className="flex-row items-center justify-between dark:bg-neutral-900 bg-neutral-200 p-4 rounded-lg ">
            <Text className="dark:text-white font-medium">Dark Mode</Text>
            <Text className="text-gray-500">System</Text>
          </View>
          {/* LOG OUT */}
          <TouchableOpacity className="flex-row items-center justify-between dark:bg-neutral-900 bg-neutral-200 p-4 rounded-lg " onPress={()=>logout()}>
            <Text className="dark:text-white font-medium ">Logout</Text>
            <AntDesign   name="logout" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Account Info Modal */}
      <Modal
        animationType="none" 
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => slideDown()}
      >
       <SafeAreaView className="flex-1 h-[100vh]" >
          <View className="flex-1 opacity-50 bg-green-300" />
          {/* Sliding Modal */}
          <View className={` dark:bg-neutral-800 bg-neutral-300 w-full`}>
            {/* Modal Header */}
            <View className="flex-row justify-between p-4">
              <TouchableOpacity onPress={() => slideDown()}>
                <Text className="text-xl font-semibold text-white">Done</Text>
              </TouchableOpacity>
            </View>

            {/* Account Content */}
            <View className="p-4">
              {/* Photo Section */}
            

              {/* Account Details */}
              <ScrollView className='gap-6'>
                <SafeAreaView className='gap-6'>
                  <CustomInput
                    value={_name}
                    className="  p-4 rounded-lg "
                    keyboardType="default"
                    onChangeText_={(text: SetStateAction<string>)=>set_name(text) } 
                    placeholder={'NAME'}                 
                  />

                  
                  <CustomInput
                    value={_age}
                    className="  p-4 rounded-lg "
                    keyboardType="numeric"
                    onChangeText_={(text: SetStateAction<string>)=>set_age(text) } 
                    placeholder={'AGE'}                 
                  />

                  <CustomInput
                    value={_email}
                    className="  p-4 rounded-lg "
                    keyboardType="email-address"
                    onChangeText_={(text: SetStateAction<string>)=>set_email(text) } 
                    placeholder={'Email'}                 
                  />
                </SafeAreaView>
              </ScrollView>
              <CustomButton text={'Update'} onPress={()=>{}}/>
            </View>
            {/* </BlurView> */}
          </View>
         
        </SafeAreaView>
       
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
    glassContainer: {
      width: 300,
      height: 200,
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.5)', // Border color for the frosted look
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5, // Elevation for Android shadow effect
    },
    
  });
  