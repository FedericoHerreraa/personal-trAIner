
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ModalHeader } from 'components/ModalHeader';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useRoutine } from 'context/RoutineContext';
import { Muscle } from 'types/types';

export default function Exercise() {
    const [selectedValue, setSelectedValue] = useState<string>('Curl de bicep');
    const [numberExercises, setNumberExercises] = useState(1);
    const { day, muscle } = useLocalSearchParams();
    const { routine, addExercise } = useRoutine()

    const addExerciseToContext = () => {
        setNumberExercises(0);

        const exercise = {
            name: selectedValue,
            series: 3,
            repetitions: 10,
            weight: 0
        }

        addExercise(
            day.toString().toLowerCase(),
            { name: muscle.toString().toLowerCase(), exercises: [exercise] },
            exercise
        );
    }

    const firstUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <View className='bg-zinc-800 h-full'>
            <ModalHeader title='Rutina' />

            <ScrollView>
                <View className='flex flex-row items-end justify-between mx-10 mt-16'>
                    <View className='flex items-start'>
                        <Text className='text-zinc-400 text-lg'>{firstUpperCase(muscle.toString())}</Text>
                        <Text className='text-white text-3xl font-semibold'>Ejercicios</Text>
                    </View>
                    <Pressable 
                        onPress={() => setNumberExercises(numberExercises + 1)}
                        disabled={numberExercises === 1} 
                        className='mb-2'
                    >
                        <FontAwesome6 name="add" size={20} color="white" />
                    </Pressable>
                </View>

                {routine?.days && routine?.days.length > 0 &&
                    (() => {
                        const dayRoutine = routine.days.find(d => d.day === day.toString().toLowerCase());
                        if (dayRoutine === undefined || dayRoutine === null) return null;

                        const muscleInRoutine: Muscle | undefined = dayRoutine.muscles.find(m => m.name.toLowerCase() === muscle.toString().toLowerCase());

                        if (!muscleInRoutine) {
                            console.error('Muscle not found in routine');
                            return null;
                        }

                        return muscleInRoutine.exercises.map((exercise, index) => (
                            <View className='bg-zinc-300 rounded-3xl p-5 mx-5 mt-10' key={index}>
                                <View className='flex flex-row items-center justify-between mx-5'>
                                    <Text className='text-black text-3xl font-semibold'>
                                        {firstUpperCase(exercise.name)}
                                    </Text>
                                    <Pressable onPress={() => console.log('edit')}>
                                        <Text className='text-blue-500 font-semibold text-xl'>Editar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    })()
                }

                {numberExercises === 1 && (
                    <View className='bg-zinc-300 rounded-3xl p-5 mx-5 mt-10'>
                        <View className='flex flex-row items-center justify-between mx-5'>
                            <Text className='text-black text-3xl font-semibold'>{firstUpperCase(selectedValue)}</Text>
                            <Pressable onPress={addExerciseToContext} >
                                <Text className='text-blue-800 font-semibold text-xl'>Guardar</Text>
                            </Pressable>
                        </View>
                        <Picker
                            style={{ width: 'auto', color: 'white', marginBottom: 0, height: 'auto' }}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item style={{ color: 'white' }} label="Curl de Bicep" value="curl-bicep" />
                            <Picker.Item label="Polea Tricep" value="polea" />
                            <Picker.Item label="Dominadas" value="dominadas" />
                        </Picker>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}