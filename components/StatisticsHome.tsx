
import { View, Text, Image, ScrollView } from 'react-native';


export const StatisticsHomePage = () => {
    return (
        <View className='mt-10 h-1/3 mx-5'>
            <View className="flex gap-3">
                <View className="flex flex-row items-center w-full gap-3 justify-between">
                    <View className="bg-zinc-800 h-32 flex-1 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                        </View>
                    </View>
                    <View className="bg-zinc-800 h-32 flex-1 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                        </View>
                    </View>
                    <View className="bg-zinc-800 h-32 flex-1 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-zinc-800 h-40 rounded-2xl flex shadow-lg shadow-zinc-800 border border-zinc-700 w-full" />
            </View>
        </View>
    )
}

