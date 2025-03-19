import { useRef, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const HeaderSection = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleOpenPress = () => {
        bottomSheetRef.current?.expand(); 
    };

    const handleClosePress = () => {
        bottomSheetRef.current?.close(); 
    };

    return (
        <GestureHandlerRootView className='flex-1'>
            <View className='flex flex-row justify-between mt-2 px-3 border-b border-b-zinc-300 pb-3'>
                <Text className='text-3xl'>Personal Tr
                    <Text className='text-violet-600'>AI</Text>
                    ner
                </Text>
                <Pressable onPress={handleOpenPress}>
                    <FontAwesome5 name="user-alt" size={24} color="black" />
                </Pressable>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={['95%']} 
                index={-1}  
                onClose={handleClosePress}
            >
                <View className='flex-1 items-center p-20' >
                    <Text>Awesome 🎉</Text>
                    <Pressable onPress={handleClosePress}>
                        <Text className="mt-2 text-blue-500">Cerrar</Text>
                    </Pressable>
                </View>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};
