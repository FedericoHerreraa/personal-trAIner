
import { View, Text, Pressable, ScrollView, Switch } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ModalHeader } from 'components/ModalHeader';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useRoutine } from 'context/RoutineContext';
import { Muscle } from 'types/types';

export default function Exercise() {
    const [selectedValue, setSelectedValue] = useState<string>('Curl de bicep');
    const [series, setSeries] = useState(0);
    const [repetitions, setRepetitions] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bothWeight, setBothWeight] = useState(false);

    const [numberExercises, setNumberExercises] = useState(1);
    const { day, muscle } = useLocalSearchParams();
    const { routine, addExercise } = useRoutine()

    const addExerciseToContext = () => {
        setNumberExercises(0);

        const exercise = {
            name: selectedValue,
            series: series,
            repetitions: repetitions,
            weight: bothWeight ? weight : [weight, weight],
        }

        addExercise(
            day.toString().toLowerCase(),
            { name: muscle.toString().toLowerCase(), exercises: [exercise] },
            exercise
        );
    }

    const firstUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <View className='bg-zinc-800 h-full pb-5'>
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
                            <View className='bg-zinc-700 rounded-2xl p-5 mx-5 mt-5' key={index}>
                                <View className='flex flex-row items-center justify-between mx-5'>
                                    <Text className='text-zinc-300 text-3xl font-semibold'>
                                        {firstUpperCase(exercise.name)}
                                    </Text>
                                    <Pressable onPress={() => console.log('edit')}>
                                        <Text className='text-blue-400 font-semibold text-xl'>Editar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    })()
                }

                {numberExercises === 1 && (
                    <View className='bg-zinc-800 border border-zinc-700 rounded-3xl p-5 mx-5 mt-10'>
                        <View className='flex flex-row items-center justify-between mx-5'>
                            <Text className='text-zinc-300 text-3xl font-semibold'>{firstUpperCase(selectedValue)}</Text>
                            <Pressable onPress={addExerciseToContext} >
                                <Text className='text-blue-400 font-semibold text-xl'>Guardar</Text>
                            </Pressable>
                        </View>
                        <View className='mx-5 mt-5'>
                            <Text className='text-zinc-300 text-lg'>Series</Text>
                            <View className='flex flex-row items-center justify-between'>
                                <Pressable onPress={() => setSeries(series - 1)} disabled={series === 0}>
                                    <FontAwesome6 name="minus" size={20} color="white" />
                                </Pressable>
                                <Text className='text-zinc-300 text-3xl font-semibold'>{series}</Text>
                                <Pressable onPress={() => setSeries(series + 1)}>
                                    <FontAwesome6 name="plus" size={20} color="white" />
                                </Pressable>
                            </View>
                        </View>
                        <View className='mx-5 mt-5 border-y border-y-zinc-600 py-5'>
                            <Text className='text-zinc-300 text-lg'>Repeticiones</Text>
                            <View className='flex flex-row items-center justify-between'>
                                <Pressable onPress={() => setRepetitions(repetitions - 1)} disabled={repetitions === 0}>
                                    <FontAwesome6 name="minus" size={20} color="white" />
                                </Pressable>
                                <Text className='text-zinc-300 text-3xl font-semibold'>{repetitions}</Text>
                                <Pressable onPress={() => setRepetitions(repetitions + 1)}>
                                    <FontAwesome6 name="plus" size={20} color="white" />
                                </Pressable>
                            </View>
                        </View>
                        <View className='mx-5 mt-5 flex flex-row justify-between items-center w-full'>
                            <View className='w-1/2'>
                                <Text className='text-zinc-300 text-lg'>{bothWeight ? 'Pesos' : 'Peso'}</Text>
                                <View className='flex flex-row items-center justify-between'>
                                    <Pressable onPress={() => setWeight(weight - 1)} disabled={weight === 0}>
                                        <FontAwesome6 name="minus" size={20} color="white" />
                                    </Pressable>
                                    <Text className='text-zinc-300 text-3xl font-semibold'>{weight}</Text>
                                    <Pressable onPress={() => setWeight(weight + 1)}>
                                        <FontAwesome6 name="plus" size={20} color="white" />
                                    </Pressable>
                                </View>
                            </View>
                            <View className='w-1/2 flex items-center gap-4'>
                                <Text className='text-zinc-400 font-semibold'>Peso por lado</Text>
                                <Switch
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setBothWeight(!bothWeight)}
                                    value={bothWeight}
                                />
                            </View>
                        </View>
                        <Picker
                            style={{ width: 'auto', color: 'white', marginBottom: 0, height: 'auto' }}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Curl de Bicep" value="curl-bicep" color='white' />
                            <Picker.Item label="Polea Tricep" value="polea" color='white' />
                            <Picker.Item label="Dominadas" value="dominadas" color='white' />
                        </Picker>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}