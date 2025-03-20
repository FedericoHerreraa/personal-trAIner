
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { ScreenLayout } from 'components/ScreenLayout';

export default function Account() {
    return (
        <ScreenLayout>
            <View className='flex justify-center items-center h-full'>
                <Text className='text-3xl mb-10'>Pagina para crear cuenta</Text>
                <View className='flex gap-5'>
                    <Link 
                        href="/login"
                        className='border border-zinc-600 px-3 py-2 rounded-md'
                        >
                            Ingresa a tu cuenta
                    </Link>
                    <Link 
                        href="/register"
                        className='bg-zinc-800 px-3 py-3 rounded-md text-white'
                        >
                            Registra tu cuenta
                    </Link>
                </View>
            </View>
        </ScreenLayout>
    );
}