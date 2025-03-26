
import { Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { ScreenLayout } from 'components/ScreenLayout';

export default function Account() {
    return (
        <ScreenLayout>
            <View className='flex justify-center items-center h-full'>
                <Text className='text-zinc-400 mb-2'>Buenvenido a</Text>
                <Text className='text-white text-5xl mb-10 pb-5 font-semibold border-b border-b-zinc-700'>Personal Tr<Text className='text-violet-400'>AI</Text>ner</Text>
                <Image 
                    source={require("assets/images/image.jpeg")} 
                    style={{ width: 300, height: 400 }}
                    className='mb-10 rounded-xl shadow-xl'
                />
                <View className='flex gap-5'>
                    <Link 
                        href="/login"
                        className='px-5 text-center rounded-xl text-xl text-white font-semibold'
                        >
                            Ingresa a tu cuenta
                    </Link>
                    <Link 
                        href="/register"
                        className='bg-zinc-900 text-center border border-zinc-700 px-5 py-3 rounded-xl text-white text-lg'
                        >
                            Create una nueva
                    </Link>
                </View>
            </View>
        </ScreenLayout>
    );
}