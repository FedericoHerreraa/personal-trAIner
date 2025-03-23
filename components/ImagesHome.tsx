
import { View, Text, Image, ScrollView } from 'react-native';


export const ImagesHomePage = () => {
    return (
        <View className='mt-5 h-full'>
            <View className='h-2/4 w-[93%] mx-auto '>
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
            </View>
        </View>
    )
}