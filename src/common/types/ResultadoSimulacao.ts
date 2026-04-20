export type ResultadoSimulacao = {
    montanteFinal: number;
    totalInvestido: number;
    totalJuros: number;
    dadosGrafico: { value: number; label: string }[];
};