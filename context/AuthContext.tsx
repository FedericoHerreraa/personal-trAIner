

'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/types";
import { supabase } from "../lib/supabase";
import { User } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async (): Promise<string | undefined> => { return undefined },
    register: async (): Promise<string | undefined> => { return undefined; },
    logOut: () => {},
    loading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>();
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
        setUser(user)
        router.push('/home');
    }

    const register = async (
        email: string,
        password: string,
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
            setUser(user)
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