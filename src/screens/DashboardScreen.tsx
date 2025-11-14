import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from '../styles/AppStyles';
import { getCDIRate } from '../services/api';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  const [cdiRate, setCdiRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);
      const rate = await getCDIRate();
      setCdiRate(rate);
      setLoading(false);
    };
    fetchRate();
  }, []);

  const handleInvestmentPress = () => {
    if (cdiRate !== null) {
      navigation.navigate('Simulation', { investmentName: 'CDI (100%)', interestRate: cdiRate });
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="SimuInveste" subtitle="Dashboard" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Investimentos disponíveis</Text>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity onPress={handleInvestmentPress} disabled={cdiRate === null}>
            <View style={styles.investmentCard}>
              <Text style={styles.cardTitle}>CDI (100%)</Text>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Taxa atual (a.a.)</Text>
                <Text style={styles.cardValue}>{cdiRate?.toFixed(2)}%</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={[styles.riskTag, styles.riskLow]}>Baixo risco</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
