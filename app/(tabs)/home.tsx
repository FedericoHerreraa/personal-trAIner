
import { View, Text } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { RoutineProgress } from 'components/RoutineProgress';
import { HeaderSection } from 'components/HeaderSection';

export default function Home() {
    return (
        <ScreenLayout>
            <HeaderSection />

            <View>
                <Text className='text-5xl ml-5 font-bold'>Inicio</Text>
            </View>
            
            <RoutineProgress />
        </ScreenLayout>
    )
}