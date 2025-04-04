
import { EditDuration } from 'components/editComponents/EditDuration';
import { EditExercise } from 'components/editComponents/EditExercise';
import { EditMuscle } from 'components/editComponents/EditMuscle';
import { ScreenLayout } from 'components/ScreenLayout';
import { useRouter, useLocalSearchParams } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

export default function Edit() {
    const { day, muscle, exercise } = useLocalSearchParams()
    const router = useRouter();

    let content;

    if (exercise !== undefined) content = <EditExercise />
    else if (exercise === undefined && muscle !== undefined) content = <EditMuscle/>
    else if (exercise === undefined && muscle === undefined && day !== undefined) content = <EditDuration />

    return (
        <ScreenLayout bg='bg-zinc-600'>
            <View className='flex items-center pt-20 h-full'>
                {content}
                <View className='absolute bottom-10 flex gap-5'>
                    <Pressable>
                        <Text className='text-zinc-300 text-2xl border border-zinc-900 bg-zinc-700 px-5 py-2 rounded-2xl'>Guardar cambios</Text>
                    </Pressable>
                    <Pressable onPress={() => router.back()} className='flex items-center  px-5 py-2 rounded-2xl w-fit'>
                        <Text className='text-white text-2xl'>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenLayout>
    )
}