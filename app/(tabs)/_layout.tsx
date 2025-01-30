import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:  colorScheme === 'dark'?'white':'green' ,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView
            intensity={Platform.select({ ios: 30, android: 100 })}
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            style={[
              StyleSheet.absoluteFill,
              {
                borderTopWidth: 0.5,
                borderTopColor: colorScheme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'rgba(0, 0, 0, 0.3)',
              }
            ]}
          />
        ),
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: colorScheme === 'dark' 
            ? 'rgba(0, 0, 0, 0.4)' 
            : 'rgba(255, 255, 255, 0.4)',
          ...Platform.select({
            ios: {
              height: 85,
              paddingBottom: 30,
            },
            android: {
              height: 70,
              elevation: 0,
            },
          }),
          justifyContent:'center',
          alignItems:'center',
          alignContent:'center',
          paddingTop:15
        },
      }}>
      {/* Keep your existing tab screens */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <FontAwesome name="tasks" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="setting" color={color} />,
        }}
      />
    </Tabs>
  );
}