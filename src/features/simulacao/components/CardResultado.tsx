import React from "react";
import { Text } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { styles } from "../../../common/styles/AppStyles";
import { formatCurrency } from "../../../common/utils/formatters";
import { ResultadoSimulacao } from "../../../common/types/ResultadoSimulacao";

interface Props {
  simulacao: ResultadoSimulacao;
  valorMeta: number;
}

export function CardResultado({
  simulacao: simulacao,
  valorMeta: valorMeta,
}: Props) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.resultLabel}>Valor final acumulado:</Text>
        <Text style={[styles.resultValue, { color: theme.colors.primary }]}>
          {formatCurrency(simulacao.montanteFinal)}
        </Text>
        <Text style={styles.detailLabel}>Meta desejada:</Text>
        <Text style={styles.detailValue}>{formatCurrency(valorMeta)}</Text>
        <Text style={styles.detailLabel}>Total aportado:</Text>
        <Text style={styles.detailValue}>
          {formatCurrency(simulacao.totalInvestido)}
        </Text>
        <Text style={styles.detailLabel}>Total em juros:</Text>
        <Text style={styles.detailValue}>
          {formatCurrency(simulacao.totalJuros)}
        </Text>
      </Card.Content>
    </Card>
  );
}
