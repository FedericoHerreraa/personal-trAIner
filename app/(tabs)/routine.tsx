
import { View, Text, Button } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';

export default function Routine() {
    return (
        <ScreenLayout>
            <HeaderSection />
            <View className='flex flex-row justify-between'>
                <Text className='text-4xl ml-5 font-bold'>Rutina</Text>
            </View>
        </ScreenLayout>
    )
}