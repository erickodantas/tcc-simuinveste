import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { BottomNavigation, Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Minhas Metas" />
      </Appbar.Header>
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderIcon}>🎯</Text>
        <Text style={styles.placeholderText}>A tela de Metas está em desenvolvimento.</Text>
      </View>
    </View>
  );
}

function EducacaoScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Educação Financeira" />
      </Appbar.Header>
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderIcon}>🎓</Text>
        <Text style={styles.placeholderText}>A tela de Educação está em desenvolvimento.</Text>
      </View>
    </View>
  );
}

export function AppNavigator() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Dashboard' },
    { key: 'metas', title: 'Metas' },
    { key: 'educacao', title: 'Educação' },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
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

  const renderIcon = ({ route, focused, color }: any) => {
    let icon = '📊';
    if (route.key === 'metas') icon = '🎯';
    if (route.key === 'educacao') icon = '🎓';
    return <Text style={{ color, fontSize: focused ? 26 : 24 }}>{icon}</Text>;
  };

  return (
    <NavigationContainer>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
        renderLabel={({ route, color }) => (
          <Text style={{ color, fontSize: 12, textAlign: 'center' }}>
            {routes.find((r) => r.key === route.key)?.title ?? ''}
          </Text>
        )}
      />
    </NavigationContainer>
  );
}
