import { apiClient } from '../../../common/services/apiClient';
import { Investimento } from '../types/Investimento';

export const carregarInvestimentos = async (): Promise<Investimento[]> => {
  const { data } = await apiClient.get<Investimento[]>('/investimentos');
  return data;
};
