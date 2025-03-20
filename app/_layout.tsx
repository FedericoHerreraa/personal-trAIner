import { View, Text } from 'react-native';
import { Stack, Link, Slot } from 'expo-router';
import '../global.css';

export default function Layout() {
    return (
        <Slot />
        // <Stack>
        //     <Stack.Screen name="index" options={{ headerShown: false }} />
        //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        // </Stack>
    );
}