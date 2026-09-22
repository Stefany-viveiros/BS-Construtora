# BS Construtora

Site institucional premium e responsivo desenvolvido para a **BS Construtora**, empresa especializada em construção civil, reformas, acabamentos e serviços relacionados.

O projeto foi pensado para oferecer uma experiência moderna, sofisticada e profissional, funcionando como a porta de entrada para futuros recursos de atendimento, orçamento, gestão de obras e relacionamento com clientes.

---

## 🏗️ Sobre o projeto

A BS Construtora atua em serviços de construção civil, incluindo obras residenciais e comerciais, reformas em geral, pisos e revestimentos, instalações elétricas, pintura e acabamentos.

O site foi desenvolvido com foco em:

* Apresentação profissional da empresa
* Experiência moderna e responsiva
* Divulgação dos serviços
* Apresentação de projetos
* Solicitação de orçamento
* Contato direto com a empresa
* Estrutura preparada para futuras funcionalidades de gestão

A proposta visual utiliza uma identidade sofisticada baseada principalmente em tons de verde profundo, verde oliva, creme e detalhes dourados.

---

## ✨ Funcionalidades atuais

### Site institucional

* Hero section com chamada principal
* Apresentação da empresa
* Seção de serviços
* Portfólio/projetos
* Filtros de projetos por categoria
* Comparação de antes e depois
* Diferenciais da empresa
* Depoimentos
* Seção de chamada para orçamento
* Formulário de contato/orçamento
* Informações de contato
* Botão flutuante de WhatsApp
* Layout totalmente responsivo

### Serviços apresentados

* Construção Residencial
* Obras Comerciais
* Reformas em Geral
* Pisos e Revestimentos
* Instalações Elétricas
* Pintura e Acabamento

---

## 🎨 Identidade visual

A identidade visual foi desenvolvida para fugir do padrão visual genérico de empresas de construção.

### Paleta principal

| Cor            | Utilização                                   |
| -------------- | -------------------------------------------- |
| Verde profundo | Identidade principal e áreas de destaque     |
| Verde escuro   | Cabeçalho, rodapé e elementos institucionais |
| Verde oliva    | Elementos secundários                        |
| Creme          | Fundo das seções                             |
| Branco         | Textos e contraste                           |
| Dourado        | Detalhes, destaques e chamadas               |

A combinação foi escolhida para transmitir uma percepção de:

**sofisticação • confiança • qualidade • profissionalismo**

---

## 🛠️ Tecnologias utilizadas

### Front-end

* React
* Vite
* JavaScript
* CSS
* Lucide React

### Estrutura planejada

O projeto foi desenvolvido inicialmente como uma aplicação front-end, mas sua arquitetura está sendo preparada para receber um backend e funcionalidades de gestão.

---

## 📁 Estrutura do projeto

```text
bs-construtora/
│
├── public/
│   └── ...
│
├── src/
│   ├── main.jsx
│   ├── styles.css
│   └── ...
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

A estrutura pode ser ampliada conforme novas funcionalidades forem implementadas.

---

# 🚀 Como executar o projeto

## 1. Pré-requisitos

Antes de começar, é necessário ter instalado:

* Node.js
* npm
* Git

Para verificar se o Node.js está instalado:

```bash
node -v
```

Para verificar o npm:

```bash
npm -v
```

Para verificar o Git:

```bash
git --version
```

---

## 2. Clonar o repositório

Clone o projeto:

```bash
git clone URL_DO_REPOSITORIO
```

Depois entre na pasta:

```bash
cd bs-construtora
```

> Substitua `URL_DO_REPOSITORIO` pela URL do repositório da BS Construtora no GitHub.

---

## 3. Instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

Esse comando instala todas as dependências necessárias definidas no `package.json`.

---

## 4. Configurar as variáveis de ambiente

O projeto utiliza variáveis de ambiente para informações que não devem ficar diretamente no código.

Crie um arquivo:

```text
.env
```

Na raiz do projeto.

Exemplo:

```env
VITE_API_URL=http://localhost:8000
VITE_WHATSAPP_NUMBER=5511999999999
```

### VITE_API_URL

Define o endereço da API que será utilizada pelo front-end.

Durante o desenvolvimento local:

```env
VITE_API_URL=http://localhost:8000
```

Quando o backend estiver hospedado, esse endereço deverá ser substituído pela URL da API em produção.

### VITE_WHATSAPP_NUMBER

Número utilizado pelo botão de WhatsApp.

O número deve ser informado no formato internacional, sem espaços, parênteses ou caracteres especiais.

Exemplo:

```env
VITE_WHATSAPP_NUMBER=5511999999999
```

> Não coloque informações sensíveis diretamente no código-fonte ou publique chaves privadas no GitHub.

---

# 💻 Executando em ambiente de desenvolvimento

Depois de instalar as dependências:

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento.

Normalmente será exibido no terminal um endereço semelhante a:

```text
http://localhost:5173
```

Abra o endereço no navegador.

---

# 🏗️ Backend

O formulário de orçamento foi estruturado para enviar os dados para uma API.

Atualmente, o front-end utiliza:

```text
POST /api/orcamentos
```

A URL base da API é definida através de:

```env
VITE_API_URL
```

Exemplo:

```text
http://localhost:8000/api/orcamentos
```

O backend será desenvolvido nas próximas etapas do projeto.

---

# 📦 Build para produção

Para gerar a versão otimizada do projeto:

```bash
npm run build
```

Os arquivos finais serão gerados na pasta:

```text
dist/
```

Para visualizar localmente a versão de produção:

```bash
npm run preview
```

---

# 📱 Responsividade

O projeto foi desenvolvido para funcionar em diferentes tamanhos de tela:

* Desktop
* Notebook
* Tablet
* Smartphone

A área administrativa e a área do cliente, que serão desenvolvidas posteriormente, terão prioridade de experiência em dispositivos móveis.

---

# 🔐 Segurança

O projeto está sendo desenvolvido pensando em segurança desde o início.

As próximas etapas deverão contemplar:

* Autenticação de usuários
* Controle de acesso
* Proteção de rotas
* Validação de dados
* Variáveis de ambiente
* Proteção da API
* Controle de uploads
* Armazenamento seguro de documentos
* Controle de permissões
* Registro de atividades
* Boas práticas relacionadas à LGPD

Informações sensíveis não devem ser armazenadas diretamente no front-end.

---

# 🧭 Próximas etapas

O site institucional representa apenas a primeira etapa do projeto.

A evolução planejada transforma o site em uma plataforma digital para relacionamento e gestão de clientes e obras.

## Fase 1 — Captação de clientes

* [ ] Criar backend
* [ ] Criar banco de dados
* [ ] Implementar API de orçamentos
* [ ] Salvar solicitações
* [ ] Enviar notificações por e-mail
* [ ] Integrar notificações via WhatsApp
* [ ] Validar dados enviados pelo formulário

---

## Fase 2 — Área administrativa

* [ ] Criar autenticação administrativa
* [ ] Criar dashboard
* [ ] Listar solicitações
* [ ] Visualizar detalhes do cliente
* [ ] Alterar status do atendimento
* [ ] Registrar histórico de contatos
* [ ] Gerenciar clientes
* [ ] Gerenciar orçamentos

Fluxo inicial:

```text
Novo
 ↓
