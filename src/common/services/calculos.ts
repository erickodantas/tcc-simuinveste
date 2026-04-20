import type { ResultadoSimulacao } from '../types/ResultadoSimulacao';

export function calcularSimulacao(
    valorInicial: number,
    aporteMensal: number,
    prazo: number,
    taxaJuros: number,
): ResultadoSimulacao {
    let total = valorInicial;
    const taxaJurosMensal = Math.pow(1 + taxaJuros / 100, 1 / 12) - 1;
    const dadosGrafico: { value: number; label: string }[] = [{ value: total, label: 'Hoje' }];

    for ( let mes = 1; mes <= prazo; mes++) {
        total += aporteMensal;
        total *= 1 + taxaJurosMensal;
        const showLabel = mes % 12 === 0 || mes === 1 || mes === prazo;
        dadosGrafico.push({ value: total, label: showLabel ? `${mes}m` : '' });
    }

    const totalInvestido = valorInicial + aporteMensal * prazo;
    const totalJuros = total - totalInvestido;

    return { montanteFinal: total, totalInvestido, totalJuros, dadosGrafico};
}