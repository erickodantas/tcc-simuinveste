# SimuInveste 

> Trabalho de Conclusão de Curso (TCC) - Tecnólogo em Análise e Desenvolvimento de Sistemas

O **SimuInveste** é uma aplicação mobile desenvolvida para auxiliar o público brasileiro de baixa e média renda no planejamento financeiro. O objetivo principal é desmistificar investimentos de baixo risco através de simulações claras, visuais e acessíveis.

---

##  Funcionalidades implementadas (Entrega 20%)

Nesta etapa inicial o foco está no nucleo funcional da simulacao e na arquitetura do projeto:

* **Dashboard conectado:** Exibição da taxa **CDI atualizada** em tempo real (consumo da API do Banco Central).
  Cards informativos com identidade visual definida.
* **Simulador de Investimentos:** Fluxo completo: Entrada de dados (Valor Inicial, Aporte Mensal, Prazo) -> Processamento -> Resultado.
  Cálculo de juros compostos baseado na taxa anual.
* **Visualização de Resultados:** Resumo financeiro (Total Investido, Total em Juros, Montante Final).
  **Gráfico interativo** de evolução patrimonial (utilizando *React Native Gifted Charts*).

---

## Como Executar o Projeto

Para rodar o projeto siga os passos abaixo

### Pré-requisitos
* **Node.js** instalado.
* Um gerenciador de pacotes (**npm** ou **yarn**).
* Dispositivo físico com o app **Expo Go** instalado (Android/iOS) ou emulador configurado.

### Passo a passo

1. **Clone o repositório:**
   bash
   git clone https://github.com/erickodantas/tcc-simuinveste.git
   cd tcc-simuinveste
   

2. **Instale as dependências:**
   npm install
   # ou
   yarn install
   

4. **Inicie o servidor de desenvolvimento:**
   Recomendamos usar a flag `-c` para limpar o cache e garantir que as novas fontes e ícones carreguem corretamente.
   npx expo start -c
   

5. **Abra no dispositivo:**
   * QR Code: Escaneie o QR Code exibido no terminal com o app Expo Go (Android) ou câmera (iOS).
   * Emulador: Pressione `a` para Android ou `i` para iOS no terminal.

---

## 📱 Autores

* **Erick Oliveira Dantas** (Product Owner)
* **Maria Fernanda Barreto dos Anjos** (Scrum Master)

---

*Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP) - Campus Guarulhos*
