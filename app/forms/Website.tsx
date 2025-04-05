import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { createGig } from '@/utils/APIfunctions';
import { FontAwesome, Foundation } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const WhatsappForm: React.FC = () => {
    const [whatsapp, setWhatsapp] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [point, set_point] = useState('');
    const [url, set_url] = useState('');
    const [name, set_name] = useState('');

    const [selected, setSelected] = useState('');
  
   

      const handleSubmit = async () => {
              // Validate inputs
              if (name.trim().length < 5 || url.trim().length < 5) {
                setError('Please provide valid input for all fields.');
                return;
              }
          
            console.log('yea')
          
              try {
              
                const gigData = {
                  title: name,
                  displayname:name,
                  description: '', 
                  platform: 'website', 
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
                )
          
                // Success: Show a success message or navigate to another screen
                Alert.alert('Success', 'Your gig has been created successfully!');
                console.log('Created Gig:', response);
                set_name('');
                set_url('');
                
                setSelected('');
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
        <SafeAreaView className=" h-[100vh] px-6 gap-6" >

            <View className="items-center mt-10">
                <Foundation  name="web" size={80} color={brands_colors.linkedin} className=' dark:text-white ' />
            </View>

         
              <CustomInput
                value={name}
                className="  p-4 rounded-lg  border-linkedin dark:border-linkedin"
                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>set_name(text) } 
                placeholder={'Display Name'}                 
               />

              
              <CustomInput
                value={url}
                className="  p-4 rounded-lg  border-linkedin dark:border-linkedin"
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>set_url(text) } 
                placeholder={'Website URL'}                 
               />

              
               <DropdownInput
                selectedValue={selected}
                onSelect={setSelected}
                placeholder="Points"
                containerClassName="mb-4 "
                optionsClassName="dark:bg-linkedin  bg-linkedin border-linkedin"
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-linkedin  bg-linkedin"
            />
           
            <CustomButton text={'Get More Traffics'} onPress={()=>handleSubmit()} className=' dark:bg-linkedin  bg-linkedin'/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};



export default WhatsappForm;

