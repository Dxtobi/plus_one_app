
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';

export default function AuthScreen() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    console.log('Login', form.email, form.password);
    // Handle authentication logic
    // await AsyncStorage.setItem('userToken', 'sampleToken');
    login();
  };

  const handleSignup = async () => {
    console.log('Signup', form);
    // Handle signup logic here
    await AsyncStorage.setItem('userToken', 'sampleToken');
  };

  return (
    <SafeAreaView className="flex-1 ">
      {/* Container */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Header */}
        <View className=" w-full h-48 rounded-b-3xl items-center justify-center">
          <View className="bg-white w-16 h-16 rounded-full items-center justify-center">
            <Text className="text-black text-2xl font-bold">🔲</Text>
          </View>
          <Text className="dark:text-white text-2xl font-semibold mt-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </Text>
        </View>

        {/* Form */}
        <View className="w-full mt-10">
          {!isLogin && (
            <>
              {/* Signup: First & Last Name */}
              <TextInput
                placeholder="First Name"
                onChangeText={(text) => handleInputChange('firstName', text)}
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
              />
              <TextInput
                placeholder="Last Name"
                onChangeText={(text) => handleInputChange('lastName', text)}
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
              />
            </>
          )}

          {/* Email */}
          <TextInput
            placeholder="Email"
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
          />

          {/* Password */}
          <TextInput
            placeholder="Password"
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
          />

          {/* Confirm Password for Signup */}
          {!isLogin && (
            <TextInput
              placeholder="Confirm Password"
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
            />
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={isLogin ? handleLogin : handleSignup}
            className="bg-green-300 dark:bg-green-600 py-4 rounded-lg mt-2 items-center"
          >
            <Text className="dark:text-white text-black text-lg font-semibold">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Toggle between Login and Signup */}
        <View className="flex-row mt-6">
          <Text className="text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text className="dark:text-white font-semibold ml-1">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
