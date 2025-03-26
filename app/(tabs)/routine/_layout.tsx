import { Stack } from "expo-router";

export default function RoutineLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="stack"
                options={{
                    title: "Dia",
                    headerBackTitle: 'Volver',
                    headerStyle: { backgroundColor: "#1E293B" }, 
                    headerTintColor: "white",
                }} 
            />
        </Stack>
    );
}