
import { View, Text } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';

export default function Trainer() {
    return (
        <ScreenLayout bg='bg-black'>
            <HeaderSection />

            <View className='flex flex-row justify-between'>
                <Text className='text-5xl ml-5 font-bold text-zinc-200'>TrAIner</Text>
            </View>
        </ScreenLayout>
    )
}