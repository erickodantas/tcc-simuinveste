import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from '../../../common/styles/AppStyles';
import { getCDIRate as getTaxaCdi } from '../../../common/services/api';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Dashboard'>;

export function TelaDashboard({ navigation }: Props) {
  const [taxaCdi, setTaxaCdi] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);
      const rate = await getTaxaCdi();
      setTaxaCdi(rate);
      setLoading(false);
    };
    fetchRate();
  }, []);

  const handleInvestmentPress = () => {
    if (taxaCdi !== null) {
      navigation.navigate('Simulacao', { nomeInvestimento: 'CDI (100%)', taxaJuros: taxaCdi });
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
          <TouchableOpacity onPress={handleInvestmentPress} disabled={taxaCdi === null}>
            <View style={styles.investmentCard}>
              <Text style={styles.cardTitle}>CDI (100%)</Text>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Taxa atual (a.a.)</Text>
                <Text style={styles.cardValue}>{taxaCdi?.toFixed(2)}%</Text>
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
