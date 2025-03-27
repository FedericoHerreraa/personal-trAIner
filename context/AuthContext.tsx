
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types/types";
import { supabase } from "../lib/supabase";
import { useRouter } from 'expo-router';
import { Alert } from "react-native";

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async (): Promise<string | undefined> => { return undefined },
    register: async (): Promise<string | undefined> => { return undefined; },
    logOut: () => {},
    loading: true,
    uploadImage: (): Promise<void> => { return Promise.resolve(undefined) }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(true)
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Error:', error)
                return
            }

            // const user = data.session

            // setUser(user)
        };

        fetchSession()
    }, []);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error('Error:', error)
            return error.message;
        }

        const user = data.user

        const { data: fullUser, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (fetchError) {
            console.error("Error al obtener el perfil completo:", fetchError)
            return fetchError.message;
        }

        setUser(fullUser)
        router.push('/home');
    }

    const register = async (
        email: string,
        password: string,
        name: string,
        lastName: string,
        phone: string,
    ): Promise<string | undefined> => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
    
            if (error) {
                console.error('Error:', error)
                return error.message;
            }
    
            const user = data.user

            const { error: profileError } = await supabase.from('profiles').insert({
                id: user?.id,
                email: user?.email,
                name,
                last_name: lastName,
                phone
            });

            if (profileError) {
                console.error("Error al obtener el perfil completo:", profileError)
                return profileError.message;
            }

            const fullUser = {
                id: user?.id,
                email: user?.email,
                name,
                last_name: lastName,
                phone,
                profile_photo: ''
            }

            setUser(fullUser)
            router.push('/home');
        } catch (error) {
            console.error('Error en el registro:', error);
            return `${error}`;
        }
    };

    const logOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    const uploadImage = async (imageUri: string) => {
        try {    
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

            if (user?.id) {
                setUser({
                    ...user,
                    profile_photo: publicUrl.publicUrl
                });
            } else {
                console.error('User ID is undefined. Cannot update user state.');
            }

            if (dbError) throw dbError;
    
            Alert.alert('Éxito', 'Imagen subida correctamente a supabase y a profiles.');
        } catch (error) {
            console.log('Upload Error:', error);
            Alert.alert('Error', error instanceof Error ? error.message : 'Error desconocido');
        } 
    };

    return (
        <AuthContext.Provider value={{ login, user, register, logOut, loading, uploadImage }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}