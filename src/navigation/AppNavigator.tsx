import React, { useState } from "react";
import { Text, View } from "react-native";
import { BottomNavigation, Appbar, useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TelaDashboard as TelaDashboard } from "../features/dashboard/screens/TelaDashboard";
import { TelaSimulacao as TelaSimulacao } from "../features/simulacao/screens/TelaSimulacao";
import { TelaResultados as TelaResultados } from "../features/simulacao/screens/TelaResultados";
import { styles } from "../common/styles/AppStyles";
import type { ResultadoSimulacao } from "../common/services/calculos";

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

const Stack = createNativeStackNavigator<SimulationStackParamList>();

function SimulationStackNavigator() {
  return (
    <Stack.Navigator
      id={"simulation-stack" as unknown as undefined}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Dashboard" component={TelaDashboard} />
      <Stack.Screen name="Simulacao" component={TelaSimulacao} />
      <Stack.Screen name="Resultados" component={TelaResultados} />
    </Stack.Navigator>
  );
}

function TelaMetas() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Minhas Metas" />
      </Appbar.Header>
      <View style={styles.placeholderContainer}>
        <MaterialCommunityIcons
          name="target"
          size={64}
          color={theme.colors.secondary}
          style={styles.placeholderIcon}
        />
        <Text style={styles.placeholderText}>
          A tela de Metas está em desenvolvimento.
        </Text>
      </View>
    </View>
  );
}

function TelaEducacao() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Educação Financeira" />
      </Appbar.Header>
      <View style={styles.placeholderContainer}>
        <MaterialCommunityIcons
          name="school-outline"
          size={64}
          color={theme.colors.secondary}
          style={styles.placeholderIcon}
        />
        <Text style={styles.placeholderText}>
          A tela de Educação está em desenvolvimento.
        </Text>
      </View>
    </View>
  );
}

export function AppNavigator() {
  const theme = useTheme();
  const [index, setIndex] = useState(0);

  // definindo rotas
  const [routes] = useState([
    {
      key: "dashboard",
      title: "Início",
      focusedIcon: "home-analytics",
      unfocusedIcon: "home-analytics",
    },
    {
      key: "metas",
      title: "Metas",
      focusedIcon: "target",
      unfocusedIcon: "target",
    },
    {
      key: "educacao",
      title: "Aprender",
      focusedIcon: "school",
      unfocusedIcon: "school-outline",
    },
  ]);

  const renderScene = ({ route, jumpTo }: any) => {
    switch (route.key) {
      case "dashboard":
        return <SimulationStackNavigator />;
      case "metas":
        return <TelaMetas />;
      case "educacao":
        return <TelaEducacao />;
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
        barStyle={{
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        }}
        activeColor={theme.colors.primary}
        inactiveColor="#999"
        renderIcon={({ route, focused, color }) => {
          const routeConfig = routes.find((r) => r.key === route.key);
          const iconName = focused
            ? routeConfig?.focusedIcon
            : routeConfig?.unfocusedIcon;
          return (
            <MaterialCommunityIcons
              name={iconName as any}
              size={24}
              color={color}
            />
          );
        }}
      />
    </NavigationContainer>
  );
}
