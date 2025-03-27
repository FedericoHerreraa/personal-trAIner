
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function DayRoutine() {
    const [numberMuscles, setNumberMuscles] = useState(1);
    const { day } = useLocalSearchParams(); 
    const navigation = useNavigation(); 

    useEffect(() => {
        if (day) navigation.setOptions({ title: `${day}` });
    }, [day, navigation]);

    return (
        <ScrollView className='bg-black h-full' showsVerticalScrollIndicator={false}>
            <View className='mx-5 mt-10 mb-40'>
                <View className='flex flex-row items-center justify-between mx-2 mb-5'>
                    <Text className='text-white text-2xl font-semibold'>Musculos</Text>
                    <Pressable onPress={() => setNumberMuscles(numberMuscles + 1)}>
                        <FontAwesome6 name="add" size={20} color="white" />
                    </Pressable>
                </View>
                
                <View className='flex gap-4'>    
                    {Array.from({ length: numberMuscles }).map((_, index) => (
                        <Link asChild href='/routine/exercise' key={index}>
                            <Pressable className='w-full bg-zinc-900 h-20 rounded-3xl flex justify-center px-5'>
                                <Text className='text-white text-xl'>Hombros</Text>
                            </Pressable>
                        </Link>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}