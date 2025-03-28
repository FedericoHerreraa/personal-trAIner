

import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export const ModalHeader = ({ title } : { title: string }) => {
    const router = useRouter()

    return (
        <View className='py-5'>
            <View className='absolute top-0 right-0 m-5'>
                <Text className='text-blue-500 font-semibold text-xl'>Cerrar</Text>
            </View>
            <Pressable onPress={() => router.back()} className='flex justify-center flex-row'>
                <Text className='text-white text-2xl font-semibold'>{title}</Text>
            </Pressable>
        </View>
    )
}