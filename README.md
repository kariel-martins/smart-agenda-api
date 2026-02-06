# Api Smart Agenda

A Smart Agenda é uma API REST para gerenciamento inteligente de agendamentos, criada para resolver problemas comuns de filas, esquecimentos e falta de organização em estabelecimentos de serviços.

### Motivação e Decisão do Projeto

Na cidade onde moro, ao utilizar serviços como cabeleireiros, clínicas odontológicas e até mesmo o posto de saúde (SUS), percebi a ausência — ou ineficiência — de sistemas de agendamento. O resultado era sempre o mesmo: longas filas, atrasos e atendimentos esquecidos.

Cansado dessa realidade, decidi desenvolver uma API de agendamentos que cobrisse essas falhas, trazendo organização, previsibilidade e melhor experiência tanto para clientes quanto para estabelecimentos.

### O que a API faz?

- Autenticação de usuários (admin)
- Proteção de rotas via JWT
- Cadastro e gerenciamento de profissionais
- Cadastro e gerenciamento de clientes
- Cadastro e gerenciamento de serviços
- Cadastro e gerenciamento de agendamentos
- Controle de disponibilidade para clientes
- Sistema de notificações
- Medição da taxa de não comparecimento (No-Show)
- Marcação automática de não comparecimento
- Envio de métricas (futuramente)
- Envio de e-mails e WhatsApp (futuramente)

## Sistema

- Integração com fila de mensagens (RabbitMQ)(futuramente)
- Envio de e-mails (Resend/ nodemailer) (futuramente)
- Envio de e-mails (Resend/ nodemailer) (futuramente)
- Cache(redis) (futuramente)
- API REST modularizada
- Separação clara entre camadas (Controller, Service, Repository)
- teste E2E e Unitarios (testes)
- Swagger (docs)

## Tecnologias

- Node.js
- TypeScript
- Express
- Drizzle ORM
- PostgreSQL
- Docker
- RabbitMQ
- JWT
- Zod (validação)

## Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:

- Node.js v18+
- Docker e Docker Compose
- PostgreSQL
- Git

## Instalação e Execução

### 1️⃣ Clonar o repositório
- Terminal:
  
  ```bash
  
    git clone https://github.com/kariel-martins/smart-agenda-api
  
  ```
### 2️⃣ Configurar o Backend
- Terminal:
  
  ```bash
  
    npm install
  
  ```
- Crie o arquivo .env:
  
  ```env
  
    NODE_ENV=
    
    PORT=
    
    DEBUG=
    
    FRONTEND_URL=
    
    BACKEND_URL=
    
    SECRET_KEY=
    
    DATABASE_URL=
  
  ```
- Subir os containers:
  ```bash
  
    docker-compose up -d
  
  ```
- Rodar a api:
  ```bash
  
    npm run start:dev
  
  ```
## 🌐 Acesso Local
_ Serviço URL
  Backend API http://localhost:3401
## 🗂️ Estrutura do Projeto
### 📦 Backend
    /src
    ├── config
    ├── core
    │   ├── errors
    │   └── handlers
    ├── database
    |    ├── jobs
    |    ├── seeds
    |    ├── client.ts
    │   └── Schemas.ts
    ├── docs
    |    ├── Appointment
    |    ├── Auth
    |    ├── Availiability
    |    ├── business
    |    ├── Clients
    |    ├── NoShowRules
    |    ├── Professional
    |    ├── Service
    |    ├── Users
    ├── modules
    |   ├── Appointment
    │   ├── auth
    │   │   ├── controllers
    │   │   ├── factory
    │   │   ├── dtos
    │   │   ├── messages
    │   │   ├── repositories
    │   │   ├── routes
    │   │   └── services
    |   ├── Availiability
    |   ├── business
    |   ├── Clients
    |   ├── NoShowRules
    |   ├── Professional
    |   ├── Service
    |   ├── Users
    ├── share
    |   └── middlewares
    ├── services
    ├── tests
    ├── types
    ├── app.ts
    ├── routes.ts
    └── server.ts

### 🧱 Arquitetura
### O projeto segue princípios de:
  - Separação de responsabilidades
  - Arquitetura em camadas
  - Modularização por domínio
  - Baixo acoplamento
  - Alta coesão
  - Padrão Repository + Service
## 📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e contribuir.

## 👨‍💻 Autor
  Desenvolvido por Kariel Emanoel Silva Martins

💼 LinkedIn: https://www.linkedin.com/in/kariel-martins

📧 Email: karielemanoel.17@gmail.com


  
