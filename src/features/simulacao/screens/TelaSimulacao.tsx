import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { styles } from '../styles/AppStyles';
import { calcularSimulacao } from '../utils/calculos';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Simulacao'>;

export function TelaSimulacao({ navigation, route }: Props) {
  const { nomeInvestimento, taxaJuros } = route.params;
  const [valorInicial, setValorInicial] = useState('0');
  const [valorMeta, setValorMeta] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');
  const [prazo, setPrazo] = useState('');

  const handleSimulate = () => {
    if (!valorMeta || !aporteMensal || !prazo) return;

    const simInicial = parseFloat(valorInicial.replace(',', '.')) || 0;
    const simAporte = parseFloat(aporteMensal.replace(',', '.')) || 0;
    const simPrazo = parseInt(prazo, 10) || 0;
    const simMeta = parseFloat(valorMeta.replace(',', '.')) || 0;

    const dadosSimulacao = calcularSimulacao(simInicial, simAporte, simPrazo, taxaJuros);

    navigation.navigate('Resultados', {
      simulacao: dadosSimulacao,
      valorMeta: simMeta,
      taxaJuros: taxaJuros,
      nomeInvestimento: nomeInvestimento,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={nomeInvestimento} subtitle={`Taxa: ${taxaJuros.toFixed(2)}% a.a.`} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Defina seus valores</Text>

        <TextInput
          label="Valor inicial (R$)"
          value={valorInicial}
          onChangeText={setValorInicial}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Valor final desejado (R$)"
          value={valorMeta}
          onChangeText={setValorMeta}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Aporte mensal (R$)"
          value={aporteMensal}
          onChangeText={setAporteMensal}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Prazo (em meses)"
          value={prazo}
          onChangeText={setPrazo}
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
