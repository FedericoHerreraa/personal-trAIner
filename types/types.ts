
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
    uploadImage: (imageUri: string) => Promise<void>;
    getSession: () => Promise<void>;
}

export interface RoutineContextType {
    routine: RoutineType | null;
    addMuscle: (day: string, muscle: Muscle, duration: number) => void;
    addExercise: (day: string, muscle: Muscle, exercises: Exercise) => void;
}

export interface RoutineType {
    id_user: string | undefined;
    days: DayRoutineType[];
}

export interface DayRoutineType {
    day: string;
    duration: number;
    muscles: Muscle[];
}

export interface Muscle {
    name: string;
    exercises: Exercise[];
}

export interface Exercise {
    name: string;
    series: number;
    repetitions: number;
    weight: number;
}

