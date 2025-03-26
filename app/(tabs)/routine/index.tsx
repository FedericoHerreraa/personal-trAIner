
import { View, Text, Button, ScrollView } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { WeekDays } from 'components/WeekDays';

export default function Routine() {
    return (
        <ScreenLayout>
            <ScrollView>
                <HeaderSection />

                <View className='flex flex-row justify-between'>
                    <Text className='text-5xl ml-5 font-bold text-zinc-200'>Rutina</Text>
                </View>

                <View className='mx-5 mt-10'>
                    <LinearGradient
                        colors={['#8B5CF6', '#EAB308']}
                        style={{ padding: 1, borderRadius: 15 }}
                    >
                        <View className=' p-5 bg-zinc-900 h-fit rounded-2xl  flex justify-center gap-2'>
                            <View className='flex flex-row items-start gap-5'>
                                <Feather name="cpu" size={40} color='white' />,
                                <View>
                                    <Text className='text-zinc-400 text-lg'>Utiliza tu Personal TrAIner</Text>
                                    <Text className='text-zinc-200 text-3xl'>Crear rutina con IA</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                <View className='mt-10 mx-5'>
                    <WeekDays />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}