import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from 'context/AuthContext';

export const HeaderSection = () => {
    const router = useRouter();
    const { user } = useAuth()
    
    return (
        <View className='flex flex-row justify-between mt-5 px-5 pb-3'>
            <Text className='text-2xl text-zinc-400/80'>Bienvenido {user?.name}</Text>
            <Pressable
                onPress={() => router.push('/modal')}
                className="px-4 py-2rounded-lg"
            >
                 <FontAwesome5 name="user-alt" size={25} color="#919191" />
            </Pressable>
        </View>
    );
};
