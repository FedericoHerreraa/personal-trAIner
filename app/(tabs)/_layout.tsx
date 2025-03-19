
import { Tabs } from "expo-router"
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Inicio',
                    tabBarIcon: () => <AntDesign size={28} name="home" />,
                }}
            />
            <Tabs.Screen
                name="routine"
                options={{
                    title: 'Rutina',
                    tabBarIcon: () => <MaterialCommunityIcons name="weight-lifter" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="trainer"
                options={{
                    title: 'TrAIner',
                    tabBarIcon: () => <Feather name="cpu" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: () => <AntDesign size={28} name="user" />,
                }}
            />
        </Tabs>
    )
}