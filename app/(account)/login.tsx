
import { Link } from 'expo-router';
import { 
    View, 
    Text, 
    TextInput,
    Pressable
} from 'react-native';

export default function Login() {
    const loginUser = async () => {}

    return (
        <View className='flex mt-40 items-center h-full'>
            <Text className='font-semibold text-3xl'>Ingresa tu cuenta</Text>
            <View className='mt-10 w-full items-center flex gap-5'>
                <TextInput
                    className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                    placeholder='Direccion de correo'
                />
                <TextInput
                    className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                    placeholder='Contrasena'
                />
            </View>

            <View className='flex flex-row items-center gap-1 mt-10'>
                <Text className='text-lg'>Todavia no tienes una cuenta?</Text>
                <Link href='/register' className='text-violet-600 text-xl'>Registrate</Link>
            </View>

            <View className='mt-10'>
                <Pressable 
                    onPress={() => {}}
                    className='px-7 py-3 bg-zinc-900 rounded-xl'
                >
                    <Text className='text-xl text-white'>Ingresar</Text>
                </Pressable>
            </View>
        </View>
    )
}