import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';

jest.mock('react-native-gifted-charts', () => ({
  __esModule: true,
  LineChart: () => null,
}));

jest.mock('../src/common/services/calculos', () => ({
  calcularSimulacao: jest.fn(() => ({
    montanteFinal: 15000,
    totalInvestido: 13000,
    totalJuros: 2000,
    dadosGrafico: [
      { value: 1000, label: 'Hoje' },
      { value: 15000, label: '24m' },
    ],
  })),
}));

jest.mock('../src/contexts/ProgressoContext', () => ({
  __esModule: true,
  useProgresso: jest.fn(() => ({ nivelAtual: 1, evoluirNivel: jest.fn() })),
  ProgressoProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../src/contexts/InvestimentosContext', () => ({
  __esModule: true,
  useInvestimentos: jest.fn(),
  InvestimentosProvider: ({ children }: { children: React.ReactNode }) => children,
}));

import { TelaDashboard } from '../src/features/dashboard/screens/TelaDashboard';
import { TelaSimulacao } from '../src/features/simulacao/screens/TelaSimulacao';
import { useInvestimentos } from '../src/contexts/InvestimentosContext';
import { calcularSimulacao } from '../src/common/services/calculos';
import type { Investimento } from '../src/features/dashboard/types/Investimento';

const investimentosMock: Investimento[] = [
  {
    id: 'poupanca',
    nome: 'Poupança',
    descricao: 'Liquidez imediata.',
    taxaJurosAnual: 6.5,
    nivelNecessario: 1,
    risco: 'Baixo',
    isIsentoIR: true,
  },
  {
    id: 'lc-118',
    nome: 'Letra de Câmbio 118% CDI',
    descricao: 'Maior rentabilidade.',
    taxaJurosAnual: 13.5,
    nivelNecessario: 3,
    risco: 'Baixo',
    isIsentoIR: false,
  },
];

const buildNavigation = () =>
  ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(() => jest.fn()),
    removeListener: jest.fn(),
    isFocused: jest.fn(() => true),
    dispatch: jest.fn(),
  }) as any;

const renderWithProviders = (ui: React.ReactElement) =>
  render(<PaperProvider>{ui}</PaperProvider>);

const getInputs = () => {
  const all = screen.getAllByTestId('text-input-outlined');
  return {
    valorInicial: all[0],
    valorMeta: all[1],
    aporteMensal: all[2],
    prazo: all[3],
  };
};

describe('Fluxo de Simulação de Investimentos (TDD)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useInvestimentos as jest.Mock).mockReturnValue({
      investimentos: investimentosMock,
      loading: false,
      erro: null,
      recarregar: jest.fn(),
    });
  });

  // cenario 1 - sucesso
  describe('Cenário 1 — Sucesso na simulação', () => {
    it('aciona o cálculo e exibe os resultados quando o usuário preenche todos os campos com dados válidos', async () => {
      const navigation = buildNavigation();
      const route: any = {
        params: { nomeInvestimento: 'Poupança', taxaJuros: 6.5 },
      };

      renderWithProviders(
        <TelaSimulacao navigation={navigation} route={route} />,
      );

      const inputs = getInputs();
      fireEvent.changeText(inputs.valorInicial, '1000');
      fireEvent.changeText(inputs.valorMeta, '20000');
      fireEvent.changeText(inputs.aporteMensal, '500');
      fireEvent.changeText(inputs.prazo, '24');
      fireEvent.press(screen.getByText(/^simular$/i));

      await waitFor(() => {
        expect(calcularSimulacao).toHaveBeenCalledTimes(1);
        expect(calcularSimulacao).toHaveBeenCalledWith(1000, 500, 24, 6.5);
      });

      expect(navigation.navigate).toHaveBeenCalledWith(
        'Resultados',
        expect.objectContaining({
          nomeInvestimento: 'Poupança',
          taxaJuros: 6.5,
          valorMeta: 20000,
          simulacao: expect.objectContaining({
            montanteFinal: expect.any(Number),
            totalInvestido: expect.any(Number),
            totalJuros: expect.any(Number),
            dadosGrafico: expect.any(Array),
          }),
        }),
      );
    });
  });

  // cenario 2 - nivel insuficiente
  describe('Cenário 2 — Erro de regra de negócio (tier acima do nível)', () => {
    it('não abre a simulação e exibe "Investimento indisponível" ao tocar em um investimento de nível superior', async () => {
      const navigation = buildNavigation();
      const route: any = { params: undefined };

      renderWithProviders(
        <TelaDashboard navigation={navigation} route={route} />,
      );
      const cardBloqueado = await screen.findByText(
        'Letra de Câmbio 118% CDI',
      );
      fireEvent.press(cardBloqueado);

      expect(navigation.navigate).not.toHaveBeenCalled();

      expect(
        await screen.findByText(/Investimento indisponível/i),
      ).toBeTruthy();
    });
  });

  // cenario 3 - erro de validacao de formulario
  describe('Cenário 3 — Erro de validação de formulário', () => {
    const route: any = {
      params: { nomeInvestimento: 'Poupança', taxaJuros: 6.5 },
    };

    it('exibe "Valores inválidos" ao tentar simular com campos vazios', () => {
      const navigation = buildNavigation();

      renderWithProviders(
        <TelaSimulacao navigation={navigation} route={route} />,
      );

      fireEvent.press(screen.getByText(/^simular$/i));

      expect(calcularSimulacao).not.toHaveBeenCalled();
      expect(navigation.navigate).not.toHaveBeenCalled();
      expect(screen.getByText(/Valores inválidos/i)).toBeTruthy();
    });

    it('exibe "Valores inválidos" quando o prazo é zero ou negativo', () => {
      const navigation = buildNavigation();

      renderWithProviders(
        <TelaSimulacao navigation={navigation} route={route} />,
      );

      const inputs = getInputs();
      fireEvent.changeText(inputs.valorInicial, '1000');
      fireEvent.changeText(inputs.valorMeta, '20000');
      fireEvent.changeText(inputs.aporteMensal, '500');
      fireEvent.changeText(inputs.prazo, '-5');

      fireEvent.press(screen.getByText(/^simular$/i));

      expect(calcularSimulacao).not.toHaveBeenCalled();
      expect(navigation.navigate).not.toHaveBeenCalled();
      expect(screen.getByText(/Valores inválidos/i)).toBeTruthy();
    });
  });
});
