import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, HelperText } from 'react-native-paper';
import { styles } from '../../../common/styles/AppStyles';
import { calcularSimulacao } from '../../../common/services/calculos';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Simulacao'>;

export function TelaSimulacao({ navigation, route }: Props) {
  const { nomeInvestimento, taxaJuros } = route.params;
  const [valorInicial, setValorInicial] = useState('0');
  const [valorMeta, setValorMeta] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');
  const [prazo, setPrazo] = useState('');
  const [erroValidacao, setErroValidacao] = useState(false);

  const parseNumero = (raw: string) => parseFloat(raw.replace(/,/g, '.'));

  const handleSimulate = () => {
    const camposObrigatoriosVazios = !valorMeta || !aporteMensal || !prazo;

    const simInicial = parseNumero(valorInicial);
    const simAporte = parseNumero(aporteMensal);
    const simMeta = parseNumero(valorMeta);
    const simPrazo = parseInt(prazo, 10);

    const numerosInvalidos =
      Number.isNaN(simInicial) ||
      Number.isNaN(simAporte) ||
      Number.isNaN(simMeta) ||
      Number.isNaN(simPrazo) ||
      simPrazo <= 0;

    if (camposObrigatoriosVazios || numerosInvalidos) {
      setErroValidacao(true);
      return;
    }

    setErroValidacao(false);
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

        <HelperText type="error" visible={erroValidacao}>
          Valores inválidos
        </HelperText>
      </ScrollView>
    </View>
  );
}
