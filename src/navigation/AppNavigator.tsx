import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, useTheme } from 'react-native-paper';
import { TelaDashboard } from '../features/dashboard/screens/TelaDashboard';
import { TelaSimulacao } from '../features/simulacao/screens/TelaSimulacao';
import { TelaResultados } from '../features/simulacao/screens/TelaResultados';
import { TelaEducacaoInicial } from '../features/educacao/screens/TelaEducacao';
import { useProgresso } from '../contexts/ProgressoContext';
import { styles } from '../common/styles/AppStyles';
import type { ResultadoSimulacao } from '../common/types/ResultadoSimulacao';

//Tipagens de Navegação
export type SimulationStackParamList = {
  Dashboard: undefined;
  Simulacao: { nomeInvestimento: string; taxaJuros: number };
  Resultados: {
    simulacao: ResultadoSimulacao;
    valorMeta: number;
    taxaJuros: number;
    nomeInvestimento: string;
  };
};

export type EducationStackParamList = {
  EducacaoInicial: undefined;
  Flashcards: { trilhaId: string };
  Quiz: { trilhaId: string };
};

//Stack navigators
const SimStack = createNativeStackNavigator<SimulationStackParamList>();
function SimulationStackNavigator() {
  return (
    <SimStack.Navigator screenOptions={{ headerShown: false }}>
        <SimStack.Screen name="Dashboard" component={TelaDashboard} />
        <SimStack.Screen name="Simulacao" component={TelaSimulacao} />
        <SimStack.Screen name="Resultados" component={TelaResultados} />
    </SimStack.Navigator>
  );
}

const EdStack = createNativeStackNavigator<EducationStackParamList>();
function EducationStackNavigator() {
  return (
    <EdStack.Navigator screenOptions={{ headerShown: false }}>
        <EdStack.Screen name="EducacaoInicial" component={TelaEducacaoInicial} />
        {/* Futuras telas de Flashcards e Quiz virão aqui */}
    </EdStack.Navigator>
  );
}

// Placeholder para Metas
function TelaMetas() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#fff", elevation: 0 }}>
        <Appbar.Content title="Minhas Metas" />
      </Appbar.Header>
      <View style={styles.placeholderContainer}>
        <MaterialCommunityIcons name="target" size={64} color={theme.colors.secondary} style={styles.placeholderIcon} />
        <Text style={styles.placeholderText}>A tela de Metas está em desenvolvimento.</Text>
      </View>
    </View>
  );
}

//Navegação principal tabs
const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const theme = useTheme();
  const { nivelAtual } = useProgresso();
  const headerRightGlobal = () => (
    <View style={{ marginRight: 16, backgroundColor: '#f0f0f0', padding: 8, borderRadius: 8 }}>
      <Text style={{ fontWeight: 'bold', color: '#333' }}>Nível: {nivelAtual}</Text>
    </View>
  );
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Início') {
              iconName = focused ? 'home-analytics' : 'home-analytics';
            } else if (route.name === 'Metas') {
              iconName = focused ? 'target' : 'target';
            } else if (route.name === 'Aprender') {
              iconName = focused ? 'school' : 'school-outline';
            }

            return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
          },
        })}
      >
        <Tab.Screen name="Início" component={SimulationStackNavigator} />
        <Tab.Screen name="Metas" component={TelaMetas} />
        <Tab.Screen name="Aprender" component={EducationStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}