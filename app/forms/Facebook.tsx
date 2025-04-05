import React, { useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import { FontAwesome } from '@expo/vector-icons';
import GoBackHeader from '@/components/ui/Header';
import CustomInput from '@/components/ui/CustomInput';
import DropdownInput from '@/components/ui/DropDown';
import CustomButton from '@/components/ui/Button';
import { brands_colors } from '@/constants/Colors';
import { options_ } from '@/constants/SocialCollableActionsOptions';
import { createGig } from '@/utils/APIfunctions';
import { useRouter } from 'expo-router';

const FacebookForm: React.FC = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [selectedPoints, setSelectedPoints] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [error, setError] = useState('');

  const { colorScheme } = useColorScheme();
    const router = useRouter();
    
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
        platform: 'facebook', // Hardcoded for this form
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
    <ScrollView className="py-20">
      <GoBackHeader>Back</GoBackHeader>
      <SafeAreaView className="h-[100vh] px-6 gap-6">
        <View className="items-center mt-10">
          <FontAwesome name="facebook-square" size={80} color={brands_colors.facebook} className="dark:text-white" />
        </View>

        <CustomInput
          value={name}
          className="p-4 rounded-lg border-facebook dark:border-facebook"
          keyboardType="default"
          onChangeText_={(text) => setName(text)}
          placeholder={'Display Name'}
          error={error}
        />

        <CustomInput
          value={url}
          className="p-4 rounded-lg border-facebook dark:border-facebook"
          keyboardType="url"
          onChangeText_={(text) => setUrl(text)}
          placeholder={'Facebook URL Post/Page'}
        />

        <DropdownInput
          selectedValue={selectedPoints}
          onSelect={setSelectedPoints}
          placeholder="Points"
          containerClassName="mb-4"
          optionsClassName="dark:bg-facebook bg-facebook"
          maxOptionsHeight={200}
          inputClassName="p-4 rounded-lg dark:bg-facebook bg-facebook border border-facebook"
        />

        <DropdownInput
          selectedValue={selectedAction}
          onSelect={setSelectedAction}
          options={options_}
          placeholder="Actions"
          containerClassName="mb-4"
          optionsClassName="dark:bg-facebook bg-facebook"
          maxOptionsHeight={600}
          inputClassName="p-4 rounded-lg dark:bg-facebook bg-facebook border border-facebook"
        />

        <CustomButton text={'Boost Facebook'} onPress={handleSubmit} className="bg-facebook dark:bg-facebook" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default FacebookForm;