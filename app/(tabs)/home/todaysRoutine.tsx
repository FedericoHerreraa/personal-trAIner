import { useRoutine } from 'context/RoutineContext';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, FlatList, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Exercise } from 'types/types';

export default function TodaysRoutine() {
    const { routine } = useRoutine();
    const { day } = useLocalSearchParams();
    const { width } = Dimensions.get("window");

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    if (!routine) {
        return (
            <View className='bg-black h-full flex items-center pt-20'>
                <Text className='text-white text-3xl'>No hay rutina cargada</Text>
            </View>
        );
    }

    const firstUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const calculateTime = () => {
        if (!routine) return 0;
        let time = 0;

        routine.days.forEach((dayRoutine) => {
            if (dayRoutine.day === day) {
                const amountMuscles = dayRoutine.muscles.length;
                time = dayRoutine.duration / amountMuscles;
            }
        });

        return time;
    };

    const selectedDay = routine.days.find((dayRoutine) => dayRoutine.day === day);

    let data = [
        {
            type: 'list',
            title: 'Rutina de hoy',
            description: 'Estos son los músculos que trabajarás hoy',
            muscles: selectedDay?.muscles ?? [],
        },
    ];

    if (selectedDay) {
        data = data.concat(
            selectedDay.muscles.map((muscle) => ({
                type: 'muscle',
                title: firstUpperCase(muscle.name),
                description: `Duración estimada: ${Math.floor(calculateTime())} min`,
                muscles: [], 
                exercises: muscle.exercises
            }))
        );
    }

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        }
    };

    return (
        <View className='h-full bg-black'>
            <View className='bg-black flex w-full items-center pt-10 h-3/4'>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={({ item }) => {
                        if (item.type === 'list') {
                            return (
                                <ScrollView style={{ width }} className='px-10' contentContainerStyle={{ paddingBottom: 100 }}>
                                    <Text className='text-white text-4xl font-semibold mb-5'>{item.title}</Text>
                                    <Text className='text-zinc-200 mb-7'>{item.description}</Text>
                                    <View className='flex gap-5'>
                                        {item.muscles.map((muscle: any) => (
                                            <View
                                                key={muscle.name}
                                                className='flex flex-row items-center w-full border border-yellow-100 px-10 py-5 rounded-2xl gap-7'
                                            >
                                                <MaterialCommunityIcons name="weight-lifter" size={30} color="white" />
                                                <Text className='text-white text-3xl'>{firstUpperCase(muscle.name)}</Text>
                                                <View className='flex flex-row items-center gap-2'>
                                                    <Feather name="clock" size={20} color="gray" />
                                                    <Text className='text-zinc-200'>{calculateTime()} min</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            );
                        } else if (item.type === 'muscle') {
                            const exercises = calculateTime() / item.exercises.length;
                            return (
                                <View style={{ width }}>
                                    <ScrollView className=' pb-10 border border-yellow-100 shadow-md shadow-zinc-800 mx-10 px-10 rounded-3xl py-10'>
                                        <View className='flex items-center gap-5'>
                                            <MaterialCommunityIcons name="weight-lifter" size={80} color="white" />
                                            <Text className='text-white text-4xl font-semibold'>{item.title}</Text>
                                            <Text className='text-zinc-200 mb-5'>{item.description}</Text>
                                            {item.exercises.map((exercise: Exercise, index: number) => (
                                                <View
                                                    key={index}
                                                    className='flex items-center w-full border-t border-t-zinc-600 pt-7 gap-5'
                                                >
                                                    
                                                    <Text className='text-white text-3xl font-semibold'>{firstUpperCase(exercise.name)}</Text>
                                                    <View className='flex flex-row items-center gap-3'>
                                                        <Text className='text-zinc-300'>Reps: <Text className='text-white font-semibold'>{exercise.repetitions}</Text></Text>
                                                        <Text className='text-zinc-300'>Series: <Text className='text-white font-semibold'>{exercise.series}</Text></Text>
                                                    </View>

                                                    {Array.isArray(exercise.weight) ? (
                                                        <View className='flex flex-row items-center gap-3'>
                                                            {exercise.weight.map((weight, index) => (
                                                                <Text key={index} className='text-white font-semibold'>{weight} kg</Text>
                                                            ))}
                                                            <MaterialCommunityIcons name="weight-kilogram" size={20} color="gray" />
                                                        </View>
                                                    ) : (
                                                        <View className='flex flex-row items-center gap-3'>
                                                            <Text className='text-zinc-300'>Peso: <Text className='text-white font-semibold'>{exercise.weight} kg</Text></Text>
                                                        </View>
                                                    )}

                                                    <View className='flex flex-row items-center gap-2'>
                                                        <Feather name="clock" size={20} color="gray" />
                                                        <Text className='text-white font-semibold'>{exercises} min</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                            );
                        }
                        return null;
                    }}
                    keyExtractor={(item, index) => `${item.type}-${item.title}-${index}`}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />

            </View>
            <View className='flex flex-row justify-center gap-3 items-center mt-10'>
                {currentIndex !== 0 && (
                    <Pressable
                        onPress={() => {
                            const newIndex = currentIndex - 1;
                            setCurrentIndex(newIndex);
                            flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
                        }}
                        className='bg-blue-900 border border-blue-500 px-5 py-4 rounded-full flex flex-row items-center gap-3 ml-5'
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </Pressable>
                )}
                <Pressable
                    onPress={handleNext}
                    className='bg-blue-900 border border-blue-500 px-10 py-3 rounded-full flex flex-row items-center gap-3'
                >
                    <Text className='text-white text-2xl'>{currentIndex === 0 ? "Comenzar rutina" : "Siguiente"}</Text>
                    <AntDesign name="arrowright" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    );
}