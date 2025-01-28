import CustomButton from '@/components/ui/Button';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import GoBackHeader from '@/components/ui/Header';
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

            <View className="items-center ">
              <Image
                source={{ uri: 'https://i.pinimg.com/736x/7b/26/10/7b261080350fab8d67e18a4458463553.jpg' }}
                className="w-24 h-24 bg-gray-300 rounded-full mb-4"
                />
            </View>

         
              <CustomInput
                value={_name}
                className="  p-4 rounded-lg "
                keyboardType="default"
                onChangeText_={(text: SetStateAction<string>)=>set_name(text) } 
                placeholder={'Display Name'}                 
               />

              
              <CustomInput
                value={_url}
                className="  p-4 rounded-lg "
                keyboardType="url"
                onChangeText_={(text: SetStateAction<string>)=>set_url(text) } 
                placeholder={'Whatsapp Link'}                 
               />

              
               <DropdownInput
                
                selectedValue={selected}
                onSelect={setSelected}
                placeholder="Points"
                containerClassName="mb-4"
                optionsClassName=""
                maxOptionsHeight={200}
                inputClassName="  p-4 rounded-lg "
            />
           
            <CustomButton text={'Get More Contacts'} onPress={()=>{}}/>
        
       
        </SafeAreaView>
        </ScrollView>
    );
};

export default WhatsappForm;