

import { Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';

export const RoutinePreview = () => {
    return (
        <View className="mt-24 mx-5">
            <View className="flex flex-row items-center mb-1 justify-between mx-3">
                <Text className="text-zinc-200 text-xl font-semibold">Mejora tu rutina</Text>
                <Link asChild href='/home/improveRoutine'>
                    <Pressable className='flex flex-row items-center gap-3'>
                        <Text className="text-zinc-400">Ver mas</Text>
                        <SimpleLineIcons name="arrow-right" size={10} color="#A1A1AA" />
                    </Pressable>
                </Link>
            </View>
            <View className="w-full h-[240px] bg-zinc-900 rounded-2xl mt-2 px-10 py-2 flex flex-row items-end justify-center gap-5 shadow-lg shadow-zinc-800">
                {charts.map((chart, index) => (
                    <View key={index} className="flex items-center gap-2">
                        <View className="h-52 flex flex-col justify-end">
                            <LinearGradient
                                colors={['#FACC15', '#92400E']} 
                                style={{ 
                                    width: 48,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    height: `${chart.percentage}%`
                                }} 
                            />
                        </View>
                    <Text className="text-zinc-300 font-semibold">{chart.day}</Text>
                </View>
                ))}
            </View>
        </View>
    );
}

const charts = [
    { day: 'Lun', percentage: 56 },
    { day: 'Mar', percentage: 36 },
    { day: 'Mier', percentage: 100 },
    { day: 'Jue', percentage: 70 },
    { day: 'Vie', percentage: 35 }
];