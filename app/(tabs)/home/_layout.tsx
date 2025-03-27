

import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="todaysRoutine" 
                options={{ 
                    title: 'Rutina de hoy',
                    headerBackTitle: 'Volver',
                    headerStyle: { backgroundColor: "#1E293B" }, 
                    headerTintColor: "white",
                }} 
            />
            <Stack.Screen name="improveRoutine" 
                options={{ 
                    title: 'Mejorar la rutina',
                    headerBackTitle: 'Volver',
                    headerStyle: { backgroundColor: "#1E293B" }, 
                    headerTintColor: "white",
                }} 
            />
        </Stack>
    );
}