import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { options_ } from '@/constants/SocialCollableActionsOptions';
import { FontAwesome } from '@expo/vector-icons';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const WhatsappForm: React.FC = () => {
    const [whatsapp, setWhatsapp] = useState('');
    const [username, setUsername] = useState('');

    const [point, set_point] = useState('');
    const [_url, set_url] = useState('');
    const [_name, set_name] = useState('');

    const [selected, setSelected] = useState('');
    const [selected_A, setSelected_A] = useState('');

  
   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Whatsapp:', whatsapp);
        console.log('Username:', username);
    };

    return (
        <ScrollView className='py-20'>
            <GoBackHeader>
                Back
            </GoBackHeader>
        <SafeAreaView className=" h-[100vh] px-6 gap-6" >

            <View className="items-center mt-10">
                <FontAwesome name="instagram" size={80} color={brands_colors.instagram} className=' dark:text-white ' />
            </View>

         
              <CustomInput
                value={_name}
                className="  p-4 rounded-lg dark:border-instagram  border-instagram"

                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>set_name(text) } 
                placeholder={'Display Name'}                 
               />

              
              <CustomInput
                value={_url}
                className="  p-4 rounded-lg dark:border-instagram  border-instagram"
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>set_url(text) } 
                placeholder={'Instagram Profile/Post URL'}                 
               />

              
               <DropdownInput
                
                selectedValue={selected}
                onSelect={setSelected}
                placeholder="Points"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-instagram  bg-instagram"
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-instagram  bg-instagram border border-instagram"
            />

            <DropdownInput
                
                selectedValue={selected_A}
                onSelect={setSelected_A}
                options={options_}
                placeholder="Action"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-instagram  bg-instagram"
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-instagram  bg-instagram border border-instagram"
            />
           
            <CustomButton text={'Boost Insta'} onPress={()=>{}} className='dark:bg-instagram  bg-instagram'/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};

export default WhatsappForm;