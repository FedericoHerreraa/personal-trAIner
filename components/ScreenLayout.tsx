import { SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

export const ScreenLayout = ({ children } : { children: React.ReactNode }) => {
    const statusBarHeight = Constants.statusBarHeight;

    return (
        <SafeAreaView style={{ paddingTop: statusBarHeight }} className={`flex-1 px-14`}>
            {children}
        </SafeAreaView>
    );
};