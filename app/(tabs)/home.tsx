
import { View, Text, Image } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { ImagesHomePage } from 'components/ImagesHome';
import { HeaderSection } from 'components/HeaderSection';
import { BlurView } from 'expo-blur';
import { RoutinePreview } from 'components/RoutinePreview';

export default function Home() {
    return (
        <View className='h-full w-full bg-zinc-900'>
            {/* <Image source={require("assets/images/image.jpeg")} className='absolute top-0 bottom-0 right-0 left-0 opacity-50'/> */}
            {/* <BlurView intensity={100} tint="light" className="absolute top-0 bottom-0 right-0 left-0 w-full h-full" /> */}

            <ScreenLayout>
                <HeaderSection />

                <View>
                    <Text className='text-5xl ml-5 font-bold text-zinc-200'>Inicio</Text>
                </View>
                
                <ImagesHomePage />

                <RoutinePreview />
            </ScreenLayout>
        </View>
    )
}