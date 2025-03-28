import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from 'context/AuthContext';
import { ModalHeader } from 'components/ModalHeader';

export default function Modal() {
  const router = useRouter();
  const { user } = useAuth()

  return (
    <View className="flex-1 bg-zinc-800">
      <ModalHeader title='Perfil'/>
      
      <View className='mt-16 items-center'>
        <Image
          source={{ uri: user?.profile_photo }}
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
        <Text className="text-2xl font-bold text-white mt-5">Hola de nuevo {user?.name} {user?.last_name}</Text>
        <Text className='text-zinc-300 mt-2'>Email: {user?.email}</Text>
        <Text className='text-zinc-300 mt-2'>Telefono: {user?.phone}</Text>
      </View>
    </View>
  );
}