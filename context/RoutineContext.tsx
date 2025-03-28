

import { createContext, useContext, useEffect, useState } from "react";
import { Muscle, RoutineContextType, RoutineType } from "../types/types";
import { useAuth } from "./AuthContext";

const RoutineContext = createContext<RoutineContextType>({
    routine: null,
    addMuscle: () => {}
}); 

export const RoutineProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [routine, setRoutine] = useState<RoutineType | null>(null);

    useEffect(() => {
        if (user?.id) {
            setRoutine({
                id_user: user.id,
                days: [],
            });
        }
    }, [user]);

    const addMuscle = (day: string, muscle: Muscle, duration: number) => {
        if (!routine) return; 

        setRoutine(prevRoutine => {
            if (!prevRoutine) return null;

            const existingDayIndex = prevRoutine.days.findIndex(d => d.day === day);

            let updatedDays;

            if (existingDayIndex !== -1) {
                updatedDays = prevRoutine.days.map((d, index) =>
                    index === existingDayIndex ? { 
                        ...d, 
                        muscles: [...d.muscles, muscle] 
                    } : d
                );
            } else {
                updatedDays = [...prevRoutine.days, { day, duration, muscles: [muscle] }];
            }

            return { ...prevRoutine, days: updatedDays };
        });
    };

    return (
        <RoutineContext.Provider value={{ routine, addMuscle }}>
            {children}
        </RoutineContext.Provider>
    );
}

export const useRoutine = () => {
    const context = useContext(RoutineContext);
    if (!context) {
        throw new Error("useRoutine must be used within a RoutineProvider");
    }
    return context;
}