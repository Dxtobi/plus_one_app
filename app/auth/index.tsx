import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext'; // Assuming this path is correct
import customAxios from '@/utils/AxiosCall';

// For a Twitter-like 'X' logo, you might use an SVG or a simple Text component
// import { TwitterXIcon } from './path-to-your-icon-component'; // Example

export default function AuthScreen() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ErrorsState>({});

  interface FormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  interface ErrorsState {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

  const handleInputChange = (key: keyof FormState, value: string) => {
    setForm({ ...form, [key]: value });
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors({ ...errors, [key]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: ErrorsState = {};

    if (!isLogin && !form.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
    }


    if (!isLogin && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!isLogin && !form.confirmPassword.trim()){
        newErrors.confirmPassword = 'Confirm password is required';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const url = isLogin 
      ? '/auth/login' 
      : '/auth/register';
    
    const body = isLogin 
      ? { email: form.email, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    try {
      
      const response = await customAxios.post(url, body)

      const data =  response.data;

      if (response.status != 200) {
        console.log(response.status)
        // Try to get a specific message from backend, otherwise use a generic one
        const errorMessage = data.message || (data.errors && data.errors[0]?.msg) || (isLogin ? 'Login failed' : 'Signup failed');
        throw new Error(errorMessage);
      }

      await AsyncStorage.setItem('userToken', data.token);
      login(data.token); // This will likely trigger navigation away from AuthScreen

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `An error occurred during ${isLogin ? 'login' : 'signup'}.`;
      Alert.alert('Authentication Error', errorMessage);
      // If backend sends specific field errors, you could parse them here
      // For example, if error.message is "Email already exists"
      if (errorMessage.toLowerCase().includes('email')) {
        setErrors(prev => ({...prev, email: errorMessage}));
      }
    }
  };
  
  // Reset form and errors when toggling
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setForm({ username: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const commonInputStyle = "w-full h-14 px-4 mb-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const errorTextStyle = "text-red-500 text-xs mt-1 mb-2 px-1";

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className="items-center px-6 py-8">
            <Image source={require('@/assets/images/icon.png')} className="w-40 h-40 mb-10" resizeMode="contain" /> 
            <View className="w-full">
              {!isLogin && (
                <>
                  <TextInput
                    placeholder="Username"
                    value={form.username}
                    onChangeText={(text) => handleInputChange('username', text)}
                    className={`${commonInputStyle} ${errors.username ? 'border-red-500' : ''}`}
                    autoCapitalize="none"
                  />
                  {errors.username && (
                    <Text className={errorTextStyle}>{errors.username}</Text>
                  )}
                   <View className="h-3"/> 
                </>
              )}

              <TextInput
                placeholder="Email"
                value={form.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                className={`${commonInputStyle} ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <Text className={errorTextStyle}>{errors.email}</Text>
              )}
              <View className="h-3"/> 

              <TextInput
                placeholder="Password"
                value={form.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry
                className={`${commonInputStyle} ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && (
                <Text className={errorTextStyle}>{errors.password}</Text>
              )}
              <View className="h-3"/> 

              {!isLogin && (
                <>
                  <TextInput
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    secureTextEntry
                    className={`${commonInputStyle} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && (
                    <Text className={errorTextStyle}>{errors.confirmPassword}</Text>
                  )}
                  <View className="h-3"/> 
                </>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 py-3.5 rounded-full mt-6 w-full items-center"
              >
                <Text className="text-white text-lg font-bold">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

              {isLogin && (
                <TouchableOpacity className="mt-4 self-center">
                  <Text className="text-blue-500 text-sm font-medium">Forgot password?</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Toggle between Login and Signup */}
            <View className="flex-row mt-12 items-center">
              <Text className="text-zinc-600 dark:text-zinc-400">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode} className="ml-1.5">
                <Text className="text-blue-500 font-semibold">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}