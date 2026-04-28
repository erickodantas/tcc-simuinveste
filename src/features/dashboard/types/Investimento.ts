export type RiscoInvestimento = 'Baixo' | 'Médio' | 'Alto';

export interface Investimento {
  id: string;
  nome: string;
  descricao: string;
  taxaJurosAnual: number;
  nivelNecessario: number;
  risco: RiscoInvestimento;
  isIsentoIR: boolean;
}