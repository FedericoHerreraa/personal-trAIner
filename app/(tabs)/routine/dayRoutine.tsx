
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import { useRoutine } from 'context/RoutineContext';

export default function DayRoutine() {
    const [numberMuscles, setNumberMuscles] = useState(0);
    const [selectedValue, setSelectedValue] = useState('Bicep');
    const navigation = useNavigation();
    const { day } = useLocalSearchParams();
    const { addMuscle, routine } = useRoutine()

    const addMuscleToContext = () => {
        setNumberMuscles(0);

        const muscle = {
            name: selectedValue,
            exercises: []
        }

        addMuscle(day.toString().toLowerCase(), muscle, 1);

        console.log(routine)
    }

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
                                            {muscle.name.charAt(0).toUpperCase() + muscle.name.slice(1).toLowerCase()}
                                        </Text>
                                        <Pressable onPress={() => console.log('edit')}>
                                            <Text className='text-blue-500 font-semibold text-xl'>Editar</Text>
                                        </Pressable>
                                    </View>
                                    <Link asChild href='/routine/exercise' className='mt-5'>
                                        <Pressable className='w-full border border-zinc-700 bg-zinc-800 py-3 rounded-xl flex flex-row items-center justify-center px-5'>
                                            <Text className='text-zinc-200 text-lg'>
                                                Elegir Ejercicios para: {' '}
                                                <Text className='text-white font-semibold text-xl'>
                                                    {muscle.name.charAt(0).toUpperCase() + muscle.name.slice(1).toLowerCase()}
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
                                <Text className='text-white text-3xl font-semibold'>{selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1).toLowerCase()}</Text>
                                <Pressable onPress={addMuscleToContext}>
                                    <Text className='text-blue-500 font-semibold text-xl'>Guardar</Text>
                                </Pressable>
                            </View>
                            <Picker
                                style={{ width: 'auto', color: 'white', marginBottom: 0, height: 'auto' }}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Bicep" value="bicep" />
                                <Picker.Item label="Tricep" value="tricep" />
                                <Picker.Item label="Hombros" value="hombros" />
                            </Picker>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}