
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import { useRoutine } from 'context/RoutineContext';

export default function DayRoutine() {
    const [numberMuscles, setNumberMuscles] = useState(1);
    const [selectedValue, setSelectedValue] = useState('Bicep');
    const [pickerVisible, setPickerVisible] = useState(true);
    const { day } = useLocalSearchParams(); 
    const navigation = useNavigation();
    const { addMuscle, routine } = useRoutine()

    const addMuscleToContext = () => {
        setPickerVisible(false);

        const muscle = {
            name: selectedValue,
            exercises: []
        }

        if (typeof day === 'string') addMuscle(day.toLowerCase(), muscle, 1);

        console.log(routine)
    }
    
    useEffect(() => {
        if (day) navigation.setOptions({ title: `${day}` });
    }, [day, navigation]);

    return (
        <ScrollView className='bg-black h-full' showsVerticalScrollIndicator={false}>
            <View className='mx-5 mt-10 mb-40'>
                <View className='flex flex-row items-center justify-between mx-5 mb-5'>
                    <Text className='text-white text-2xl font-semibold'>Musculos</Text>
                    <Pressable onPress={() => setNumberMuscles(numberMuscles + 1)}>
                        <FontAwesome6 name="add" size={20} color="white" />
                    </Pressable>
                </View>
                
                <View className='flex gap-4'>    
                    {Array.from({ length: numberMuscles }).map((_, index) => (
                        <View className='bg-zinc-900 rounded-3xl p-5' key={index}>
                            <View className='flex flex-row items-center justify-between mx-5'>
                                <Text className='text-white text-3xl font-semibold'>{selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1).toLowerCase()}</Text>
                                {pickerVisible && (
                                    <Pressable onPress={addMuscleToContext}>
                                        <Text className='text-blue-500 font-semibold text-xl'>Guardar</Text>
                                    </Pressable>
                                )}
                            </View>
                            {pickerVisible ? (
                                <Picker
                                    style={{ width: 'auto', color: 'white', marginBottom: 0, height: 'auto' }}
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                >
                                    <Picker.Item label="Bicep" value="bicep" />
                                    <Picker.Item label="Tricep" value="tricep" />
                                    <Picker.Item label="Hombros" value="hombros" />
                                </Picker>
                            ) : (
                                <Link asChild href='/routine/exercise' className='mt-5'>
                                    <Pressable className='w-full border border-zinc-700 bg-zinc-800 py-3 rounded-xl flex flex-row items-center justify-center px-5'>
                                        <Text className='text-zinc-200 text-lg'>Elegir Ejercicios para: <Text className='text-white font-semibold text-xl'>{selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1).toLowerCase()}</Text></Text>
                                    </Pressable>
                                </Link>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}