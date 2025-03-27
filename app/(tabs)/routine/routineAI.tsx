
import { ScreenLayout } from 'components/ScreenLayout';
import { Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function RoutineAI() {
    const router = useRouter(); 

    return (
        <ScreenLayout bg='bg-zinc-300'>
            <View className='flex items-center mt-14'>
                <Text className='text-2xl font-semibold'>Crear rutina con <Text className='text-violet-500'>IA</Text></Text>
                <Pressable onPress={() => router.back()}>
                    <Text className='text-lg bg-zinc-800 text-white p-2 rounded-xl mt-10'>Cerrar</Text>
                </Pressable>
            </View>
        </ScreenLayout>
    )
}