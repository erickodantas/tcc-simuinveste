import { getCDIRate, getSelicRate, getTRRateAnual } from '../../../common/services/api';
import { Investimento } from '../types/Investimento';

export const carregarInvestimentos = async (): Promise<Investimento[]> => {
  // taxas base
  const [cdi, selic, tr] = await Promise.all([
    getCDIRate(),
    getSelicRate(),
    getTRRateAnual()
  ]);

  // regras específicas
  const taxaPoupanca = selic > 8.5 ? 6.17 + tr : (selic * 0.7) + tr;

  // catalogo de investimentos
  return [
    {
      id: 'poupanca',
      nome: 'Poupança',
      descricao: 'O investimento mais tradicional, liquidez imediata.',
      taxaJurosAnual: taxaPoupanca,
      nivelNecessario: 1,
      risco: 'Baixo',
      isIsentoIR: true,
    },
    {
      id: 'tesouro-selic',
      nome: 'Tesouro Direto (Selic)',
      descricao: 'Empréstimo ao Governo Federal. O mais seguro do país.',
      taxaJurosAnual: selic + 0.05,
      nivelNecessario: 1,
      risco: 'Baixo',
      isIsentoIR: false,
    },
    {
      id: 'cdb-100',
      nome: 'CDB 100% CDI',
      descricao: 'Empréstimo para bancos com garantia do FGC.',
      taxaJurosAnual: cdi,
      nivelNecessario: 2,
      risco: 'Baixo',
      isIsentoIR: false,
    },
    {
      id: 'lci-90',
      nome: 'LCI 90% CDI',
      descricao: 'Focado no setor imobiliário e isento de IR.',
      taxaJurosAnual: cdi * 0.90,
      nivelNecessario: 2, 
      risco: 'Baixo',
      isIsentoIR: true,
    },
    {
      id: 'lc-118',
      nome: 'Letra de Câmbio 118% CDI',
      descricao: 'Emitido por financeiras, rentabilidade maior.',
      taxaJurosAnual: cdi * 1.18,
      nivelNecessario: 3, 
      risco: 'Baixo',
      isIsentoIR: false,
    }
  ];
};