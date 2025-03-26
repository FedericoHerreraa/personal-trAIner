
import { View, Text, Pressable } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export const WeekDays = () => {
    return (
        <View>
            <Text className='text-zinc-200 text-xl mb-1 mx-3'>Dias de la semana</Text>
            <View className='w-full h-fit bg-zinc-900 rounded-2xl mt-2 px-3 py-5 flex gap-7 shadow-lg shadow-zinc-800 border border-zinc-70'>
                {weekDats.map((day, index) => (
                    <Link asChild href="/routine/stack" key={index}>
                        <Pressable className="w-full flex flex-row items-center justify-between border border-zinc-700 rounded-xl px-5 py-4 gap-2">
                            <Text className="text-zinc-300 font-semibold text-xl">{day.name}</Text>
                            <SimpleLineIcons name="arrow-right" size={15} color="white" />
                        </Pressable>
                    </Link>
                ))}
            </View>
        </View>
    )
}

const weekDats = [
    {
        name: 'Lunes',
    },
    {
        name: 'Martes',
    },
    {
        name: 'Miercoles',
    },
    {
        name: 'Jueves',
    },
    {
        name: 'Viernes',
    },
]