
import { ScreenLayout } from 'components/ScreenLayout';
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

export default function Edit() {
    const { day, muscle, exercise } = useLocalSearchParams()
    const router = useRouter();

    let content;

    if (exercise !== undefined) {
        content = (
            <View className='bg-zinc-800 h-full'>
                <Text className='text-white'>Edit exercise</Text>
            </View>
        )
        console.log('edit exercise')
    } else if (exercise === undefined && muscle !== undefined) {
        content = (
            <View className='bg-zinc-800 h-full'>
                <Text className='text-white'>Edit muscle</Text>
            </View>
        )
        console.log('edit muscle')
    } else if (exercise === undefined && muscle === undefined && day !== undefined) {
        content = (
            <View className='bg-zinc-800 h-full'>
                <Text className='text-white'>Edit duration</Text>
            </View>
        )
        console.log('edit day')
    }

    return (
        <ScreenLayout bg='bg-zinc-600'>
            <View className='flex items-center pt-20'>
                <View className='flex-1 justify-center items-center'>
                    {content}
                </View>  
                <Pressable onPress={() => router.back()} className='bg-zinc-800 px-5 py-2 rounded-2xl'>
                    <Text className='text-white'>Cerrar</Text>
                </Pressable>
            </View>
        </ScreenLayout>
    )
}