import 'react-native-gesture-handler';
import styles from './styles/AppStyles';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Provider as PaperProvider, TextInput, Button, Appbar, Card } from 'react-native-paper';
import { LineChart } from 'react-native-gifted-charts';
import { getCDIRate } from './services/api';

//definicao dos tipos
type RootStackParamList = {
  Simulation: undefined;
  Results: {
    monthlyContribution: number;
    period: number;
    goalAmount: number;
  };

};

const Stack = createNativeStackNavigator<RootStackParamList>();

type SimulationResult = {
    finalAmount: number;
    totalInvested: number;
    totalInterest: number;
    chartData: { value: number; label: string }[];
};

//logica do calculo
const calculateSimulation = (initialAmount: number, monthlyContribution: number, period: number, interestRate: number): SimulationResult => {
    let total = initialAmount;
    const monthlyInterestRate = interestRate / 12 / 100;
    const chartData: {value: number; label: string }[] = [];
    for (let month = 1; month <= period; month++) {
        total += monthlyContribution;
        total *= (1 + monthlyInterestRate);
        const showLabel = month % 12 === 0 || month === 1 || month === period;
        chartData.push({ value: total, label: showLabel ? `${month}m` : '' });
    }
    const totalInvested = initialAmount + (monthlyContribution * period);
    const totalInterest = total - totalInvested;
    return { finalAmount: total, totalInvested: totalInvested, totalInterest: totalInterest, chartData: chartData };
};


type SimulationScreenProps = NativeStackScreenProps<RootStackParamList, 'Simulation'>;
function SimulationScreen({ navigation }: SimulationScreenProps) {
    const [goalAmount, setGoalAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [period, setPeriod] = useState('');

    const handleSimulate = () => {
        if (!goalAmount || !monthlyContribution || !period) {
            alert('preencha todos os campos.');
            return;
        }
        navigation.navigate('Results', {
            monthlyContribution: parseFloat(monthlyContribution),
            period: parseInt(period, 10),
            goalAmount: parseFloat(goalAmount)
        });
    };

    return (
        <View style={styles.container}>
            <Appbar.Header><Appbar.Content title="SimuInveste" subtitle="Nova Simulação" /></Appbar.Header>
            <View style={styles.content}>
                <Text style={styles.title}>Defina seus objetivos</Text>
                <TextInput label="Valor final desejado (R$)" value={goalAmount} onChangeText={setGoalAmount} keyboardType="numeric" mode="outlined" style={styles.input} />
                <TextInput label="Aporte mensal (R$)" value={monthlyContribution} onChangeText={setMonthlyContribution} keyboardType="numeric" mode="outlined" style={styles.input} />
                <TextInput label="Prazo (em meses)" value={period} onChangeText={setPeriod} keyboardType="numeric" mode="outlined" style={styles.input} />
                <Button mode="contained" onPress={handleSimulate} style={styles.button}>Simular</Button>
            </View>
        </View>
    );
}

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'Results'>;
function ResultsScreen({ route, navigation }: ResultsScreenProps) {
    const { monthlyContribution, period, goalAmount } = route.params;
    const [loading, setLoading] = useState(true);
    const [simulation, setSimulation] = useState<SimulationResult | null>(null);
    const [interestRate, setInterestRate] = useState(0);

    useEffect(() => {
        const fetchRateAndSimulate = async () => {
            setLoading(true);
            const rate = await getCDIRate();
            setInterestRate(rate);
            const simulationData = calculateSimulation(0, monthlyContribution, period, rate);
            setSimulation(simulationData);
            setLoading(false);
        };
        fetchRateAndSimulate();
    }, []);

    const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (loading || !simulation) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>buscando dados e simulando..</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Resultado da simulacão" subtitle={`Taxa de ${interestRate}% a.a.`} />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.resultLabel}>Valor final acumulado:</Text>
                        <Text style={styles.resultValue}>{formatCurrency(simulation.finalAmount)}</Text>
                        <Text style={styles.detailLabel}>Meta desejada:</Text>
                        <Text style={styles.detailValue}>{formatCurrency(goalAmount)}</Text>
                        <Text style={styles.detailLabel}>Total aportado:</Text>
                        <Text style={styles.detailValue}>{formatCurrency(simulation.totalInvested)}</Text>
                        <Text style={styles.detailLabel}>Total em juros:</Text>
                        <Text style={styles.detailValue}>{formatCurrency(simulation.totalInterest)}</Text>
                    </Card.Content>
                </Card>
                <Text style={styles.chartTitle}>Evolução do patrimônio</Text>
                <View style={styles.chartContainer}>
                    <LineChart data={simulation.chartData} height={220} isAnimated color="#6200ee" thickness={3} startFillColor="rgba(98, 0, 238, 0.2)" endFillColor="rgba(98, 0, 238, 0.01)" xAxisLabelTextStyle={{ fontSize: 10 }} />
                </View>
            </View>
        </View>
    );
}

//navegacao
export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Simulation" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Simulation" component={SimulationScreen} />
                    <Stack.Screen name="Results" component={ResultsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

