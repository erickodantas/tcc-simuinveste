import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

interface ProgressoContextData {
  nivelAtual: number;
  evoluirNivel: (novoNivel: number) => void;
}

const ProgressoContext = createContext<ProgressoContextData>({} as ProgressoContextData);

export function ProgressoProvider({ children }: { children: React.ReactNode }) {
  const [nivelAtual, setNivelAtual] = useState(1);

  const evoluirNivel = useCallback((novoNivel: number) => {
    setNivelAtual((prev) => (novoNivel > prev ? novoNivel : prev));
  }, []);

  const contextValue = useMemo(() => ({
    nivelAtual,
    evoluirNivel
  }), [nivelAtual, evoluirNivel]);

  return (
    <ProgressoContext.Provider value={contextValue}>
      {children}
    </ProgressoContext.Provider>
  );
}

export const useProgresso = () => useContext(ProgressoContext);