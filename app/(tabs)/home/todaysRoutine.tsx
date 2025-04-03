import { useRoutine } from 'context/RoutineContext';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Pressable, FlatList, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useRef, useState } from 'react';

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
            title: 'Rutina de hoy',
            description: 'Estos son los músculos que trabajarás hoy',
        },
    ];

    if (selectedDay) {
        data = data.concat(
            selectedDay.muscles.map((muscle) => ({
                title: firstUpperCase(muscle.name),
                description: `Duración estimada: ${Math.floor(calculateTime())} min`,
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
        <ScrollView className='h-full bg-black'>
            <View className='bg-black h-full flex w-full items-center pt-10'>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={({ item }) => ( 
                        <View style={{ width }} className='px-10 flex gap-5 pb-10'>
                            <Text className='text-white text-3xl font-semibold'>{item.title}</Text>
                            <Text className='text-zinc-200'>{item.description}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.title}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />
                <Pressable
                    onPress={handleNext}
                    className='bg-blue-900 border border-blue-500 mt-20 px-10 py-3 rounded-full flex flex-row items-center gap-3'
                >
                    <Text className='text-white text-2xl'>{currentIndex === 0 ? "Comenzar rutina" : "Siguiente"}</Text>
                    <AntDesign name="arrowright" size={24} color="white" />
                </Pressable>
            </View>
        </ScrollView>
    );
}