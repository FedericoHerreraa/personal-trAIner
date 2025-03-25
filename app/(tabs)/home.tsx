
import { View, Text, Image } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { StatisticsHomePage } from 'components/StatisticsHome';
import { HeaderSection } from 'components/HeaderSection';
import { RoutinePreview } from 'components/RoutinePreview';

export default function Home() {
    return (
        <View className='h-full w-full bg-zinc-950'>
            <ScreenLayout>
                <HeaderSection />

                <View>
                    <Text className='text-5xl ml-5 font-bold text-zinc-200'>Inicio</Text>
                </View>
                
                <StatisticsHomePage />

                <RoutinePreview />
            </ScreenLayout>
        </View>
    )
}