

import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { SimpleLineIcons } from '@expo/vector-icons';
import { firstUpperCase } from 'utils/functions';
import { supabase } from 'lib/supabase';
import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';

const allDays = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

export const AssistanceCalendar = () => {
    const { user } = useAuth();
    const [weekData, setWeekData] = useState<{ day: string; went: boolean }[]>([]);

    useEffect(() => {
        const fetchAssistance = async () => {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
            const { data, error } = await supabase
                .from('assistance')
                .select('date')
                .eq('user_id', user?.id)
                .gte('date', oneWeekAgo.toISOString());
    
            if (error) {
                console.error('Error fetching assistance:', error);
                return;
            }
    
            const validData = Array.isArray(data) ? data : [];
    
            const attendedDaysSet = new Set(
                validData.map((entry: any) => {
                    const dayIndex = new Date(entry.date).getDay();
                    return allDays[dayIndex];
                })
            );
    
            const updatedWeek = allDays.map(day => ({
                day,
                went: attendedDaysSet.has(day),
            }));
    
            setWeekData(updatedWeek);
        };
    
        fetchAssistance();
    }, [user]);

    return (
        <View className="mx-5 mb-10">
            <View className="flex flex-row items-center mb-1 justify-between mx-3">
                <Text className="text-zinc-200 text-xl font-semibold">Calendario de asistencias</Text>
                <Link asChild href="/home/improveRoutine">
                    <Pressable className="flex flex-row items-center gap-2">
                        <Text className="text-zinc-400">Ver todo</Text>
                        <SimpleLineIcons name="arrow-right" size={10} color="#FACC15" />
                    </Pressable>
                </Link>
            </View>
            <View className="w-full h-[80px] bg-zinc-900 border border-zinc-800 rounded-3xl mt-2 px-10 py-2 flex flex-row items-center justify-center gap-5 shadow-lg shadow-zinc-800">
                {weekData.map((day, index) => (
                    <View key={index} className="flex items-center gap-2">
                        <Text className="text-zinc-200 font-semibold text-lg">
                            {firstUpperCase(day.day.slice(0, 3))}
                        </Text>
                        <View className={`w-2 h-2 ${day.went ? 'bg-green-500' : 'bg-zinc-900'} rounded-full`} />
                    </View>
                ))}
            </View>
        </View>
    );
};