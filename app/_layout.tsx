import { Stack } from 'expo-router';
import { AuthProvider } from 'context/AuthContext';
import { RoutineProvider } from 'context/RoutineContext';
import '../global.css';

export default function Layout() {
    return (
        <AuthProvider>
            <RoutineProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen 
                        name="modal" 
                        options={{ presentation: 'modal', headerShown: false }} 
                    />
                    <Stack.Screen name="(account)" options={{ headerShown: false }} />
                </Stack>
            </RoutineProvider>
        </AuthProvider>
    );
}