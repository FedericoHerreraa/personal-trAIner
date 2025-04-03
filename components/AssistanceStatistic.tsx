
import { View, Text } from 'react-native';

export const AssistanceStatistic = () => {
    return (
        <View className="bg-zinc-900 h-32 flex-1 rounded-3xl flex shadow-md shadow-zinc-800">
            <View className="border-b border-b-zinc-700 h-fit items-center px-2 py-2">
                <Text className="text-zinc-300">Esta Semana</Text>
            </View>
            <View className="flex-1 flex justify-center items-center">
                <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                <Text className='text-zinc-400'>Mas</Text>
            </View>
        </View>
    )
}