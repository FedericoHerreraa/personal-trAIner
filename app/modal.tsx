import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from 'context/AuthContext';

export default function Modal() {
  const router = useRouter();
  const { user } = useAuth()

  return (
    <View className="flex-1 items-center pt-20 bg-zinc-800">
      <Text className="text-2xl font-bold text-white">Hola de nuevo {user?.name} {user?.last_name}</Text>
      <Text className='text-zinc-300 mt-2'>Email: {user?.email}</Text>
      <Text className='text-zinc-300 mt-2'>Telefono: {user?.phone}</Text>
    </View>
  );
}