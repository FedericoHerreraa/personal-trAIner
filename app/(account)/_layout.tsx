
import { Stack } from "expo-router";

export default function LayoutAccount() {
    return (
        <Stack>
            <Stack.Screen name="account" options={{ headerShown: false }} />
            <Stack.Screen 
                name="login" 
                options={{ 
                    title: "Ingresa", 
                    headerBackTitle: "Volver"
                }}
            />
            <Stack.Screen 
                name="register" 
                options={{ 
                    title: "Registrate",
                    headerBackTitle: "Volver"
                }}
            />
        </Stack>
    );
}