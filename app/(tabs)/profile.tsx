import { View, Text, Button } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useAuth } from 'context/AuthContext';

export default function Profile() {
    const [image, setImage] = useState<string | null>(null);
    const { uploadImage } = useAuth();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
        }
    };

    return (
        <ScreenLayout bg="bg-black">
            <HeaderSection />
            <View className="flex flex-row justify-between">
                <Text className="text-5xl ml-5 font-bold text-zinc-200">Perfil</Text>
            </View>

            <Button title="Seleccionar Imagen" onPress={pickImage} />
        </ScreenLayout>
    );
}