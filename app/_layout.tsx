import { View, Text } from 'react-native';
import { Stack, Link, Slot } from 'expo-router';
import '../global.css';
import { AuthProvider } from 'context/AuthContext';

export default function Layout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
        // <Stack>
        //     <Stack.Screen name="index" options={{ headerShown: false }} />
        //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        // </Stack>
    );
}