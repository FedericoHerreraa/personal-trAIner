import { Tabs } from "expo-router";
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function TabsLayout() {
    return (
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)", 
                    borderTopWidth: 0,
                    elevation: 0,
                    position: "absolute",
                },
                tabBarActiveTintColor: "#FFF",
                tabBarInactiveTintColor: "#AAA",
                tabBarBackground: () => ( 
                    <BlurView
                        intensity={80}  
                        tint="dark"   
                        style={{ flex: 1 }}
                    />
                ),
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused }) => <AntDesign size={28} name="home" color={focused ? "#FACC15" : "white"}  />,
                }}
            />
            <Tabs.Screen
                name="routine"
                options={{
                    title: 'Rutina',
                    tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="weight-lifter" size={24} color={focused ? "#FACC15" : "white"} />,
                }}
            />
            <Tabs.Screen
                name="trainer"
                options={{
                    title: 'TrAIner',
                    tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="dots-circle" size={24} color={focused ? "#FACC15" : "white"} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused }) => <AntDesign size={28} name="user" color={focused ? "#FACC15" : "white"} />,
                }}
            />
        </Tabs>
    );
}