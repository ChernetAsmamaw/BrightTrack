import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import { theme } from './theme';

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Inter': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
          'Inter-Medium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
          'Inter-SemiBold': require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
          'Inter-Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue without custom fonts
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.textPrimary }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="student/[studentId]" />
        <Stack.Screen name="students" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="settings" />
      </Stack>
      <BottomTabNavigator />
    </View>
  );
}
