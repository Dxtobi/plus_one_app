import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { options_ } from '@/constants/SocialCollableActionsOptions';
import { createGig } from '@/utils/APIfunctions';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const WhatsappForm: React.FC = () => {
  
    const [error, setError] = useState<string | null>(null);
    const [point, set_point] = useState('');
    const [url, set_url] = useState('');
    const [name, set_name] = useState('');

    const [selected, setSelected] = useState('');
    const [selected_A, setSelected_A] = useState('');

  
   

    const handleSubmit = async () => {
       // Validate inputs
    //    if (name.trim().length < 5 || url.trim().length < 5) {
    //      setError('Please provide valid input for all fields.');
    //      return;
    //    }
   
       if (!selected || !selected_A) {
         setError('Please select points and actions.');
         return;
       }
   
       try {
       
         const gigData = {
           title: name,
           displayname:name,
           description: selected_A, 
           platform: 'youtube', 
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
   
         // Success: Show a success message or navigate to another screen
         Alert.alert('Success', 'Your gig has been created successfully!');
         console.log('Created Gig:', response);
         set_name('');
         set_url('');
         setSelected('');
         setSelected_A('');
         setError(null);
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
                <FontAwesome name="youtube" size={80} color={brands_colors.youtube} className=' dark:text-white ' />
            </View>

              <CustomInput
                value={name}
                className={`  p-4 rounded-lg dark:border-[#FF0000]  border-[#FF0000]`}

                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>set_name(text) } 
                placeholder={'Display Name'}                 
               />

              
              <CustomInput
                value={url}
                className={`  p-4 rounded-lg dark:border-[#FF0000]  border-[#FF0000]`}
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>set_url(text) } 
                placeholder={'Youtube Profile/Post URL'}                 
               />
               <DropdownInput
                
                selectedValue={selected}
                onSelect={setSelected}
                placeholder="Points"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-youtube  bg-youtube"
                maxOptionsHeight={600}
                inputClassName="  p-4 rounded-lg dark:bg-youtube bg-youtube border border-youtube"
            />

            <DropdownInput
                
                selectedValue={selected_A}
                onSelect={setSelected_A}
                options={options_}
                placeholder="Action"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-youtube  bg-youtube"
                maxOptionsHeight={800}
                inputClassName="  p-4 rounded-lg dark:bg-youtube  bg-youtube border border-youtube"
            />
            <CustomButton text={'Boost Youtube'} onPress={()=>handleSubmit()} className='dark:bg-youtube  bg-youtube'/>

        </SafeAreaView>
        </ScrollView>
    );
};



export default WhatsappForm;