Em análise
 ↓
Em contato
 ↓
Visita agendada
 ↓
Visita realizada
 ↓
Orçamento em elaboração
 ↓
Orçamento enviado
 ↓
Negociação
 ↓
Aprovado / Não fechado
```

---

## Fase 3 — Área do cliente

Criar uma área exclusiva para clientes.

O cliente poderá acompanhar pelo celular:

* Orçamento
* Contrato
* Pagamentos
* Cronograma
* Etapas da obra
* Fotos
* Documentos
* Mensagens
* Solicitações de alteração

---

## Fase 4 — Contratos e pagamentos

* [ ] Gerenciamento de contratos
* [ ] Geração de documentos
* [ ] Assinatura digital
* [ ] Integração com gateway de pagamento
* [ ] Pix
* [ ] Controle de parcelas
* [ ] Registro automático de pagamentos
* [ ] Histórico financeiro

Os dados de cartão não serão armazenados diretamente pela aplicação.

---

## Fase 5 — Gestão das obras

Criar uma área para acompanhamento de cada obra.

### Informações planejadas

* Cliente
* Endereço
* Valor
* Prazo
* Data de início
* Previsão de término
* Responsáveis
* Etapas
* Cronograma
* Fotos
* Documentos
* Atualizações

Exemplo:

```text
OBRA #0001

Reforma Residencial

████████░░ 80%

✓ Preparação
✓ Demolição
✓ Instalações
✓ Revestimentos
● Pintura
○ Finalização
○ Entrega
```

---

## Fase 6 — Pós-venda

Após a conclusão da obra:

* [ ] Solicitar avaliação
* [ ] Registrar nota do cliente
* [ ] Registrar depoimento
* [ ] Solicitar autorização para utilização de fotos
* [ ] Solicitar autorização para publicação do depoimento
* [ ] Criar histórico do cliente
* [ ] Estruturar portfólio de obras reais

---

# 🔄 Fluxo planejado do cliente

```text
VISITANTE
    ↓
SITE
    ↓
SOLICITA ORÇAMENTO
    ↓
LEAD
    ↓
ATENDIMENTO
    ↓
QUALIFICAÇÃO
    ↓
VISITA / LEVANTAMENTO
    ↓
ORÇAMENTO
    ↓
APROVAÇÃO
    ↓
CONTRATO
    ↓
PAGAMENTO
    ↓
OBRA
    ↓
ACOMPANHAMENTO
    ↓
CONCLUSÃO
    ↓
AVALIAÇÃO
    ↓
PÓS-VENDA
```

---

# 🎯 Objetivo do projeto

O objetivo da BS Construtora é evoluir de um site institucional para uma experiência digital completa, permitindo que o cliente acompanhe sua relação com a empresa de forma simples, rápida e transparente.

A plataforma deverá permitir que grande parte da jornada seja realizada pelo celular, desde a solicitação inicial de orçamento até o acompanhamento da obra, pagamentos, conclusão e avaliação dos serviços.

---

# 📌 Status do projeto

**Em desenvolvimento 🚧**

### Atualmente

🟢 Site institucional
🟢 Design responsivo
🟢 Apresentação de serviços
🟢 Seção de projetos
🟢 Formulário de orçamento
🟢 Integração preparada com API

### Em desenvolvimento

🟡 Backend
🟡 Banco de dados
🟡 Sistema de orçamentos
🟡 Área administrativa
🟡 Área do cliente
🟡 Pagamentos
🟡 Gestão de obras
🟡 Pós-venda

---

## 👩‍💻 Desenvolvimento

Projeto desenvolvido por **Stefany Viveiros**.

---

## 📄 Licença

Este projeto é destinado ao uso da BS Construtora.

O código, identidade visual, conteúdos, imagens e demais materiais relacionados ao projeto não devem ser reutilizados comercialmente sem autorização dos responsáveis.
