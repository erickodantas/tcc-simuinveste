import { ConteudoEducacional } from '../types/ConteudoEducacional';
import { SecaoEducacional } from '../types/SecaoEducacional';

export type TipoConteudo = 'flashcard' | 'quiz';

export const secoesEducacionais: SecaoEducacional[] = [
  {
    id: 'sec-1',
    titulo: 'Renda Fixa',
    conteudos: [
      {
        id: 'c1',
        tipo: 'flashcard',
        titulo: 'O que é Renda Fixa?',
        pergunta: 'O que define um investimento de Renda Fixa?',
        resposta: 'É uma categoria onde as regras de rendimento são definidas no momento da aplicação, oferecendo maior previsibilidade e menor risco.'
      },
      {
        id: 'c2',
        tipo: 'flashcard',
        titulo: 'Entendendo o CDI',
        pergunta: 'O que é o CDI e por que ele importa?',
        resposta: 'Certificado de Depósito Interbancário. É a taxa de empréstimo entre bancos, usada como o principal índice de referência para a rentabilidade da Renda Fixa.'
      },
      {
        id: 'c3',
        tipo: 'quiz',
        titulo: 'Teste seus conhecimentos',
        pergunta: 'Se um investimento rende 100% do CDI, o que isso significa na prática?',
        opcoes: [
          'Que ele vai dobrar de valor em 1 ano.',
          'Que ele rende exatamente a mesma variação da taxa CDI no período.',
          'Que ele é isento de imposto de renda.'
        ],
        indiceRespostaCorreta: 1,
        explicacaoErro: 'Render 100% do CDI significa que o rendimento acompanha integralmente o índice, não que o valor investido será duplicado.'
      }
    ]
  },
  {
    id: 'sec-2',
    titulo: 'Renda Variável',
    conteudos: [
      {
        id: 'c4',
        tipo: 'flashcard',
        titulo: 'O que são Ações?',
        pergunta: 'O que significa comprar uma ação de uma empresa?',
        resposta: 'Significa comprar uma pequena "fatia" dessa empresa. Você se torna sócio e passa a participar dos lucros (dividendos) e dos riscos do negócio.'
      },
      {
        id: 'c5',
        tipo: 'flashcard',
        titulo: 'A Bolsa de Valores',
        pergunta: 'O que é a B3?',
        resposta: 'É a bolsa de valores oficial do Brasil. É o ambiente onde ocorre a compra e venda de ações e outros ativos financeiros.'
      },
      {
        id: 'c6',
        tipo: 'quiz',
        titulo: 'Risco e Retorno',
        pergunta: 'Na renda variável, qual é a relação clássica entre risco e retorno esperado?',
        opcoes: [
          'Quanto maior o risco, menor o retorno esperado.',
          'O risco e o retorno são fixos e garantidos.',
          'Quanto maior o risco assumido, maior o potencial de retorno.'
        ],
        indiceRespostaCorreta: 2,
        explicacaoErro: 'Na renda variável, para buscar retornos mais altos, o investidor geralmente precisa aceitar níveis maiores de risco de variação de preço. Não há garantias.'
      }
    ]
  }
];