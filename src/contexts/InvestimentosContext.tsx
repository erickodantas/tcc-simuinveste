import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { carregarInvestimentos } from '../features/dashboard/services/investimentosService';
import type { Investimento } from '../features/dashboard/types/Investimento';

interface InvestimentosContextData {
  investimentos: Investimento[];
  loading: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
}

const InvestimentosContext = createContext<InvestimentosContextData>({} as InvestimentosContextData);

export function InvestimentosProvider({ children }: { children: React.ReactNode }) {
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const lista = await carregarInvestimentos();
      setInvestimentos(lista);
    } catch (err) {
      console.warn('[InvestimentosContext] Falha ao carregar investimentos:', err);
      setErro('Não foi possível carregar os investimentos.');
      setInvestimentos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  const value = useMemo(
    () => ({ investimentos, loading, erro, recarregar }),
    [investimentos, loading, erro, recarregar],
  );

  return (
    <InvestimentosContext.Provider value={value}>
      {children}
    </InvestimentosContext.Provider>
  );
}

export const useInvestimentos = () => useContext(InvestimentosContext);
