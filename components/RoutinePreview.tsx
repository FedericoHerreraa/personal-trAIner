import { Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useRoutine } from 'context/RoutineContext';
import { useEffect, useState } from 'react';

const chartsExample = [
    { day: 'lunes', percentage: 0 },
    { day: 'martes', percentage: 0 },
    { day: 'miercoles', percentage: 0 },
    { day: 'jueves', percentage: 0 },
    { day: 'viernes', percentage: 0 },
    { day: 'sabado', percentage: 0 },
    { day: 'domingo', percentage: 0 }
];

export const RoutinePreview = () => {
    const { routine } = useRoutine();
    const [charts, setCharts] = useState(chartsExample);
    const [emptyRoutine, setEmptyRoutine] = useState<boolean | null>(true);

    useEffect(() => {
        if (routine && routine.days) {
            setEmptyRoutine(false);
            const maxDuration = Math.max(...routine.days.map(day => day.duration || 0));

            const updatedCharts = chartsExample.map(chart => {
                const foundDay = routine.days.find(day => day.day === chart.day);
                
                return {
                    ...chart,
                    percentage: foundDay ? (maxDuration ? Math.round((foundDay.duration / maxDuration) * 100) : 0) : 0
                };
            });

            setCharts(updatedCharts);
        } else {
            setEmptyRoutine(true);
        }
    }, [routine]);

    return (
        <View className="mt-24 mx-5">
            <View className="flex flex-row items-center mb-1 justify-between mx-3">
                <Text className="text-zinc-200 text-xl font-semibold">Tiempo por día</Text>
                <Link asChild href='/home/improveRoutine'>
                    <Pressable className='flex flex-row items-center gap-3'>
                        <Text className="text-zinc-400">Ver mas</Text>
                        <SimpleLineIcons name="arrow-right" size={10} color="#A1A1AA" />
                    </Pressable>
                </Link>
            </View>
            <View className={`w-full h-[240px] bg-zinc-900 rounded-2xl mt-2 px-10 py-2 flex flex-row ${emptyRoutine ? 'items-center' : 'items-end'} justify-center gap-5 shadow-lg shadow-zinc-800`}>
                {emptyRoutine ? (
                    <Text className="text-zinc-300 font-semibold text-2xl">No hay rutina registrada</Text>
                ) : (
                    charts.map((chart, index) => (
                        <View key={index} className="flex items-center gap-2">
                            <View className="h-52 flex flex-col justify-end">
                                <LinearGradient
                                    colors={['#FACC15', '#92400E']} 
                                    style={{ 
                                        width: 32,
                                        borderTopRightRadius: 7,
                                        borderTopLeftRadius: 7,
                                        height: `${chart.percentage}%`
                                    }} 
                                />
                            </View>
                            <Text className="text-zinc-300 font-semibold">{chart.day.slice(0,3)}</Text>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
};