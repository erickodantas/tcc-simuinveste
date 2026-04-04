import axios from 'axios';
const BCB_API_CDI_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados/ultimos/1?formato=json';

export const getCDIRate = async (): Promise<number> => {
  try {
    console.log('Buscando a taxa CDI na API do Banco Central...');
    const response = await axios.get(BCB_API_CDI_URL);
    const cdiData = response.data[0];
    const dailyRate = parseFloat(cdiData.valor);
    const annualRate = (Math.pow(1 + (dailyRate / 100), 252) - 1) * 100;
    console.log(`Taxa CDI diária recebida: ${dailyRate}%. Taxa anualizada calculada: ${annualRate.toFixed(2)}%`);
    return parseFloat(annualRate.toFixed(2));
  } catch (error) {
    console.error("Erro ao buscar a taxa CDI na API do BCB:", error);
    const fallbackRate = 11.15; 
    console.log(`Usando taxa de fallback: ${fallbackRate}%`);
    return fallbackRate;
  }
};