import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Iconify } from 'react-native-iconify';
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
        tabBarActiveTintColor:  colorScheme === 'dark'?'green':'green' ,
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
          tabBarIcon: ({ color }) => <Iconify icon="solar:home-2-bold" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="gigs"
        options={{
          title: 'Gigs',
          tabBarIcon: ({ color }) => <Iconify icon="fluent:task-list-square-24-filled" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <Iconify icon="iconoir:wallet-solid" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Iconify icon="mdi:face-man-profile" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}