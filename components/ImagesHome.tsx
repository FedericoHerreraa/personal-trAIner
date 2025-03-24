
import { View, Text, Image, ScrollView } from 'react-native';


export const ImagesHomePage = () => {
    return (
        <View className='mt-10 h-1/3 mx-auto w-[95%]'>
            {/* <View className='h-2/4 w-[93%] mx-auto '>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex flex-row items-center gap-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                source={require("assets/images/image.jpeg")}
                                style={{ width: 200, height: 350, borderRadius: 20 }}
                                className=''
                            />
                        ))}
                    </View>
                </ScrollView>
            </View> */}

            <View className="flex gap-2">
                <View className="flex flex-row items-center w-full gap-2 justify-between">
                    <View className="bg-zinc-800 h-32 flex-1 rounded-xl flex">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                        </View>
                    </View>
                    <View className="bg-zinc-800 h-32 flex-1 rounded-xl flex">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                        </View>
                    </View>
                    <View className="bg-zinc-800 h-32 flex-1 rounded-xl flex">
                        <View className="border-b border-b-zinc-700 h-fit items-center px-4 py-2">
                            <Text className="text-zinc-300">Este mes</Text>
                        </View>
                        <View className="flex-1 flex justify-center items-center">
                            <Text className="text-3xl font-semibold text-zinc-200">50%</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-zinc-800 h-40 w-full rounded-xl" />
            </View>
        </View>
    )
}