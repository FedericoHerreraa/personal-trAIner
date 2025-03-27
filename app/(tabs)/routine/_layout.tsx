import { Stack } from "expo-router";


export default function RoutineLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="dayRoutine"
                options={{
                    title: "Dia",
                    headerBackTitle: 'Volver',
                    headerStyle: { backgroundColor: "#1E293B" }, 
                    headerTintColor: "white",
                }} 
            />
            <Stack.Screen name="exercise" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="routineAI" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        </Stack>
    );
}