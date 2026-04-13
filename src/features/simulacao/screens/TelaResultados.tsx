import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-gifted-charts';
import { styles } from '../../../common/styles/AppStyles';
import { CardResultado } from '../components/CardResultado';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SimulationStackParamList } from '../../../navigation/AppNavigator';

type Props = NativeStackScreenProps<SimulationStackParamList, 'Resultados'>;

export function TelaResultados({ navigation, route }: Props) {
  const { simulacao, valorMeta, nomeInvestimento } = route.params;
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const screenWidth = Dimensions.get('window').width;
  const screenPadding = 32;
  const cardPadding = 20;
  const yAxisWidth = 60;
  const safetyMargin = 20;
  const chartWidth = screenWidth - screenPadding - cardPadding - yAxisWidth - safetyMargin;

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Resultado da Simulação" subtitle={nomeInvestimento} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <CardResultado simulacao={simulacao} valorMeta={valorMeta} />

        <Text style={styles.chartTitle}>Evolução do patrimônio</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={simulacao.dadosGrafico}
            areaChart
            height={220}
            isAnimated
            color={primaryColor}
            thickness={3}
            startFillColor={primaryColor}
            endFillColor={primaryColor}
            startOpacity={0.2}
            endOpacity={0.01}
            yAxisLabelWidth={yAxisWidth}
            width={chartWidth}
            adjustToWidth={true}
            xAxisLabelTextStyle={{ fontSize: 10, color: '#555' }}
            yAxisTextStyle={{ fontSize: 11, color: '#555' }}
            
            noOfSections={5}
            
            formatYLabel={(value: any) => {
                const val = Number(value);
                if (val < 1000) return `R$${val}`;
                return `R$${(val / 1000).toFixed(1)}k`; 
            }}
            
            rulesColor="rgba(0,0,0,0.1)"
            hideRules={false}
            
            maxValue={simulacao.montanteFinal * 1.1}
            mostNegativeValue={0}
            initialSpacing={10}
            endSpacing={10}
          />
        </View>
      </ScrollView>
    </View>
  );
}