import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../common/styles/AppStyles';
import { carregarInvestimentos } from '../services/investimentosService';
import { Investimento } from '../types/Investimento';
import { useProgresso } from '../../../contexts/ProgressoContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Dashboard'>;

export function TelaDashboard({ navigation }: Props) {
  const { nivelAtual } = useProgresso();
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchInvestimentos = async () => {
      setLoading(true);
      const dados = await carregarInvestimentos();
      setInvestimentos(dados);
      setLoading(false);
    };
    fetchInvestimentos();
  }, []);

  const handleInvestmentPress = (inv: Investimento) => {
    navigation.navigate('Simulacao', { 
      nomeInvestimento: inv.nome, 
      taxaJuros: inv.taxaJurosAnual 
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Catálogo de Investimentos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#69c6dd" style={{ marginTop: 20 }} />
        ) : (
          investimentos.map((inv) => {
            const isBloqueado = inv.nivelNecessario > nivelAtual;

            return (
              <TouchableOpacity 
                key={inv.id}
                onPress={() => handleInvestmentPress(inv)} 
                disabled={isBloqueado}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.investmentCard, 
                  isBloqueado && { opacity: 0.5, backgroundColor: '#e0e0e0' }
                ]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.cardTitle, isBloqueado && { color: '#888' }]}>
                      {inv.nome}
                    </Text>
                    {isBloqueado && (
                      <MaterialCommunityIcons name="lock" size={24} color="#888" />
                    )}
                  </View>
                  
                  <Text style={{ color: '#666', marginBottom: 12, fontSize: 12 }}>
                    {inv.descricao}
                  </Text>

                  <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Taxa atual (a.a.)</Text>
                    <Text style={[styles.cardValue, isBloqueado && { color: '#888' }]}>
                      {inv.taxaJurosAnual.toFixed(2)}%
                    </Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={[styles.riskTag, styles.riskLow, isBloqueado && { backgroundColor: '#ccc', color: '#666' }]}>
                      {inv.risco} risco
                    </Text>
                    {isBloqueado && (
                      <Text style={{ fontSize: 12, color: '#888', fontWeight: 'bold' }}>
                        Desbloqueia no Nível {inv.nivelNecessario}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}