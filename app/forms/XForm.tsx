import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { createGig } from '@/utils/APIfunctions';
import { useRouter } from 'expo-router';
import { options_ } from '@/constants/SocialCollableActionsOptions';

const XForm: React.FC = () => {
   
const router = useRouter();
    const [name, setName] = useState('');
     const [url, setUrl] = useState('');
     const [selectedPoints, setSelectedPoints] = useState('');
     const [selectedAction, setSelectedAction] = useState('');
     const [error, setError] = useState('');

  
   


     const handleSubmit = async () => {
        // Validate inputs
        if (name.trim().length < 5 || url.trim().length < 5) {
          setError('Please provide valid input for all fields.');
          return;
        }
    
        if (!selectedPoints || !selectedAction) {
          setError('Please select points and actions.');
          return;
        }
    
        try {
          // Call the createGig API function
          const gigData = {
            title: name,
            description: selectedAction, // You can add a description field if needed
            platform: 'twitter', // Hardcoded for this form
            duration: selectedPoints,
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
        <SafeAreaView className=" h-[100vh] px-6 gap-6 mt-20" >

        <View className="items-center">
                <FontAwesome name="twitter" size={80} color={'#303030'} className=' dark:text-white  bg-[#]' />
            </View>
              <CustomInput
                value={name}
                className="  p-4 rounded-lg border-twitter border dark:border-twitter"

                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>setName(text) } 
                placeholder={'Display Name'}                 
               />

              
              <CustomInput
                value={url}
                className="  p-4 rounded-lg border-twitter border dark:border-twitter"
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>setUrl(text) } 
                placeholder={'X url'}                 
               />

            <DropdownInput
                options={options_}
                selectedValue={selectedAction}
                onSelect={setSelectedAction}
                placeholder="Instruction"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-twitter  bg-twitter"
                maxOptionsHeight={800}
                inputClassName="  p-4 rounded-lg dark:bg-twitter  bg-twitter border border-twitter"
            />
            <DropdownInput
                selectedValue={selectedPoints}
                onSelect={setSelectedPoints}
                placeholder="Points"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-twitter  bg-twitter"
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-twitter  bg-twitter border border-twitter"
            />
           
            <CustomButton text={'Boost X Account'} onPress={()=>handleSubmit()} className='dark:bg-twitter  bg-twitter border border-twitter'/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};

export default XForm;