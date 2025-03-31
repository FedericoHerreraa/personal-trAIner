
import { View, Text, ScrollView } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { StatisticsHomePage } from 'components/StatisticsHome';
import { HeaderSection } from 'components/HeaderSection';
import { RoutinePreview } from 'components/RoutinePreview';
import { HomeQuestion } from 'components/HomeQuestion';
import { useAuth } from 'context/AuthContext';
import { useEffect } from 'react';

export default function Home() {
    const { getSession } = useAuth()

    useEffect(() => { getSession() }, [])

    return (
        <ScreenLayout bg='bg-black'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderSection />

                <View>
                    <Text className='text-5xl ml-5 font-bold text-zinc-200'>Inicio</Text>
                </View>

                <View className='my-10'>
                    <HomeQuestion />
                    <StatisticsHomePage />
                    <RoutinePreview />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}