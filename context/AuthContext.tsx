
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types/types";
import { supabase } from "../lib/supabase";
import { useRouter } from 'expo-router';

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async (): Promise<string | undefined> => { return undefined },
    register: async (): Promise<string | undefined> => { return undefined; },
    logOut: () => {},
    loading: true
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
                phone
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

    return (
        <AuthContext.Provider value={{ login, user, register, logOut, loading }}>
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