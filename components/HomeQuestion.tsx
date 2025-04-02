import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { supabase } from 'lib/supabase';
import { useAuth } from 'context/AuthContext';

export const HomeQuestion = () => {
    const [isVisible, setIsVisible] = useState(false);
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(0);
    const { user } = useAuth()

    useEffect(() => {
        const checkAssistance = async () => {
            if (!user) return;

            const today = new Date();
            today.setHours(0, 0, 0, 0); 

            const { data, error } = await supabase
                .from('assistance')
                .select('date')
                .eq('user_id', user.id)
                .gte('date', today.toISOString())

            if (error) {
                console.error('Error fetching assistance:', error.message);
                return;
            }

            if (data.length > 0) {
                setIsVisible(false); 
            } else {
                setIsVisible(true);
            }
        };

        checkAssistance();
    }, [user]);

    const handlePress = () => {
        opacity.value = withTiming(0, { duration: 300 });
        translateY.value = withTiming(-20, { duration: 300 }, () => {
            runOnJS(setIsVisible)(false); 
        });
        handleSubmit();
    };

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    if (!isVisible) return null;

    const handleSubmit = async () => {
        const { error: errorDB } = await supabase
            .from('assistance')
            .insert([{ user_id: user?.id, date: new Date() }]);

        if (errorDB) {
            console.error('Error inserting data:', errorDB.message);
        }
    }

    return (
        <Animated.View style={[animatedStyle]}>
            <Pressable onPress={handlePress}>
                <View className="mx-5 mb-7">
                    <LinearGradient colors={['#8B5CF6', '#EAB308']} style={{ padding: 1, borderRadius: 15 }}>
                        <View className="p-5 bg-zinc-900 h-fit rounded-2xl flex justify-center gap-2">
                            <View className="flex justify-center items-center gap-3">
                                <Text className="text-zinc-200 text-3xl">¿Entrenaste hoy?</Text>
                                <Text className="text-zinc-400 font-semibold">Tocar para confirmar</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Pressable>
        </Animated.View>
    );
};