export type TipoConteudo = 'flashcard' | 'quiz';

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

export interface SecaoEducacional {
  id: string;
  titulo: string;
  conteudos: ConteudoEducacional[];
}

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
    titulo: 'Renda Variável...',
    conteudos: []
  }
];