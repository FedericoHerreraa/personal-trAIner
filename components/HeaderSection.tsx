import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export const HeaderSection = () => {
    const router = useRouter();
    return (
        <View className='flex flex-row justify-between mt-5 px-5 pb-3'>
            <Text className='text-2xl text-zinc-700/80'>Personal Tr
                <Text className='text-violet-600 mx-1'>AI</Text>
                ner
            </Text>
            <Pressable
                onPress={() => router.push('/modal')}
                className="px-4 py-2rounded-lg"
            >
                 <FontAwesome5 name="user-alt" size={25} color="#3b3b3b" />
            </Pressable>
        </View>
    );
};
