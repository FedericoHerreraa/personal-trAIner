
import { Tabs } from "expo-router"
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)", 
                    borderTopWidth: 0, 
                    elevation: 0, 
                    position: "absolute", 
                },
                tabBarActiveTintColor: "#FFF", 
                tabBarInactiveTintColor: "#AAA",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Inicio',
                    tabBarIcon: () => <AntDesign size={28} name="home" color="white" />,
                }}
            />
            <Tabs.Screen
                name="routine"
                options={{
                    title: 'Rutina',
                    tabBarIcon: () => <MaterialCommunityIcons name="weight-lifter" size={24} color="white" />,
                }}
            />
            <Tabs.Screen
                name="trainer"
                options={{
                    title: 'TrAIner',
                    tabBarIcon: () => <Feather name="cpu" size={24} color="white" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: () => <AntDesign size={28} name="user" color="white" />,
                }}
            />
        </Tabs>
    )
}