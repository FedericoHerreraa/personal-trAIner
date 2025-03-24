
import { View, Text } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';

export default function Profile() {
    return (
        <ScreenLayout>
            <HeaderSection />
            <View className='flex flex-row justify-between'>
                <Text className='text-5xl ml-5 font-bold text-zinc-200'>Perfil</Text>
            </View>
        </ScreenLayout>
    )
}