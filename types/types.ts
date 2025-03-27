
export interface User {
    id: string | undefined;
    email: string | undefined;
    name: string | undefined;
    last_name: string | undefined;
    phone: string | undefined;
    profile_photo: string | undefined;
}

export interface AuthContextType {
    user: User | null | undefined;
    login: (email: string, password: string) => Promise<string | undefined>;
    register: (email: string, password: string, name: string, lastName: string, phone: string) => Promise<string | undefined>;
    logOut: () => void;
    loading: boolean;
}