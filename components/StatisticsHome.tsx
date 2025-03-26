
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const StatisticsHomePage = () => {
    const getFormattedDate = () => {
        const date = new Date();
        
        const formatter = new Intl.DateTimeFormat('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    
        const formattedDate = formatter.format(date);
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    return (
        <View className='h-1/3 mx-5'>
            <View className="flex gap-4">
                <View className="flex flex-row items-center w-full gap-3 justify-between">
                    <View className="bg-zinc-900 h-32 flex-1 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-2 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                            <Text className='text-zinc-400'>Asistencia</Text>
                        </View>
                    </View>
                    <View className="bg-zinc-900 h-32 flex-1 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center px-2">
                            <Text className="text-3xl font-semibold text-zinc-200">35%</Text>
                            <Text className='text-zinc-400'>Mayor peso</Text>
                        </View>
                    </View>
                    <View className="bg-zinc-900 h-32 flex-1 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">82%</Text>
                            <Text className='text-zinc-400'>Uso de IA</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-zinc-900 h-40 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700 w-full">
                    <View className='flex flex-row items-center justify-between border-b border-b-zinc-700 px-4 py-2 h-1/3'>
                        <Text className='text-yellow-400 text-xl font-semibold'>Tu rutina de hoy</Text>
                        <Text className='text-zinc-400'>Ver mas</Text>
                    </View>
                    <View className='flex flex-row items-center h-2/3 mx-10'>
                        <View className='flex flex-row items-start gap-5'>    
                            <Feather name="pie-chart" size={55} color="white" />
                            <View className='flex'>
                                <Text className='text-zinc-400 text-lg'>{getFormattedDate()}</Text>
                                <Text className='text-zinc-200 text-2xl'>Pecho, biceps, triceps</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

