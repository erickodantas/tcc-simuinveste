import { TipoConteudo } from '../data/mockEducacao';

export interface ConteudoEducacional {
  id: string;
  tipo: TipoConteudo;
  titulo: string;
  pergunta: string;
  resposta?: string;
  opcoes?: string[];
  indiceRespostaCorreta?: number;
  explicacaoErro?: string;
}