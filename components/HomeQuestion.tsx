
import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';


export const HomeQuestion = () => {
    const [isTraining, setIsTraining] = useState<boolean>();
    const [message, setMessage] = useState('Hoy entrenaste?');

    const handleResponse = (response: boolean) => {
        setIsTraining(response);
        setMessage('Respuesta registrada!')
    }
    
    return (
        <View className='mx-5 mb-7'>
            <View className='border-[0.5px] border-yellow-400 rounded-2xl py-3 px-3 bg-zinc-800 flex flex-row items-center justify-between'>
                <Text className='text-zinc-300 font-semibold text-2xl'>{message}</Text>
                {isTraining === undefined && (
                    <View className='flex flex-row items-center gap-4'>
                        <AntDesign onPress={() => handleResponse(true)} name="checkcircle" size={24} color="green" />
                        <MaterialIcons onPress={() => handleResponse(true)} name="cancel" size={28} color="red" />
                    </View>
                )}
            </View>
        </View>
    )
}