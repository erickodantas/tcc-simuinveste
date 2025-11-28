export type ResultadoSimulacao = {
    montanteFinal: number;
    totalInvestido: number;
    totalJuros: number;
    dadosGrafico: { value: number; label: string }[];
};

export function calcularSimulacao(
    valorInicial: number,
    aporteMensal: number,
    prazo: number,
    taxaJuros: number,
): ResultadoSimulacao {
    let total = valorInicial;
    const monthlyInterestRate = Math.pow(1 + taxaJuros / 100, 1 / 12) - 1;
    const chartData: { value: number; label: string }[] = [{ value: total, label: 'Hoje' }];

    for (let month = 1; month <= prazo; month++) {
        total += aporteMensal;
        total *= 1 + monthlyInterestRate;
        const showLabel = month % 12 === 0 || month === 1 || month === prazo;
        chartData.push({ value: total, label: showLabel ? `${month}m` : '' });
    }

    const totalInvested = valorInicial + aporteMensal * prazo;
    const totalInterest = total - totalInvested;

    return { montanteFinal: total, totalInvestido: totalInvested, totalJuros: totalInterest, dadosGrafico: chartData };
}
