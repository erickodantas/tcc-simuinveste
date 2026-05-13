import { ConteudoEducacional } from '../types/ConteudoEducacional';
import { SecaoEducacional } from '../types/SecaoEducacional';
import { TipoConteudo } from '../types/ConteudoEducacional';

export const secoesEducacionais: SecaoEducacional[] = [
  // --- POUPANÇA ---
  {
    id: 'sec-poupanca',
    titulo: 'Poupança',
    nivel: 1,
    conteudos: [
      { id: 'p-f1', tipo: 'flashcard', titulo: 'Rendimento Selic Alta', pergunta: 'Como a poupança rende com Selic acima de 8,5%?', resposta: 'Rende 0,5% ao mês + Taxa Referencial (TR).' },
      { id: 'p-f2', tipo: 'flashcard', titulo: 'Rendimento Selic Baixa', pergunta: 'Como a poupança rende com Selic em 8,5% ou menos?', resposta: 'Rende 70% da Selic + Taxa Referencial (TR).' },
      { id: 'p-f3', tipo: 'flashcard', titulo: 'Aniversário', pergunta: 'O que acontece se sacar antes de 30 dias?', resposta: 'Você perde todo o rendimento do período; a poupança só rende no "aniversário" do depósito.' },
      { id: 'p-f4', tipo: 'flashcard', titulo: 'Impostos', pergunta: 'Existe IR na poupança para pessoa física?', resposta: 'Não. A caderneta de poupança é isenta de Imposto de Renda para pessoas físicas.' },
      { id: 'p-f5', tipo: 'flashcard', titulo: 'Liquidez', pergunta: 'Qual a liquidez da poupança?', resposta: 'Liquidez imediata (D+0). O dinheiro fica disponível na hora, inclusive em fins de semana.' },
      { id: 'p-f6', tipo: 'flashcard', titulo: 'Segurança', pergunta: 'Quem garante a poupança?', resposta: 'O Fundo Garantidor de Créditos (FGC), até R$ 250 mil por CPF e instituição.' },
      {
        id: 'p-q1', tipo: 'quiz', titulo: 'Teste de Rendimento', pergunta: 'A Selic está em 10% ao ano. Qual o rendimento mensal da poupança?',
        opcoes: ['70% da Selic mensal.', '0,5% + TR.', '100% do CDI.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'Acima de 8,5% ao ano, a poupança trava no rendimento fixo de 0,5% ao mês mais a TR.'
      },
      {
        id: 'p-q2', tipo: 'quiz', titulo: 'Teste de Poder de Compra', pergunta: 'Se a inflação for 10% e a poupança render 6%, o que acontece?',
        opcoes: ['Você ganhou dinheiro real.', 'Seu poder de compra diminuiu.', 'O banco cobre a diferença.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'Se o rendimento é menor que a inflação, seu dinheiro compra menos coisas do que antes, mesmo que o saldo aumente.'
      }
    ]
  },
  // --- TESOURO DIRETO (SELIC) ---
  {
    id: 'sec-tesouro',
    titulo: 'Tesouro Direto (Selic)',
    nivel: 1,
    conteudos: [
      { id: 't-f1', tipo: 'flashcard', titulo: 'Emissor', pergunta: 'Para quem você empresta dinheiro no Tesouro Direto?', resposta: 'Para o Governo Federal (Estado Brasileiro).' },
      { id: 't-f2', tipo: 'flashcard', titulo: 'Rentabilidade', pergunta: 'Como rende o Tesouro Selic?', resposta: 'Acompanha a taxa Selic diária, sendo um título pós-fixado.' },
      { id: 't-f3', tipo: 'flashcard', titulo: 'Segurança', pergunta: 'Por que é o investimento mais seguro?', resposta: 'Possui o risco soberano; o Governo é o melhor pagador da economia.' },
      { id: 't-f4', tipo: 'flashcard', titulo: 'Custódia B3', pergunta: 'O que é a taxa de custódia?', resposta: 'É uma taxa de 0,20% a.a. cobrada pela B3 (há isenção para os primeiros R$ 10 mil no Selic).' },
      { id: 't-f5', tipo: 'flashcard', titulo: 'Imposto de Renda', pergunta: 'Qual a tabela de IR do Tesouro?', resposta: 'Tabela regressiva (22,5% a 15%) sobre o lucro.' },
      { id: 't-f6', tipo: 'flashcard', titulo: 'IOF', pergunta: 'Quando o IOF é cobrado?', resposta: 'Apenas em resgates feitos com menos de 30 dias de aplicação.' },
      {
        id: 't-q1', tipo: 'quiz', titulo: 'Teste de Liquidez', pergunta: 'Quando posso resgatar o dinheiro no Tesouro Selic?',
        opcoes: ['Apenas no vencimento.', 'Todos os dias úteis (D+0 ou D+1).', 'Apenas após 2 anos.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'O Tesouro Nacional garante a recompra diária, por isso ele é ideal para reserva de emergência.'
      },
      {
        id: 't-q2', tipo: 'quiz', titulo: 'Teste de Garantia', pergunta: 'O Tesouro Direto tem garantia do FGC?',
        opcoes: ['Sim, até R$ 250 mil.', 'Não, a garantia é do próprio Governo Federal.', 'Sim, mas apenas para valores baixos.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'O FGC garante apenas títulos bancários. O Tesouro é garantido pelo Estado, que é uma garantia superior.'
      }
    ]
  },
  // --- CDB ---
  {
    id: 'sec-cdb',
    titulo: 'CDB',
    nivel: 2,
    conteudos: [
      { id: 'cdb-f1', tipo: 'flashcard', titulo: 'O que é?', pergunta: 'O que significa a sigla CDB?', resposta: 'Certificado de Depósito Bancário. É um empréstimo para o banco.' },
      { id: 'cdb-f2', tipo: 'flashcard', titulo: 'Rendimento Comum', pergunta: 'O que significa um CDB de 100% do CDI?', resposta: 'Significa que ele rende exatamente a taxa média de juros do mercado interbancário.' },
      { id: 'cdb-f3', tipo: 'flashcard', titulo: 'Risco de Crédito', pergunta: 'O que avaliar em um CDB?', resposta: 'A saúde do banco. Bancos menores costumam pagar mais para compensar o risco.' },
      { id: 'cdb-f4', tipo: 'flashcard', titulo: 'Carência', pergunta: 'Todo CDB pode ser sacado a qualquer hora?', resposta: 'Não. Alguns possuem liquidez diária, outros apenas no vencimento.' },
      { id: 'cdb-f5', tipo: 'flashcard', titulo: 'FGC no CDB', pergunta: 'CDB tem proteção do FGC?', resposta: 'Sim, é um dos principais títulos protegidos pelo fundo (até R$ 250 mil).' },
      { id: 'cdb-f6', tipo: 'flashcard', titulo: 'Tributação', pergunta: 'Como funciona o imposto no CDB?', resposta: 'Segue a tabela regressiva: quanto mais tempo investido, menor o imposto sobre o lucro.' },
      {
        id: 'cdb-q1', tipo: 'quiz', titulo: 'Teste de Imposto', pergunta: 'Se você resgata um CDB após 2 anos, qual o IR?',
        opcoes: ['22,5%.', '20%.', '15%.'],
        indiceRespostaCorreta: 2, explicacaoErro: 'Após 720 dias (2 anos), a alíquota de IR atinge o patamar mínimo da tabela regressiva (15%).'
      },
      {
        id: 'cdb-q2', tipo: 'quiz', titulo: 'Teste de Comparação', pergunta: 'Um CDB de 100% do CDI rende mais que a poupança?',
        opcoes: ['Sempre rendeu menos.', 'Geralmente rende mais, mesmo com imposto.', 'Rendem exatamente o mesmo.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'Mesmo pagando IR, o fato de render 100% da Selic/CDI costuma superar a regra da poupança (70% da Selic).'
      }
    ]
  },
    // --- LCI (Letra de Crédito Imobiliário) ---
  {
    id: 'sec-lci',
    titulo: 'LCI (Letra de Crédito Imobiliário)',
    nivel: 3,
    conteudos: [
      { id: 'lci-f1', tipo: 'flashcard', titulo: 'O que é?', pergunta: 'O que significa a sigla LCI?', resposta: 'Letra de Crédito Imobiliário. É um título de renda fixa emitido por bancos para captar recursos.' },
      { id: 'lci-f2', tipo: 'flashcard', titulo: 'Destino do Dinheiro', pergunta: 'Para onde vai o dinheiro investido na LCI?', resposta: 'O banco utiliza esse recurso exclusivamente para financiar o setor imobiliário (como financiamento de casas e construtoras).' },
      { id: 'lci-f3', tipo: 'flashcard', titulo: 'A Grande Vantagem', pergunta: 'Por que a LCI é tão procurada por pessoas físicas?', resposta: 'Porque ela é totalmente isenta de Imposto de Renda para investidores Pessoa Física.' },
      { id: 'lci-f4', tipo: 'flashcard', titulo: 'Segurança (FGC)', pergunta: 'A LCI tem proteção do FGC?', resposta: 'Sim! Possui a mesma garantia da poupança e do CDB: até R$ 250 mil por CPF e por instituição.' },
      { id: 'lci-f5', tipo: 'flashcard', titulo: 'Nova Carência (2024)', pergunta: 'Qual é o prazo mínimo que o dinheiro deve ficar investido na LCI?', resposta: 'Pelas regras recentes, a LCI tem uma carência mínima de 12 meses antes de permitir qualquer resgate.' },
      { id: 'lci-f6', tipo: 'flashcard', titulo: 'Comparação', pergunta: 'Uma LCI de 90% do CDI é pior que um CDB de 100% do CDI?', resposta: 'Geralmente não. Como a LCI não tem desconto de Imposto de Renda, o valor líquido que cai na sua conta costuma ser maior.' },
      {
        id: 'lci-q1', tipo: 'quiz', titulo: 'Pegadinha da Isenção', pergunta: 'Se uma empresa (Pessoa Jurídica) investir em LCI, ela também terá isenção de Imposto de Renda?',
        opcoes: ['Sim, a isenção vale para o título em si.', 'Não, a isenção de IR na LCI é um benefício exclusivo para Pessoa Física.', 'Sim, mas apenas para pequenas empresas.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'O incentivo fiscal do governo para o setor imobiliário através da LCI é focado em atrair o dinheiro do investidor comum (Pessoa Física). Empresas pagam imposto normalmente.'
      },
      {
        id: 'lci-q2', tipo: 'quiz', titulo: 'Teste de Lastro', pergunta: 'Um banco pode usar o dinheiro captado via LCI para financiar a compra de frotas de carros?',
        opcoes: ['Não, o recurso deve ser obrigatoriamente destinado ao setor imobiliário.', 'Sim, se o banco tiver autorização especial.', 'Sim, o banco usa o dinheiro como quiser.'],
        indiceRespostaCorreta: 0, explicacaoErro: 'A letra "I" de Imobiliário não é enfeite. É o lastro do título. O banco é obrigado por lei a direcionar esse recurso para financiamentos habitacionais e imobiliários.'
      }
    ]
  },
  
  // --- LCA (Letra de Crédito do Agronegócio) ---
  {
    id: 'sec-lca',
    titulo: 'LCA (Letra de Crédito do Agronegócio)',
    nivel: 3,
    conteudos: [
      { id: 'lca-f1', tipo: 'flashcard', titulo: 'O que é?', pergunta: 'O que significa a sigla LCA?', resposta: 'Letra de Crédito do Agronegócio. Assim como a LCI, é emitida por bancos para captar dinheiro dos investidores.' },
      { id: 'lca-f2', tipo: 'flashcard', titulo: 'Destino do Dinheiro', pergunta: 'O que a LCA financia?', resposta: 'Ela financia o setor rural: produtores agrícolas, compra de maquinário, fertilizantes, cooperativas e pecuária.' },
      { id: 'lca-f3', tipo: 'flashcard', titulo: 'Tributação', pergunta: 'Existe cobrança de IR na LCA?', resposta: 'Não. O governo isenta a LCA de Imposto de Renda para Pessoas Físicas para incentivar o agronegócio.' },
      { id: 'lca-f4', tipo: 'flashcard', titulo: 'Garantia', pergunta: 'Se a colheita do produtor rural falhar, o investidor da LCA perde o dinheiro?', resposta: 'Não! O risco é do banco. E se o banco falir, a LCA é garantida pelo FGC em até R$ 250 mil.' },
      { id: 'lca-f5', tipo: 'flashcard', titulo: 'Nova Carência (2024)', pergunta: 'Qual a carência mínima para poder resgatar uma LCA?', resposta: 'Pelas novas regras, o dinheiro deve ficar investido por no mínimo 9 meses.' },
      { id: 'lca-f6', tipo: 'flashcard', titulo: 'LCA vs CRA', pergunta: 'Qual a diferença básica entre LCA e CRA, já que ambos são do agro?', resposta: 'A LCA é emitida por BANCOS e tem FGC. O CRA é emitido por SECURITIZADORAS e não tem FGC.' },
      {
        id: 'lca-q1', tipo: 'quiz', titulo: 'Diferença de Prazos', pergunta: 'Segundo as regras atuais, qual a diferença de carência mínima entre LCI e LCA?',
        opcoes: ['A LCI tem carência de 12 meses e a LCA de 9 meses.', 'Ambas têm carência de 9 meses.', 'A LCI tem carência de 6 meses e a LCA de 12 meses.'],
        indiceRespostaCorreta: 0, explicacaoErro: 'Em 2024, o Conselho Monetário Nacional alongou os prazos. A LCI passou para 12 meses e a LCA passou para 9 meses de carência mínima.'
      },
      {
        id: 'lca-q2', tipo: 'quiz', titulo: 'Risco de Crédito', pergunta: 'Ao investir em uma LCA do Banco X, qual é o seu risco principal?',
        opcoes: ['O risco da soja cair de preço.', 'O risco de crédito do Banco X (quebrar).', 'O risco da inflação ficar negativa.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'Você está emprestando dinheiro para o banco, não para o fazendeiro diretamente. Portanto, o seu risco é o banco não te pagar (embora o FGC te proteja até 250 mil).'
      }
    ]
  },
  // --- LC (LETRA DE CÂMBIO) ---
  {
    id: 'sec-lc',
    titulo: 'Letra de Câmbio (LC)',
    nivel: 3,
    conteudos: [
      { id: 'lc-f1', tipo: 'flashcard', titulo: 'Emissor', pergunta: 'Quem emite a Letra de Câmbio?', resposta: 'Sociedades Financeiras (não são necessariamente bancos grandes).' },
      { id: 'lc-f2', tipo: 'flashcard', titulo: 'Confusão de Nome', pergunta: 'LC tem a ver com variação do Dólar?', resposta: 'Não! Apesar do nome "Câmbio", ela rende juros comuns (CDI ou Pré), não moeda estrangeira.' },
      { id: 'lc-f3', tipo: 'flashcard', titulo: 'Tributação', pergunta: 'LC tem imposto?', resposta: 'Sim, segue a tabela regressiva de IR, igual ao CDB.' },
      { id: 'lc-f4', tipo: 'flashcard', titulo: 'Rentabilidade', pergunta: 'Por que a LC costuma pagar bem?', resposta: 'Porque financeiras são menores e precisam atrair investidores com taxas melhores.' },
      { id: 'lc-f5', tipo: 'flashcard', titulo: 'Segurança', pergunta: 'LC é garantida pelo FGC?', resposta: 'Sim, possui a mesma proteção bancária padrão.' },
      { id: 'lc-f6', tipo: 'flashcard', titulo: 'Perfil', pergunta: 'Para quem é indicada?', resposta: 'Investidores que buscam taxas melhores e aceitam deixar o dinheiro parado por mais tempo.' },
      {
        id: 'lc-q1', tipo: 'quiz', titulo: 'Teste de Significado', pergunta: 'O rendimento de uma LC varia conforme o Dólar?',
        opcoes: ['Sim, sempre.', 'Não, ela é um título de renda fixa em Reais.', 'Apenas se o investidor escolher.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'O nome "Câmbio" é uma herança histórica jurídica; na prática, é um investimento em Renda Fixa tradicional.'
      },
      {
        id: 'lc-q2', tipo: 'quiz', titulo: 'Teste de Risco', pergunta: 'Qual o risco de uma LC de uma financeira pequena?',
        opcoes: ['Risco de crédito da financeira (coberto pelo FGC).', 'Risco da moeda cair.', 'Risco de perder dinheiro se a bolsa cair.'],
        indiceRespostaCorreta: 0, explicacaoErro: 'O risco principal é a financeira não pagar, mas o FGC protege o investidor nesse cenário até o limite.'
      }
    ]
  },
 // --- CRI (Certificado de Recebíveis Imobiliários) ---
  {
    id: 'sec-cri',
    titulo: 'CRI',
    nivel: 4,
    conteudos: [
      { id: 'cri-f1', tipo: 'flashcard', titulo: 'O que é?', pergunta: 'O que significa a sigla CRI?', resposta: 'Certificado de Recebíveis Imobiliários. É um título que empacota dívidas do setor imobiliário e as vende para investidores.' },
      { id: 'cri-f2', tipo: 'flashcard', titulo: 'Emissor', pergunta: 'Quem emite o CRI? É um banco?', resposta: 'Não. O CRI é emitido exclusivamente por empresas chamadas Securitizadoras.' },
      { id: 'cri-f3', tipo: 'flashcard', titulo: 'Isenção de Imposto', pergunta: 'O CRI paga Imposto de Renda?', resposta: 'Não. Assim como a LCI, o CRI é totalmente isento de Imposto de Renda para Pessoas Físicas.' },
      { id: 'cri-f4', tipo: 'flashcard', titulo: 'A Grande Pegadinha', pergunta: 'O CRI possui garantia do FGC?', resposta: 'NÃO! Diferente da LCI e do CDB, o CRI não tem proteção do Fundo Garantidor de Créditos.' },
      { id: 'cri-f5', tipo: 'flashcard', titulo: 'Risco Principal', pergunta: 'Qual o maior risco de investir em um CRI?', resposta: 'O risco de crédito (calote) das empresas ou pessoas que devem os financiamentos imobiliários que compõem o título.' },
      { id: 'cri-f6', tipo: 'flashcard', titulo: 'Liquidez', pergunta: 'É fácil resgatar um CRI antes do vencimento?', resposta: 'Não. O CRI costuma ter baixa liquidez no mercado secundário, sendo ideal levá-lo até a data de vencimento.' },
      {
        id: 'cri-q1', tipo: 'quiz', titulo: 'Teste de Proteção', pergunta: 'Se a securitizadora que emitiu o CRI falir, o FGC devolve seu dinheiro?',
        opcoes: ['Sim, até 250 mil reais.', 'Não, o CRI não é coberto pelo FGC.', 'Sim, mas o limite é menor.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'CRIs não são títulos bancários, portanto não contam com a proteção do FGC. O investidor depende das garantias atreladas ao próprio título (como os imóveis).'
      },
      {
        id: 'cri-q2', tipo: 'quiz', titulo: 'Comparação Imobiliária', pergunta: 'Qual a principal diferença entre LCI e CRI?',
        opcoes: ['A LCI é isenta de IR e o CRI não.', 'O CRI é emitido por bancos e a LCI por construtoras.', 'A LCI é emitida por bancos e tem FGC; o CRI é emitido por securitizadoras e não tem FGC.'],
        indiceRespostaCorreta: 2, explicacaoErro: 'Ambos financiam o setor imobiliário e são isentos de IR, mas a estrutura de emissão (Banco x Securitizadora) e a garantia do FGC são as grandes diferenças.'
      }
    ]
  },
  // --- CRA (Certificado de Recebíveis do Agronegócio) ---
  {
    id: 'sec-cra',
    titulo: 'CRA',
    nivel: 4,
    conteudos: [
      { id: 'cra-f1', tipo: 'flashcard', titulo: 'O que é?', pergunta: 'O que significa a sigla CRA?', resposta: 'Certificado de Recebíveis do Agronegócio. É um título lastreado em direitos creditórios de negócios rurais.' },
      { id: 'cra-f2', tipo: 'flashcard', titulo: 'Destino do Recurso', pergunta: 'O que o CRA financia?', resposta: 'Financia a cadeia do agronegócio: produtores, cooperativas, compra de maquinário e insumos.' },
      { id: 'cra-f3', tipo: 'flashcard', titulo: 'Vantagem Fiscal', pergunta: 'Existe cobrança de IR no CRA para Pessoa Física?', resposta: 'Não. O CRA desfruta da mesma isenção de Imposto de Renda que a LCA e o CRI.' },
      { id: 'cra-f4', tipo: 'flashcard', titulo: 'Segurança', pergunta: 'O CRA tem proteção do FGC?', resposta: 'NÃO. Assim como o CRI, o CRA é emitido por securitizadoras e não possui cobertura do FGC.' },
      { id: 'cra-f5', tipo: 'flashcard', titulo: 'Rentabilidade', pergunta: 'Como um CRA costuma render?', resposta: 'Pode ser Prefixado, atrelado ao CDI ou, muito comumente, atrelado à inflação (IPCA + taxa fixa).' },
      { id: 'cra-f6', tipo: 'flashcard', titulo: 'Garantias Reais', pergunta: 'Se não tem FGC, o que protege o investidor do CRA?', resposta: 'As garantias reais estruturadas no título, como alienação fiduciária de terras, penhor de safras ou aval de grandes empresas do setor.' },
      {
        id: 'cra-q1', tipo: 'quiz', titulo: 'Teste de Setor e Emissor', pergunta: 'Um banco comercial pode emitir um CRA diretamente para seus clientes?',
        opcoes: ['Sim, é o principal emissor.', 'Não, bancos emitem LCA; CRA é emitido por securitizadoras.', 'Sim, desde que autorizado pelo Banco Central.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'A regulação separa as coisas: Letras (LCI/LCA) são de instituições financeiras. Certificados (CRI/CRA) são empacotados por companhias securitizadoras.'
      },
      {
        id: 'cra-q2', tipo: 'quiz', titulo: 'Cálculo de Risco', pergunta: 'Por que um CRA geralmente oferece uma rentabilidade maior que uma LCA?',
        opcoes: ['Porque o CRA cobra muito Imposto de Renda.', 'Porque o investidor do CRA assume mais risco por não ter o FGC.', 'Porque o agronegócio paga juros duplos.'],
        indiceRespostaCorreta: 1, explicacaoErro: 'No mercado financeiro, risco e retorno andam juntos. A falta da segurança do FGC exige que o CRA pague um "prêmio" (rendimento maior) para atrair o investidor.'
      }
    ]
  },
  // --- LF (Letra Financeira) ---
  {
    id: 'sec-lf',
    titulo: 'Letra Financeira (LF)',
    nivel: 5,
    conteudos: [
      { id: 'lf-f1', tipo: 'flashcard', titulo: 'O que é?', pergunta: 'O que é uma Letra Financeira (LF)?', resposta: 'É um título de renda fixa emitido por instituições financeiras para captar recursos de longo prazo.' },
      { id: 'lf-f2', tipo: 'flashcard', titulo: 'Acesso Restrito', pergunta: 'A LF é para quem está começando a investir com R$ 100?', resposta: 'Não. A LF exige valores de aplicação iniciais altos (mínimo de R$ 50 mil, e frequentemente focada em investidores qualificados).' },
      { id: 'lf-f3', tipo: 'flashcard', titulo: 'Prazo', pergunta: 'Qual é o prazo mínimo de uma Letra Financeira?', resposta: 'A LF é focada no longo prazo. O prazo mínimo legal de vencimento é de 2 anos (24 meses).' },
      { id: 'lf-f4', tipo: 'flashcard', titulo: 'Resgate Antecipado', pergunta: 'Posso sacar minha LF antes do vencimento se houver emergência?', resposta: 'Não. É proibido o resgate antecipado da LF. O dinheiro fica travado até o prazo final.' },
      { id: 'lf-f5', tipo: 'flashcard', titulo: 'O Maior Risco', pergunta: 'A LF tem garantia do FGC?', resposta: 'NÃO! Mesmo sendo emitida por bancos (igual ao CDB), a Letra Financeira não possui cobertura do FGC.' },
      { id: 'lf-f6', tipo: 'flashcard', titulo: 'Impostos', pergunta: 'A LF é isenta de Imposto de Renda?', resposta: 'Não. Ela segue a tabela regressiva. Como o prazo mínimo é de 2 anos, ela sempre atinge a alíquota mínima de 15% no vencimento.' },
      {
        id: 'lf-q1', tipo: 'quiz', titulo: 'Teste de Pegadinha Bancária', pergunta: 'Um banco emite CDB, LCI e LF. Qual desses investimentos NÃO conta com a proteção do FGC?',
        opcoes: ['LCI.', 'CDB.', 'Letra Financeira (LF).'],
        indiceRespostaCorreta: 2, explicacaoErro: 'Essa é uma pegadinha clássica. Apesar de ser um título bancário puro, a regulação excluiu a LF da proteção do FGC justamente por ser focada em investidores de grande porte.'
      },
      {
        id: 'lf-q2', tipo: 'quiz', titulo: 'Teste de Perfil', pergunta: 'Para qual objetivo a Letra Financeira (LF) é ABSOLUTAMENTE contraindicada?',
        opcoes: ['Reserva de emergência.', 'Aposentadoria daqui a 10 anos.', 'Diversificação de patrimônio elevado.'],
        indiceRespostaCorreta: 0, explicacaoErro: 'Como a LF proíbe o resgate antecipado (carência mínima de 2 anos), usá-la como reserva de emergência é um erro crítico de liquidez.'
      }
    ]
  }
];