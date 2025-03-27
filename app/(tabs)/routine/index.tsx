
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ScreenLayout } from 'components/ScreenLayout';
import { HeaderSection } from 'components/HeaderSection';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WeekDays } from 'components/WeekDays';
import { Link } from 'expo-router';


export default function Routine() {
    return (
        <ScreenLayout bg='bg-black'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderSection />

                <View className='flex flex-row justify-between'>
                    <Text className='text-5xl ml-5 font-bold text-zinc-200'>Rutina</Text>
                </View>

                <View className='mx-5 mt-10'>
                    <Link asChild href='/routine/routineAI'>
                        <Pressable>
                            <LinearGradient
                                colors={['#8B5CF6', '#EAB308']}
                                style={{ padding: 1, borderRadius: 15 }}
                            >
                                <View className=' p-5 bg-zinc-900 h-fit rounded-2xl  flex justify-center gap-2'>
                                    <View className='flex flex-row items-start gap-5'>
                                        <Text>
                                            <MaterialCommunityIcons name="dots-circle" size={40} color="white" />
                                        </Text>
                                        <View>
                                            <Text className='text-zinc-400 text-lg'>Utiliza tu Personal TrAIner</Text>
                                            <Text className='text-zinc-200 text-3xl'>Crear rutina con <Text className='font-semibold text-violet-400'>IA</Text></Text>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </Pressable>
                    </Link>
                </View>

                <View className='mt-10 mx-5'>
                    <WeekDays />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}