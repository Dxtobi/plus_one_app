import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, SplashScreen } from 'expo-router';
import * as SplashScreen_ from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext'; // Import AuthProvider
import "../global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Poppins_500Medium, Poppins_100Thin, Poppins_600SemiBold  } from '@expo-google-fonts/poppins';
import { Exo_100Thin, Exo_500Medium, Exo_600SemiBold  } from '@expo-google-fonts/exo';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen_.preventAutoHideAsync();

 function RootLayoutInner() {
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Get auth state
  const colorScheme = useColorScheme();
  const [isLayoutReady, setIsLayoutReady] = useState(false); // Track if layout has mounted
  
  const [fontsLoaded] = useFonts({
    Poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    Poppins_thin: require('@/assets/fonts/Poppins-Thin.ttf'),
    Poppins_bold: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    Exo: require('@/assets/fonts/Exo-VariableFont_wght.ttf'),
    Exo_bold: Exo_600SemiBold,
    Exo_m:Exo_500Medium

    
  });
 
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen_.hideAsync();
      setIsLayoutReady(true); 
      // console.log('Done')
    }
  }, [fontsLoaded]);

  // Redirect to auth screen if not authenticated
  useEffect(() => {
    if (isLayoutReady) {
      if (!isAuthenticated) {
        router.replace('/auth'); // Safely navigate
      }
    }
  }, [isAuthenticated, isLayoutReady]);

  if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          </>
        ) : (
          <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="forms/WhatsappForm" options={{ headerShown: false }} />
          <Stack.Screen name="forms/XForm" options={{ headerShown: false }} />
          <Stack.Screen name="forms/TickTock" options={{ headerShown: false }} />
          <Stack.Screen name="forms/Facebook" options={{ headerShown: false }} />
          <Stack.Screen name="forms/Instagram" options={{ headerShown: false }} />
          <Stack.Screen name="forms/Website" options={{ headerShown: false }} />
          <Stack.Screen name="forms/Youtube" options={{ headerShown: true }} />
          <Stack.Screen name="+not-found" />
          </>
        )}
        
      </Stack>
      <StatusBar style="auto" />
      </GestureHandlerRootView>
  </ThemeProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootLayoutInner />
    </AuthProvider>
  );
}