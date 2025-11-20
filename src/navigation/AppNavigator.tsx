import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { BottomNavigation, Appbar, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SimulationScreen } from '../screens/SimulationScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { styles } from '../styles/AppStyles';
import type { SimulationResult } from '../utils/calculations';

export type SimulationStackParamList = {
  Dashboard: undefined;
  Simulation: { investmentName: string; interestRate: number };
  Results: {
    simulation: SimulationResult;
    goalAmount: number;
    interestRate: number;
    investmentName: string;
  };
};

const Stack = createNativeStackNavigator<SimulationStackParamList>();

function SimulationStackNavigator() {
  return (
    <Stack.Navigator
        id={'simulation-stack' as unknown as undefined}
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Simulation" component={SimulationScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
}

function MetasScreen() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Minhas Metas" />
      </Appbar.Header>
      <View style={styles.placeholderContainer}>
        <MaterialCommunityIcons name="target" size={64} color={theme.colors.secondary} style={styles.placeholderIcon} />
        <Text style={styles.placeholderText}>A tela de Metas está em desenvolvimento.</Text>
      </View>
    </View>
  );
}

function EducacaoScreen() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Educação Financeira" />
      </Appbar.Header>
      <View style={styles.placeholderContainer}>
        <MaterialCommunityIcons name="school-outline" size={64} color={theme.colors.secondary} style={styles.placeholderIcon} />
        <Text style={styles.placeholderText}>A tela de Educação está em desenvolvimento.</Text>
      </View>
    </View>
  );
}

export function AppNavigator() {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  
  // Definindo as rotas
  const [routes] = useState([
    { key: 'dashboard', title: 'Início', focusedIcon: 'home-analytics', unfocusedIcon: 'home-analytics' },
    { key: 'metas', title: 'Metas', focusedIcon: 'target', unfocusedIcon: 'target' },
    { key: 'educacao', title: 'Aprender', focusedIcon: 'school', unfocusedIcon: 'school-outline' },
  ]);

  const renderScene = ({ route, jumpTo }: any) => {
    switch (route.key) {
      case 'dashboard':
        return <SimulationStackNavigator />;
      case 'metas':
        return <MetasScreen />;
      case 'educacao':
        return <EducacaoScreen />;
      default:
        return null;
    }
  };

  return (
    <NavigationContainer>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        theme={theme}
        barStyle={{ backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' }}
        activeColor={theme.colors.primary}
        inactiveColor="#999"
        renderIcon={({ route, focused, color }) => {
           const routeConfig = routes.find(r => r.key === route.key);
           const iconName = focused ? routeConfig?.focusedIcon : routeConfig?.unfocusedIcon;
           // @ts-ignore
           return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
        }}
      />
    </NavigationContainer>
  );
}