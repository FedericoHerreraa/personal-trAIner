

import { Text, View } from 'react-native';

export const RoutinePreview = () => {
    return (
        <View className="mt-16 mx-5">
            <View className="flex flex-row items-center justify-between mx-1">
                <Text className="text-zinc-200 text-2xl font-semibold">Mejora tu rutina</Text>
                <Text className="text-zinc-400">Ver todo</Text>
            </View>
            <View className="w-full h-48 bg-zinc-800 rounded-xl mt-2 px-10 py-2 flex flex-row items-end justify-center gap-5">
                {charts.map((chart, index) => (
                    <View key={index} className="flex items-center gap-2">
                        <View className={`bg-yellow-300 w-12 rounded-t-lg ${getHeightClass(chart.percentage)}`} />
                        <Text className="text-zinc-300">{chart.day}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const getHeightClass = (percentage: number) => {
    if (percentage <= 20) return "h-1/6";
    if (percentage <= 40) return "h-1/4";
    if (percentage <= 60) return "h-1/3";
    if (percentage <= 80) return "h-2/4";
    return "h-3/4";
};

const charts = [
    { day: 'Lun', percentage: 56 },
    { day: 'Mar', percentage: 36 },
    { day: 'Mier', percentage: 85 },
    { day: 'Jue', percentage: 70 },
    { day: 'Vie', percentage: 35 }
];