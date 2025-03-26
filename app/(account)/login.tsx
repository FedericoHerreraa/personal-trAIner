import { Link } from 'expo-router';
import {
    View,
    Text,
    TextInput,
    Pressable
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from 'context/AuthContext';

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
    const { login } = useAuth();

    const loginUser = async (dataUser: { email: string, password: string }) => {
        try {
            const { email, password } = dataUser;
            await login(email, password);
        } catch (error) {
            console.log("Error al iniciar sesión:", error);
        }
    };

    return (
        <View className='flex pt-40 items-center h-full bg-black'>
            <Text className='font-semibold text-3xl text-white'>Ingresa tu cuenta</Text>
            
            <View className='mt-10 w-full items-center flex gap-5 text-white'>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "El email es obligatorio",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Formato de email inválido" }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className='border border-zinc-500 text-white px-3 h-16 py-4 rounded-2xl text-lg w-[70%]'
                            placeholder='Dirección de correo'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.email?.message && <Text className="text-red-500">{String(errors.email.message)}</Text>}

                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: "La contraseña es obligatoria",
                        minLength: { value: 6, message: "Mínimo 6 caracteres" }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className='border border-zinc-500 text-white px-3 h-16 py-4 rounded-2xl text-lg w-[70%]'
                            placeholder='Contraseña'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text className="text-red-500">{String(errors.password.message)}</Text>}
            </View>

            <View className='flex flex-row items-center gap-1 mt-10'>
                <Text className='text-lg text-white'>¿Todavía no tienes una cuenta?</Text>
                <Link href='/register' className='text-violet-400 text-xl'>Regístrate</Link>
            </View>

            <View className='mt-10'>
                <Pressable
                    onPress={handleSubmit(loginUser)}
                    className='px-7 py-3 bg-zinc-900 rounded-xl'
                >
                    <Text className='text-xl text-white'>Ingresar</Text>
                </Pressable>
            </View>
        </View>
    );
}
