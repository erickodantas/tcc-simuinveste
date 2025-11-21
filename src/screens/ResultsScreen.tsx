import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-gifted-charts';
import { styles } from '../styles/AppStyles';
import { ResultCard } from '../components/ResultCard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Results'>;

export function ResultsScreen({ navigation, route }: Props) {
  const { simulation, goalAmount, investmentName } = route.params;
  const theme = useTheme();
  const primaryColor = theme.colors.primary;

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Resultado da Simulação" subtitle={investmentName} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <ResultCard simulation={simulation} goalAmount={goalAmount} />

        <Text style={styles.chartTitle}>Evolução do patrimônio</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={simulation.chartData}
            areaChart
            height={220}
            isAnimated
            color={primaryColor}
            thickness={3}
            startFillColor={primaryColor}
            endFillColor={primaryColor}
            startOpacity={0.2}
            endOpacity={0.01}
            xAxisLabelTextStyle={{ fontSize: 10, color: '#555' }}
            noOfSections={5}
            formatYLabel={(value) => {
                const val = Number(value);
                if (val < 1000) return `R$${val}`;
                return `R$${(val / 1000).toFixed(1)}k`; 
            }}
            rulesColor="rgba(0,0,0,0.1)"
          />
        </View>
      </ScrollView>
    </View>
  );
}