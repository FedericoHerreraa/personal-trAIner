
import { View, Text, Pressable } from 'react-native';
import { SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';



export const WeekDays = () => {
    return (
        <View>
            <View className='flex flex-row items-center justify-between mx-5 mb-1'>
                <Text className='text-zinc-200 text-xl font-semibold'>Dias de la semana</Text>
                <Ionicons name="today-outline" size={20} color="white" />
            </View>
            <View className='w-full h-fit bg-zinc-900 rounded-2xl mt-2 mb-20 px-3 py-5 flex gap-7 shadow-lg shadow-zinc-800 border border-zinc-70'>
                {weekDats.map((day, index) => (
                    <Link asChild href={`/routine/dayRoutine?day=${encodeURIComponent(day.name)}`} key={index}>
                        <Pressable className="w-full flex flex-row items-center justify-between border border-zinc-700/40 rounded-3xl px-5 py-4 gap-2">
                            <View className='flex items-center flex-row gap-1'>
                            <Entypo name="dot-single" size={24} color="white" />
                                <Text className="text-zinc-300 font-semibold text-xl">{day.name}</Text>
                            </View>
                            <SimpleLineIcons name="arrow-right" size={15} color="#EAB308" />
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
    {
        name: 'Sabado',
    },
    {
        name: 'Domingo',
    },
]