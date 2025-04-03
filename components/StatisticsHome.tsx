
import { View, Text, Pressable } from 'react-native';
import { Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRoutine } from 'context/RoutineContext';
import { DayRoutineType, Muscle } from 'types/types';
import { useEffect, useState } from 'react';
import { RoutinePreview } from './RoutinePreview';
import { AssistanceStatistic } from './AssistanceStatistic';

export const StatisticsHomePage = () => {
    const [muscles, setMuscles] = useState<Muscle[]>([]);
    const { routine } = useRoutine();
    const date = new Date();

    const weekDays = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

    const getFormattedDate = () => {
        const formatter = new Intl.DateTimeFormat('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });

        const formattedDate = formatter.format(date);
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    const getTodaysMuscles = () => {
        const dayToday = weekDays[date.getDay()];

        if (routine && routine.days) {
            const day: DayRoutineType | undefined = routine.days.find(day => day.day.toLowerCase() === dayToday);
            setMuscles(day ? day.muscles : []);
        }
    };

    const firstUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    useEffect(() => {
        getTodaysMuscles();
    }, [routine]);


    return (
        <View className='h-1/2'>
            <View className='mb-10 mx-5'>
                <View className="flex gap-4">
                    <View className="flex flex-row items-center w-full gap-3 justify-between">
                        
                        <AssistanceStatistic />

                        <View className="bg-zinc-900 h-32 flex-1 rounded-3xl flex shadow-md shadow-zinc-800">
                            <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                                <Text className="text-zinc-300">Este mes</Text>
                            </View>
                            <View className="flex-1 flex justify-center items-center px-2">
                                <Text className="text-3xl font-semibold text-zinc-200">35%</Text>
                                <Text className='text-zinc-400'>Mayor peso</Text>
                            </View>
                        </View>
                        <View className="bg-zinc-900 h-32 flex-1 rounded-3xl flex shadow-md shadow-zinc-800">
                            <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                                <Text className="text-zinc-300">Este mes</Text>
                            </View>
                            <View className="flex-1 flex justify-center items-center">
                                <Text className="text-3xl font-semibold text-zinc-200">82%</Text>
                                <Text className='text-zinc-400'>Uso de IA</Text>
                            </View>
                        </View>
                    </View>
                    <View className="bg-zinc-900 h-40 rounded-3xl flex shadow-lg shadow-zinc-800 w-full">
                        <View className='flex flex-row items-center justify-between border-b border-b-zinc-700 px-4 py-2'>
                            <Text className='text-yellow-400 text-xl font-semibold'>Tu rutina de hoy</Text>
                            <Link asChild href={`/home/todaysRoutine?day=${weekDays[date.getDay()]}`}>
                                <Pressable className='flex flex-row items-center gap-2'>
                                    <Text className='text-zinc-400'>Empezar</Text>
                                    <SimpleLineIcons name="arrow-right" size={10} color="#FACC15" />
                                </Pressable>
                            </Link>
                        </View>
                        <View className='flex flex-row items-center h-2/3 mx-10'>
                            <View className='flex flex-row items-start gap-5'>
                                <MaterialCommunityIcons name="weight-kilogram" size={55} color="white" />
                                <View className='flex'>
                                    <Text className='text-zinc-400 text-lg'>{getFormattedDate()}</Text>
                                    <View className='flex flex-row items-center gap-1'>
                                        {muscles.length !== 0 ? (
                                            muscles.map((muscle, index) => (
                                                <Text key={index} className='text-zinc-200 text-2xl'>
                                                    {firstUpperCase(muscle.name)}{index < muscles.length - 1 ? ', ' : ''}
                                                </Text>
                                            ))
                                        ) : (
                                            <Text className='text-zinc-200 text-2xl'>No tienes nada hoy</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <RoutinePreview />
        </View>
    )
}


