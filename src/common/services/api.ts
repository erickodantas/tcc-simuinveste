import axios from 'axios';

const getUrlSGS = (serie: number) => `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${serie}/dados/ultimos/1?formato=json`;

const fetchSGSValue = async (serie: number, fallback: number): Promise<number> => {
  try {
    const response = await axios.get(getUrlSGS(serie));
    return parseFloat(response.data[0].valor);
  } catch (error) {
    console.warn(`Erro ao buscar série SGS ${serie}. Usando fallback.`);
    return fallback;
  }
};

export const getCDIRate = async (): Promise<number> => {
  const dailyRate = await fetchSGSValue(12, 0.04);
  const annualRate = (Math.pow(1 + (dailyRate / 100), 252) - 1) * 100;
  return parseFloat(annualRate.toFixed(2));
};

export const getSelicRate = async (): Promise<number> => {
  const dailyRate = await fetchSGSValue(11, 0.04);
  const annualRate = (Math.pow(1 + (dailyRate / 100), 252) - 1) * 100;
  return parseFloat(annualRate.toFixed(2));
};

export const getTRRateAnual = async (): Promise<number> => {
  const monthlyTR = await fetchSGSValue(226, 0.15); 
  const annualTR = (Math.pow(1 + (monthlyTR / 100), 12) - 1) * 100; 
  return parseFloat(annualTR.toFixed(2));
};