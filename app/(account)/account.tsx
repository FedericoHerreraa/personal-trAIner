
import { Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { ScreenLayout } from 'components/ScreenLayout';

export default function Account() {
    return (
        <ScreenLayout>
            <View className='flex justify-center items-center h-full'>
                <Text className='text-5xl mb-10 pb-5 font-semibold border-b border-b-zinc-300'>Personal Tr<Text className='text-violet-400'>AI</Text>ner</Text>
                <Image 
                    source={require("assets/images/image.jpeg")} 
                    style={{ width: 300, height: 300 }}
                    className='mb-10 rounded-xl shadow-xl'
                />
                <View className='flex gap-5'>
                    <Link 
                        href="/login"
                        className='border border-zinc-400 px-3 py-2 rounded-xl text-lg'
                        >
                            Ingresa a tu cuenta
                    </Link>
                    <Link 
                        href="/register"
                        className='bg-zinc-800 px-3 py-3 rounded-xl text-white text-lg'
                        >
                            Registra tu cuenta
                    </Link>
                </View>
            </View>
        </ScreenLayout>
    );
}