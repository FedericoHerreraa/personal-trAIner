
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';


export const HomeQuestion = () => {
    const [isTraining, setIsTraining] = useState<boolean>();
    const [message, setMessage] = useState('Hoy entrenaste?');

    const handleResponse = (response: boolean) => {
        setIsTraining(response);
        setMessage('Respuesta registrada!')
    }

    return (
        <View className='mx-5 mb-7'>
            <LinearGradient
                colors={['#8B5CF6', '#EAB308']}
                style={{ padding: 1, borderRadius: 15 }}
            >
                <View className=' p-5 bg-zinc-900 h-fit rounded-2xl  flex justify-center gap-2'>
                    <View className='flex flex-row items-center gap-5'>
                        <View>
                            <Text className='text-zinc-400 text-lg mb-1'>Tu respuesta nos importa</Text>
                            <Text className='text-zinc-200 text-3xl'>{isTraining !== undefined ? 'Ya registramos tu respuesta' : '¿Entrenaste hoy?'}</Text>
                        </View>
                        {isTraining === undefined && (
                            <Pressable onPress={() => handleResponse(true)} className='bg-zinc-800 border border-zinc-700 p-1 rounded-xl h-full w-[35%]'>
                                <View className='flex gap-2 justify-center items-center mt-3'>
                                    <MaterialCommunityIcons name="cursor-default-click-outline" size={24} color="white" />
                                    <Text className='text-white font-semibold'>Confirmar</Text>
                                </View>
                            </Pressable>
                        )}
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}