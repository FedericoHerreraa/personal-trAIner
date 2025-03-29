
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import { useRoutine } from 'context/RoutineContext';

export default function DayRoutine() {
    const [numberMuscles, setNumberMuscles] = useState(1);
    const [selectedValue, setSelectedValue] = useState('Musculo');
    const [muscles, setMuscles] = useState([
        { label: 'Bicep', value: 'bicep' },
        { label: 'Tricep', value: 'tricep' },
        { label: 'Hombros', value: 'hombros' },
    ]);
    const navigation = useNavigation();
    const { day } = useLocalSearchParams();
    const { addMuscle, routine } = useRoutine()

    useEffect(() => {
        if (routine?.days && routine?.days.length > 0) {
            const dayRoutine = routine.days.find(d => d.day === day.toString().toLowerCase());
            if (!dayRoutine) return;
    
            setMuscles(prevMuscles =>
                prevMuscles.filter(m => !dayRoutine.muscles.some(muscle => muscle.name === m.value))
            );
        }
    }, [routine]);

    const addMuscleToContext = () => {
        setNumberMuscles(0);
        setSelectedValue('Musculo');

        const muscle = {
            name: selectedValue,
            exercises: []
        }

        addMuscle(day.toString().toLowerCase(), muscle, 1);
    }

    const firstUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    useEffect(() => { if (day) navigation.setOptions({ title: `${day}` }) }, [day, navigation]);

    return (
        <ScrollView className='bg-black h-full' showsVerticalScrollIndicator={false}>
            <View className='mx-5 mt-10 mb-40'>
                <View className='flex flex-row items-center justify-between mx-5 mb-5'>
                    <Text className='text-white text-2xl font-semibold'>Musculos</Text>
                    <Pressable
                        disabled={numberMuscles === 1}
                        onPress={() => setNumberMuscles(numberMuscles + 1)}
                    >
                        <FontAwesome6 name="add" size={20} color="white" />
                    </Pressable>
                </View>

                <View className='flex gap-4'>
                    {routine?.days && routine?.days.length > 0 &&
                        (() => {
                            const dayRoutine = routine.days.find(d => d.day === day.toString().toLowerCase());
                            if (!dayRoutine) return null;

                            return dayRoutine.muscles.map((muscle, index) => (
                                <View className='bg-zinc-900 rounded-3xl p-5' key={index}>
                                    <View className='flex flex-row items-center justify-between mx-5'>
                                        <Text className='text-white text-3xl font-semibold'>
                                            {firstUpperCase(muscle.name)}
                                        </Text>
                                        <Pressable onPress={() => console.log('edit')}>
                                            <Text className='text-blue-500 font-semibold text-xl'>Editar</Text>
                                        </Pressable>
                                    </View>

                                    {muscle.exercises.length !== 0 && (
                                        <View className='bg-zinc-800 rounded-2xl p-3 mt-5 flex gap-2'>
                                            {muscle.exercises.map((exercise, index) => (
                                                <View key={index}>
                                                    <View className='flex flex-row items-center justify-between mx-5'>
                                                        <Text className='text-white text-xl font-semibold'>
                                                            {firstUpperCase(exercise.name)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                    
                                    <Link asChild href={`/routine/exercise?muscle=${muscle.name}&day=${encodeURIComponent(day.toString())}`} className='mt-5'>
                                        <Pressable className='w-full border border-zinc-700 bg-zinc-800 py-3 rounded-xl flex flex-row items-center justify-center px-5'>
                                            <Text className='text-zinc-200 text-lg'>
                                                Elegir Ejercicios para: {' '}
                                                <Text className='text-white font-semibold text-xl'>
                                                    {firstUpperCase(muscle.name)}
                                                </Text>
                                            </Text>
                                        </Pressable>
                                    </Link>
                                </View>
                            ));
                        })()
                    }

                    {numberMuscles === 1 && (
                        <View className='bg-zinc-900 rounded-3xl p-5'>
                            <View className='flex flex-row items-center justify-between mx-5'>
                                <Text className='text-white text-3xl font-semibold'>{firstUpperCase(selectedValue)}</Text>
                                <Pressable disabled={selectedValue === 'Musculo'} onPress={addMuscleToContext}>
                                    <Text className='text-blue-500 font-semibold text-xl'>Guardar</Text>
                                </Pressable>
                            </View>
                            <Picker
                                style={{ width: 'auto', color: 'white', marginBottom: 0, height: 'auto' }}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            >
                                {muscles.map((muscle, index) => (
                                    <Picker.Item key={index} label={muscle.label} value={muscle.value} />
                                ))}
                            </Picker>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

