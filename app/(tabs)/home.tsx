
import { View, Text } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { RoutineProgress } from 'components/RoutineProgress';
import { HeaderSection } from 'components/HeaderSection';

export default function Home() {
    return (
        <ScreenLayout>
            <HeaderSection />

            {/* <View className='mt-5'>
                <Text className='text-4xl ml-5 font-bold'>Inicio</Text>
            </View>
            
            <RoutineProgress /> */}
        </ScreenLayout>
    )
}