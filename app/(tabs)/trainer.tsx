
import { View, Text } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';

export default function Trainer() {
    return (
        <ScreenLayout>
            <HeaderSection />

            <View className='flex flex-row justify-between'>
                <Text className='text-4xl ml-5 font-bold'>TrAIner</Text>
            </View>
        </ScreenLayout>
    )
}