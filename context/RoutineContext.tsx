

import { createContext, useContext, useEffect, useState } from "react";
import { Exercise, Muscle, RoutineContextType, RoutineType } from "../types/types";
import { useAuth } from "./AuthContext";

const RoutineContext = createContext<RoutineContextType>({
    routine: null,
    addMuscle: () => {},
    addExercise: () => {}
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

    useEffect(() => {
        console.log("Routine actualizada:", routine);
    
        if (!routine || !routine.days.length) return;
    
        console.log("Día 0 encontrado:", routine.days[0]);
    
        routine.days[0].muscles.forEach(m => console.log("Músculo:", m));
    }, [routine]);

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

    const addExercise = (day: string, muscle: Muscle, exercise: Exercise) => {
        if (!routine) return;
    
        setRoutine(prevRoutine => {
            if (!prevRoutine) return null;
    
            const existingDayIndex = prevRoutine.days.findIndex(d => d.day === day);
    
            let updatedDays;
    
            if (existingDayIndex !== -1) {
                updatedDays = prevRoutine.days.map((d, index) =>
                    index === existingDayIndex
                        ? {
                              ...d,
                              muscles: d.muscles.map(m =>
                                  m.name === muscle.name
                                      ? {
                                            ...m,
                                            exercises: [...m.exercises, exercise],
                                        }
                                      : m
                              ),
                          }
                        : d
                );
            } else {
                updatedDays = [
                    ...prevRoutine.days,
                    { day, duration: 1, muscles: [{ ...muscle, exercises: [exercise] }] },
                ];
            }
    
            console.log("Ejercicio agregado:", exercise);
    
            return { ...prevRoutine, days: updatedDays };
        });
    };

    return (
        <RoutineContext.Provider value={{ routine, addMuscle, addExercise }}>
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