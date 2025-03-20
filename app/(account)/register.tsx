
import { Link } from 'expo-router';
import { 
    View, 
    Text, 
    TextInput,
    Pressable
} from 'react-native';

export default function Register() {
    return (
        <View className='flex mt-40 items-center h-full'>
            <Text className='font-semibold text-3xl'>Registra tu cuenta nueva</Text>
            <View className='mt-10 w-full items-center flex gap-5'>
                <TextInput
                    className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                    placeholder='Nombre'
                />
                <TextInput
                    className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                    placeholder='Apellido'
                />
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
                <Text className='text-lg'>Ya tienes una cuenta?</Text>
                <Link href='/login' className='text-violet-600 text-xl'>Ingresa</Link>
            </View>

            <View className='mt-10'>
                <Pressable 
                    onPress={() => {}}
                    className='px-7 py-3 bg-zinc-900 rounded-xl'
                >
                    <Text className='text-xl text-white'>Registrar</Text>
                </Pressable>
            </View>
        </View>
    )
}