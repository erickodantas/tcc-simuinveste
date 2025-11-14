import React from 'react';
import { Text } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { styles } from '../styles/AppStyles';
import { formatCurrency } from '../utils/formatters';
import { SimulationResult } from '../utils/calculations';

interface Props {
    simulation: SimulationResult;
    goalAmount: number;
}

export function ResultCard({ simulation, goalAmount }: Props) {
    const theme = useTheme();

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text style={styles.resultLabel}>Valor final acumulado:</Text>
                <Text style={[styles.resultValue, { color: theme.colors.primary }]}>
                    {formatCurrency(simulation.finalAmount)}
                </Text>
                <Text style={styles.detailLabel}>Meta desejada:</Text>
                <Text style={styles.detailValue}>{formatCurrency(goalAmount)}</Text>
                <Text style={styles.detailLabel}>Total aportado:</Text>
                <Text style={styles.detailValue}>{formatCurrency(simulation.totalInvested)}</Text>
                <Text style={styles.detailLabel}>Total em juros:</Text>
                <Text style={styles.detailValue}>{formatCurrency(simulation.totalInterest)}</Text>
            </Card.Content>
        </Card>
    );
}
