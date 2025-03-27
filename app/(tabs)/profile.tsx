import { View, Text, Button, Image } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from 'lib/supabase';
import { useAuth } from 'context/AuthContext';

export default function Profile() {
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const { user } = useAuth();

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
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (imageUri: string) => {
        try {
            setUploading(true);
    
            const ext = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
            const fileName = `profile_${Date.now()}.${ext}`;
    
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                name: fileName,
                type: `image/${ext}`,
            } as any);
    
            const { data, error } = await supabase.storage
                .from('profile-photos')
                .upload(fileName, formData);
    
            if (error) throw error;
    
            const { data: publicUrl } = supabase.storage
                .from('profile-photos')
                .getPublicUrl(fileName);
    
            const { error: dbError } = await supabase
                .from('profiles')
                .update({ profile_photo: publicUrl.publicUrl })
                .eq('id', user?.id);
    
            if (dbError) throw dbError;
    
            Alert.alert('Éxito', 'Imagen subida correctamente a supabase y a profiles.');
        } catch (error) {
            console.log('Upload Error:', error);
            Alert.alert('Error', error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setUploading(false);
        }
    };

    return (
        <ScreenLayout bg="bg-black">
            <HeaderSection />
            <View className="flex flex-row justify-between">
                <Text className="text-5xl ml-5 font-bold text-zinc-200">Perfil</Text>
            </View>

            <Button title="Seleccionar Imagen" onPress={pickImage} disabled={uploading} />
        </ScreenLayout>
    );
}