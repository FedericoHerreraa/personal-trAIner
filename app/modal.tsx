import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Modal() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-zinc-800">
      <Text className="text-2xl font-bold">Soy un Modal</Text>

      <Pressable 
        onPress={() => router.back()} 
        className="mt-5 px-4 py-2 bg-red-500 rounded-lg"
      >
        <Text className="text-white">Cerrar</Text>
      </Pressable>
    </View>
  );
}