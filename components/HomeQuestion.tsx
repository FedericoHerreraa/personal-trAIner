
import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
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
                    <View className='flex flex-row items-end gap-14'>
                        <View>
                            <Text className='text-zinc-400 text-lg mb-1'>Tu respuesta nos importa</Text>
                            <Text className='text-zinc-200 text-3xl'>{isTraining !== undefined ? 'Ya registramos tu respuesta' : '¿Entrenaste hoy?'}</Text>
                        </View>
                        {isTraining === undefined && (
                            <View className='flex flex-row items-center gap-5'>
                                <AntDesign onPress={() => handleResponse(true)} name="checkcircle" size={27} color="#7dbf69" />
                                <MaterialIcons onPress={() => handleResponse(true)} name="cancel" size={33} color="#c94949" />
                            </View>
                        )}
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}