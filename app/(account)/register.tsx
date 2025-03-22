
import { Link } from 'expo-router';
import { 
    View, 
    Text, 
    TextInput,
    Pressable
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

export default function Register() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState<string | null>(null);

    const registerUser = async (dataUser: { email: string, password: string }) => {
        try {
            const { email, password } = dataUser;
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                console.log(error.message);
                return;
            }
            
            const user = data.user
            setUser(user);
            console.log("Usuario registrado:", user);
        } catch (error) {
            console.log("Error al registrar:", error);
        }
    };

    return (
        <View className='flex mt-40 items-center h-full'>
            <Text className='font-semibold text-3xl'>Registra tu nueva cuenta</Text>
            
            <View className='mt-10 w-full items-center flex gap-5'>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                            placeholder='Nombre'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}

                {/* Apellido */}
                <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: "El apellido es obligatorio" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                            placeholder='Apellido'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.lastName && <Text className="text-red-500">{errors.lastName.message}</Text>}

                <Controller
                    control={control}
                    name="email"
                    rules={{ 
                        required: "El email es obligatorio",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Formato de email inválido" }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                            placeholder='Dirección de correo'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    rules={{ 
                        required: "La contraseña es obligatoria", 
                        minLength: { value: 6, message: "Mínimo 6 caracteres" }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className='border border-zinc-400 px-3 py-2 rounded-xl text-lg w-[70%]'
                            placeholder='Contraseña'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
            </View>

            <View className='flex flex-row items-center gap-1 mt-10'>
                <Text className='text-lg'>¿Ya tienes una cuenta?</Text>
                <Link href='/login' className='text-violet-600 text-xl'>Ingresa</Link>
            </View>

            <View className='mt-10'>
                <Pressable 
                    onPress={handleSubmit(registerUser)}
                    className='px-7 py-3 bg-zinc-900 rounded-xl'
                >
                    <Text className='text-xl text-white'>Registrar</Text>
                </Pressable>
            </View>
        </View>
    );
}