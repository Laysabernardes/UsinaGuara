# 🏛️ Usina Guará - API Engine

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TSOA](https://img.shields.io/badge/TSOA-API-blue?style=for-the-badge)

API REST robusta e escalável desenvolvida para a gestão digital da **Usina Guará**. Este software é fruto de uma iniciativa voluntária focada em fornecer infraestrutura tecnológica para a preservação histórica e gerenciamento de conteúdo da organização.

---

## 🚀 Tecnologias & Arquitetura

O projeto utiliza uma stack moderna focada em segurança, tipagem estrita e documentação automatizada:

- **Linguagem:** TypeScript para garantir integridade de dados e facilitar a manutenção.
- **Framework Web:** Express.js com **TSOA** para geração automática de rotas e documentação Swagger.
- **Banco de Dados:** MongoDB (via Mongoose) com modelagem flexível.
- **Validação:** Zod para validação rigorosa dos esquemas de dados.
- **Segurança:** Autenticação via JWT (JSON Web Tokens) e criptografia de senhas com Bcrypt.

---

## ⚙️ Configuração do Ambiente

O sistema utiliza variáveis de ambiente para gerenciar as conexões. 
Crie um arquivo `.env` na raiz da pasta `backend` seguindo o modelo abaixo (disponível em `.env.example`):

```bash
# Porta do Servidor
PORT=3000

# Conexão com o Banco de Dados (MongoDB Atlas)
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/usina_guara

# Segurança e Autenticação
JWT_SECRET=sua_chave_secreta_longa_e_segura
MASTER_RESET_CODE=codigo_para_redefinicao_critica

# Ambiente da Aplicação
NODE_ENV=development ou production

## 🛠️ Scripts Disponíveis

| Script | Comando | Descrição |
| :--- | :--- | :--- |
| **Build** | `npm run build` | Gera as rotas TSOA e transpila o TS para JS na pasta `/dist`. |
| **Dev** | `npm run dev` | Inicia o ambiente com hot-reload e geração automática de rotas. |
| **Start** | `npm start` | Inicia o servidor em produção consumindo apenas a pasta `/dist`. |

---

## ☁️ Estratégia de Deploy (Render)

Para otimizar o uso de recursos no plano gratuito (limite de 512MB de RAM), o projeto utiliza um fluxo de **Build Local**:

1. O código é transpilado localmente via `npm run build`.
2. A pasta `/dist` é enviada ao repositório GitHub.
3. No painel do **Render**, configuramos:
   - **Build Command:** `npm install` (Instala apenas dependências necessárias).
   - **Start Command:** `node dist/src/app.js` (Execução direta do código leve).

Isso evita o erro de `Out of Memory` durante a compilação no servidor.

---

## 📂 Estrutura de Diretórios

```text
├── dist/               # Código compilado pronto para produção
├── src/
│   ├── config/         # Configurações de banco de dados e globais
│   ├── controllers/    # Controllers com decoradores TSOA
│   ├── dtos/           # Data Transfer Objects e Schemas Zod
│   ├── middleware/     # Tratamento de erros e segurança (Auth)
│   ├── models/         # Definições de modelos Mongoose
│   ├── services/       # Regras de negócio e lógica de persistência
│   └── app.ts          # Ponto de entrada da aplicação
├── tsoa.json           # Configurações do motor TSOA
└── tsconfig.json       # Configurações do compilador TypeScript

## 📖 Documentação da API

A documentação interativa (Swagger UI) permite testar os endpoints em tempo real:

- **Local:** `http://localhost:3000/api-docs`
- **Produção:** [https://site-v5hr.onrender.com/api-docs/](https://site-v5hr.onrender.com/api-docs/)

> **Nota:** No topo da interface Swagger, você pode alternar entre o servidor local e o servidor de produção através do seletor "Servers".

---

## 👥 Contribuidores

Este projeto foi desenolvido por:

* **Laysa Bernardes** - *Backend (Estrutura, Modelagem & Banco de Dados) & Fullstack Developer* - [GitHub](https://github.com/Laysabernardes)
* **Lucas Lopes** - *Frontend Developer & Fullstack Develope* - [GitHub](https://github.com/LucasLoopsT)