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
};

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
    </EdStack.Navigator>
  );
}

function TelaMetas() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.placeholderContainer}>
        <MaterialCommunityIcons name="target" size={64} color={theme.colors.secondary} style={styles.placeholderIcon} />
        <Text style={styles.placeholderText}>A tela de Metas está em desenvolvimento.</Text>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const ICON_MAP: Record<string, { focused: string; unfocused: string }> = {
  'Início':   { focused: 'home-analytics', unfocused: 'home-analytics' },
  'Metas':    { focused: 'target',         unfocused: 'target' },
  'Aprender': { focused: 'school',       unfocused: 'school-outline' },
};

export function AppNavigator() {
  const theme = useTheme();
  const { nivelAtual } = useProgresso();

  const headerRightGlobal = () => (
    <View style={{ marginRight: 16, backgroundColor: '#f0f0f0', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20 }}>
      <Text style={{ fontWeight: 'bold', color: theme.colors.primary, fontSize: 12 }}>
        Nível: {nivelAtual}
      </Text>
    </View>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerRight: headerRightGlobal,
          headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
          headerTitleStyle: { fontWeight: 'bold' },
          
          tabBarIcon: ({ focused, color, size }) => {
            const icons = ICON_MAP[route.name];
            const iconName = focused ? icons.focused : icons.unfocused;
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