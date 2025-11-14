export type SimulationResult = {
    finalAmount: number;
    totalInvested: number;
    totalInterest: number;
    chartData: { value: number; label: string }[];
};

export function calculateSimulation(
    initialAmount: number,
    monthlyContribution: number,
    period: number,
    interestRate: number,
): SimulationResult {
    let total = initialAmount;
    const monthlyInterestRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
    const chartData: { value: number; label: string }[] = [{ value: total, label: 'Hoje' }];

    for (let month = 1; month <= period; month++) {
        total += monthlyContribution;
        total *= 1 + monthlyInterestRate;
        const showLabel = month % 12 === 0 || month === 1 || month === period;
        chartData.push({ value: total, label: showLabel ? `${month}m` : '' });
    }

    const totalInvested = initialAmount + monthlyContribution * period;
    const totalInterest = total - totalInvested;

    return { finalAmount: total, totalInvested, totalInterest, chartData };
}
