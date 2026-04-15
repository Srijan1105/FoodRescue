// Powered by OnSpace.AI
import { AlertProvider } from '@/template';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { DonationProvider } from '@/contexts/DonationContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <DonationProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(donor)" />
              <Stack.Screen name="(ngo)" />
              <Stack.Screen name="(volunteer)" />
            </Stack>
          </DonationProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
