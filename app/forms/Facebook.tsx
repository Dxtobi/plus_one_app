import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
import { brands_colors } from '@/constants/Colors';
import { options_ } from '@/constants/SocialCollableActionsOptions';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { SetStateAction, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const FacebookForm: React.FC = () => {
   

    const [point, set_point] = useState('');
    const [_url, set_url] = useState('');
    const [_name, set_name] = useState('');

    const [selected, setSelected] = useState('');
    const [selected_A, setSelected_A] = useState('');
    const [error, setError] = useState('');


  
   
    const { colorScheme } = useColorScheme()
    const handleSubmit = (e: React.FormEvent) => {
        if (_url.trim().length < 5 || _name.trim().length < 5 ){
            console.log('----')
            return setError('Only valid input')
        }
        e.preventDefault();
        
    };

    return (
        <ScrollView className='py-20'>
            <GoBackHeader>
                Back
            </GoBackHeader>
        <SafeAreaView className=" h-[100vh] px-6 gap-6" >

            <View className="items-center mt-10">
                <FontAwesome name="facebook-square" size={80} color={brands_colors.facebook} className=' dark:text-white ' />
            </View>

         
              <CustomInput
                value={_name}
                 className="  p-4 rounded-lg border-facebook dark:border-facebook"
                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>set_name(text) } 
                placeholder={'Display Name'}                 
                error={error}
               />

              
              <CustomInput
                value={_url}
                className="  p-4 rounded-lg border-facebook dark:border-facebook"
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>set_url(text) } 
                placeholder={'Facebook URL Post/Page'}                 
               />

              
               <DropdownInput
                
                selectedValue={selected}
                onSelect={setSelected}
                placeholder="Points"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-facebook  bg-facebook"
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-facebook  bg-facebook border border-facebook"
                />

             <DropdownInput
                
                selectedValue={selected_A}
                onSelect={setSelected_A}
                options={options_}
                placeholder="Actions"
                containerClassName="mb-4  "
                optionsClassName="dark:bg-facebook  bg-facebook"
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg dark:bg-facebook  bg-facebook border border-facebook"
            />
           
            <CustomButton text={'Boost Facebook'} onPress={handleSubmit} className='bg-facebook dark:bg-facebook'/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};

export default FacebookForm;