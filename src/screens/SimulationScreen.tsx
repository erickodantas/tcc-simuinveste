import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { styles } from '../styles/AppStyles';
import { calculateSimulation } from '../utils/calculations';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Simulation'>;

export function SimulationScreen({ navigation, route }: Props) {
  const { investmentName, interestRate } = route.params;
  const [initialAmount, setInitialAmount] = useState('0');
  const [goalAmount, setGoalAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [period, setPeriod] = useState('');

  const handleSimulate = () => {
    if (!goalAmount || !monthlyContribution || !period) return;

    const simInitial = parseFloat(initialAmount.replace(',', '.')) || 0;
    const simContribution = parseFloat(monthlyContribution.replace(',', '.')) || 0;
    const simPeriod = parseInt(period, 10) || 0;
    const simGoal = parseFloat(goalAmount.replace(',', '.')) || 0;

    const simulationData = calculateSimulation(simInitial, simContribution, simPeriod, interestRate);

    navigation.navigate('Results', {
      simulation: simulationData,
      goalAmount: simGoal,
      interestRate,
      investmentName,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={investmentName} subtitle={`Taxa: ${interestRate.toFixed(2)}% a.a.`} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Defina seus valores</Text>

        <TextInput
          label="Valor inicial (R$)"
          value={initialAmount}
          onChangeText={setInitialAmount}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Valor final desejado (R$)"
          value={goalAmount}
          onChangeText={setGoalAmount}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Aporte mensal (R$)"
          value={monthlyContribution}
          onChangeText={setMonthlyContribution}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Prazo (em meses)"
          value={period}
          onChangeText={setPeriod}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <Button mode="contained" onPress={handleSimulate} style={styles.button}>
          Simular
        </Button>
      </ScrollView>
    </View>
  );
}
