import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';

export default function AuthScreen() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // Toggle state
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
  };

  const validateForm = () => {
    const newErrors: ErrorsState = {};

    if (!isLogin && !form.username.trim()) {
      newErrors.username = 'First name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('http://192.168.1.101:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to AsyncStorage
      await AsyncStorage.setItem('userToken', data.token);

      // Update global auth state
      login(data.token);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during login.';
      Alert.alert('Error', errorMessage);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('http://192.168.1.101:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Optionally log in the user after successful signup
      await AsyncStorage.setItem('userToken', data.token);

      // Update global auth state
      login(data.token);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during signup.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Container */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Header */}
        <View className="w-full h-48 rounded-b-3xl items-center justify-center">
         
          <Text className="dark:text-white text-2xl font-semibold mt-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </Text>
        </View>

        {/* Form */}
        <View className="w-full mt-10">
          {!isLogin && (
            <>
              {/* Signup: First Name */}
              <TextInput
                placeholder="Username"
                onChangeText={(text) => handleInputChange('username', text)}
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
              />
              {errors.username && (
                <Text className="text-red-500 text-sm">{errors.username}</Text>
              )}
            </>
          )}

          {/* Email */}
          <TextInput
            placeholder="Email"
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email}</Text>
          )}

          {/* Password */}
          <TextInput
            placeholder="Password"
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
          />
          {errors.password && (
            <Text className="text-red-500 text-sm">{errors.password}</Text>
          )}

          {/* Confirm Password for Signup */}
          {!isLogin && (
            <TextInput
              placeholder="Confirm Password"
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg bg-white"
            />
          )}
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">{errors.confirmPassword}</Text>
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