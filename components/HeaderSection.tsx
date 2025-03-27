import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from 'context/AuthContext';

export const HeaderSection = () => {
    const router = useRouter();
    const { user } = useAuth()
    
    return (
        <View className='flex flex-row justify-between items-center mt-5 px-5'>
            <Text className='text-2xl text-zinc-400/80'>Bienvenido {user?.name}</Text>
            <Pressable
                onPress={() => router.push('/modal')}
                className="px-4 rounded-lg"
            >
                {user?.profile_photo ? (
                    <Image
                        source={{ uri: user?.profile_photo }}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                ) : (
                    <FontAwesome5 name='user-circle' size={40} color='white' />
                )}
            </Pressable>
        </View>
    );
};
