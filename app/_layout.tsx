import { View, Text } from 'react-native';
import { Stack, Link, Slot } from 'expo-router';
import '../global.css';
import { AuthProvider } from 'context/AuthContext';

export default function Layout() {
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen 
                    name="modal" 
                    options={{ presentation: 'modal', headerShown: false }} 
                />
                <Stack.Screen name="(account)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}