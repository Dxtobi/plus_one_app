import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { options_ } from '@/constants/SocialCollableActionsOptions';
import { createGig } from '@/utils/APIfunctions';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TikTok: React.FC = () => {
   

    const [error, setError] = useState('');
    const [_url, set_url] = useState('');
    const [_name, set_name] = useState('');

    const [selectedx, setSelectedx] = useState('');
    const [selectedp, setSelectedp] = useState('');

  
   


     const handleSubmit = async () => {
          // Validate inputs
          if (_name.trim().length < 5 || _url.trim().length < 5) {
            setError('Please provide valid input for all fields.');
            return;
          }
      
          if (!selectedp || !selectedx) {
            setError('Please select points and actions.');

            return;
          }
      
          try {
          
            const gigData = {
              title: _name,
              displayname:_name,
              description: selectedx, 
              platform: 'tiktok', 
              duration: selectedp,
              _url,
            };
      
            const response = await createGig(
              gigData.title,
              _name,
              gigData.description,
              gigData.platform,
              gigData.duration,
              gigData._url
            );
      
            // Success: Show a success message or navigate to another screen
            Alert.alert('Success', 'Your gig has been created successfully!');
            console.log('Created Gig:', response);
            set_name('');
            set_url('');
            setSelectedx('');
            setSelectedp('');
            setError('');
            router.navigate('/(tabs)/gigs')
          } catch (error) {
            // Error: Show an error message
            Alert.alert('Error', 'Failed to create gig. Please try again.');
            console.error('Error during gig creation:', error);
          }
        };

    return (
        <ScrollView className='py-20'>
            <GoBackHeader>
                Back
            </GoBackHeader>
        <SafeAreaView className=" h-[100vh] px-6 gap-6 mt-20" >

            <View className="items-center">
              <FontAwesome5 name="tiktok" size={80} color={brands_colors.tiktok} />
            </View>

              <CustomInput
                value={_name}
                className="  p-4 rounded-lg dark:border-tiktok  border-tiktok"
                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>set_name(text) } 
                placeholder={'Display Name'}                 
               />

              
              <CustomInput
                value={_url}
                className="  p-4 rounded-lg dark:border-tiktok  border-tiktok"
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>set_url(text) } 
                placeholder={'Tiktok URL'}                 
               />

            <DropdownInput
                options={options_}
                selectedValue={selectedx}
                onSelect={setSelectedx}
                placeholder="Instruction"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-tiktok  bg-tiktok"
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-tiktok  bg-tiktok border border-tiktok"
            />
            <DropdownInput
                selectedValue={selectedp}
                onSelect={setSelectedp}
                containerClassName="mb-4  "
                optionsClassName="dark:bg-tiktok  bg-tiktok"
                maxOptionsHeight={600}
                inputClassName="  p-4 rounded-lg dark:bg-tiktok  bg-tiktok border border-tiktok"
            />
           
            <CustomButton text={'Boost Tiktok'} onPress={handleSubmit} className='dark:bg-tiktok  bg-tiktok'/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};

export default TikTok;