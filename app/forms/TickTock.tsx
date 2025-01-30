import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TikTok: React.FC = () => {
   

    const [point, set_point] = useState('');
    const [_url, set_url] = useState('');
    const [_name, set_name] = useState('');

    const [selectedx, setSelectedx] = useState('');
    const [selectedp, setSelectedp] = useState('');

  
   
 const options_ = [
    { label: 'Follow', value: 'follow' },
    { label: 'Like', value: 'like' },
    { label: 'Comment', value: 'comment' },

  ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       
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
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-tiktok  bg-tiktok border border-tiktok"
            />
           
            <CustomButton text={'Boost Tiktok'} onPress={()=>{}} className='dark:bg-tiktok  bg-tiktok'/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};

export default TikTok;