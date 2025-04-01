

import { createContext, useContext, useEffect, useState } from "react";
import { Exercise, Muscle, RoutineContextType, RoutineType } from "../types/types";
import { useAuth } from "./AuthContext";
import { supabase } from "lib/supabase";

const RoutineContext = createContext<RoutineContextType>({
    routine: null,
    addMuscle: () => { },
    addExercise: () => { },
    addDurationTime: () => { },
});

export const RoutineProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [routine, setRoutine] = useState<RoutineType | null>(null);

    useEffect(() => {
        console.log("Actualizando rutina", routine)
        if (routine) saveRoutineToDB(routine);
    }, [routine]);

    useEffect(() => {
        const fetchRoutineFromDB = async () => {
            if (!user?.id) return;
    
            try {
                const { data, error } = await supabase
                    .from("routines")
                    .select("*")
                    .eq("user_id", user.id)
                    .single();
    
                if (error && error.code !== "PGRST116") throw error; 
    
                if (data) {
                    setRoutine({ id_user: user.id, days: data.routine });
                } else {
                    setRoutine({ id_user: user.id, days: [] });
                }
            } catch (err) {
                console.error("Error obteniendo rutina de Supabase:", err);
            }
        };
    
        fetchRoutineFromDB();
    }, [user]);

    const saveRoutineToDB = async (routine: RoutineType) => {
        if (!routine || !routine.id_user) return;
    
        try {
            const { data: existingRoutine, error: fetchError } = await supabase
                .from("routines")
                .select("id")
                .eq("user_id", routine.id_user)
                .single();
    
            if (fetchError && fetchError.code !== "PGRST116") {
                throw fetchError;
            }
    
            let response;
            if (existingRoutine) {
                response = await supabase
                    .from("routines")
                    .update({ routine: JSON.stringify(routine.days) })
                    .eq("user_id", routine.id_user);
            } else {
                response = await supabase
                    .from("routines")
                    .insert([{ user_id: routine.id_user, routine: JSON.stringify(routine.days) }]);
            }
    
            if (response.error) throw response.error;
    
            console.log("Rutina guardada en Supabase:", response.data);
        } catch (err) {
            console.error("Error guardando rutina en Supabase:", err);
        }
    };

    const addDurationTime = (day: string, duration: number) => {
        if (!routine) return;

        setRoutine(prevRoutine => {
            if (!prevRoutine) return null;

            const existingDayIndex = prevRoutine.days.findIndex(d => d.day === day);

            let updatedDays;

            if (existingDayIndex !== -1) {
                updatedDays = prevRoutine.days.map((d, index) =>
                    index === existingDayIndex ? { ...d, duration, muscles: d.muscles } : d
                );
            } else {
                updatedDays = [...prevRoutine.days, { day, duration, muscles: [] }];
            }

            return { ...prevRoutine, days: updatedDays };
        });
    };

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

            return { ...prevRoutine, days: updatedDays };
        });
    };

    return (
        <RoutineContext.Provider value={{ routine, addMuscle, addExercise, addDurationTime }}>
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