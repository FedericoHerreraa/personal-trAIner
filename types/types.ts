
import { User } from '@supabase/supabase-js';

export interface AuthContextType {
    user: User | null | undefined;
    login: (email: string, password: string) => Promise<string | undefined>;
    register: (email: string, name: string, password: string, cuit: number, address: string, role: string) => Promise<string | undefined>;
    logOut: () => void;
    loading: boolean;
}