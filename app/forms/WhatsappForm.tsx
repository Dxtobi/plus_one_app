import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { createGig } from '@/utils/APIfunctions';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const WhatsappForm: React.FC = () => {
    const [name, setName] = useState('');
     const [url, setUrl] = useState('');
     const [selectedPoints, setSelectedPoints] = useState('');
     const [selectedAction, setSelectedAction] = useState('');
     const [error, setError] = useState('');
    const [selected, setSelected] = useState('');
  
   

      const router = useRouter();
        
      const handleSubmit = async () => {
        // Validate inputs
        if (name.trim().length < 5 || url.trim().length < 5) {
          setError('Please provide valid input for all fields.');
          return;
        }
    
        // if (!selectedPoints || !selectedAction) {
        //   setError('Please select points and actions.');
        //   return;
        // }
    
        try {
          // Call the createGig API function
          const gigData = {
            title: name,
            description: '', // You can add a description field if needed
            platform: 'whatsapp', // Hardcoded for this form
            duration: selected,
            url,
          };
    
          const response = await createGig(
            gigData.title,
            name,
            gigData.description,
            gigData.platform,
            gigData.duration,
            gigData.url
          );
          // Clear state after success
          setName('');
          setUrl('');
          setSelectedPoints('');
          setSelectedAction('');
          setError('');
          // Success: Show a success message or navigate to another screen
          Alert.alert('Success', 'Your gig has been created successfully!');
          console.log('Created Gig:', response);
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
        <SafeAreaView className=" h-[100vh] px-6 gap-6" >

            <View className="items-center mt-10">
                <FontAwesome name="whatsapp" size={80} color={brands_colors.whatsapp} className=' dark:text-white ' />
            </View>

         
              <CustomInput
                value={name}
                className="  p-4 rounded-lg border-whatsapp dark:border-whatsapp"
                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>setName(text) } 
                placeholder={'Display Name'}                 
               />

              
              <CustomInput
                value={url}
                className="  p-4 rounded-lg border-whatsapp dark:border-whatsapp"
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>setUrl(text) } 
                placeholder={'Whatsapp Link'}                 
               />

              
               <DropdownInput
                
                selectedValue={selected}
                onSelect={setSelected}
                placeholder="Points"
                containerClassName="mb-4"
                maxOptionsHeight={600}
                optionsClassName="dark:bg-whatsapp  bg-whatsapp"
               
                inputClassName="  p-4 rounded-lg dark:bg-whatsapp  bg-whatsapp border border-whatsapp"
            />
           
            <CustomButton text={'Get More Contacts'} onPress={()=>handleSubmit()} className='dark:bg-whatsapp  bg-whatsapp border border-whatsapp'/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};

export default WhatsappForm;