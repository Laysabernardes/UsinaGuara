<div align="center">
 <img 
    src="../frontend/src/assets/img.png" 
    alt="Header Usina Guará" 
    width="100%" 
    height="200px" 
    style="object-fit: cover; object-position: center;"
  />

  # 🏛️ Usina Guará - Sistema de Gestão de Conteúdo

  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  ![TSOA](https://img.shields.io/badge/TSOA-API-blue?style=flat-square)

</div>

Este repositório contém o backend da **Usina Guará**. Ele é responsável por gerenciar o banco de dados e fornecer as informações necessárias para o funcionamento do site, garantindo que o acervo histórico e os dados da organização estejam sempre organizados.

---

## 🚀 Tecnologias & Arquitetura

O projeto utiliza uma stack moderna focada em segurança, tipagem estrita e documentação automatizada:

* **Linguagem:** `TypeScript` para integridade de dados e manutenção simplificada.
* **Framework Web:** `Express.js` aliado ao **TSOA** para rotas tipadas e Swagger automático.
* **Persistência:** `MongoDB` com Mongoose para modelagem de dados flexível.
* **Validação:** `Zod` para garantia de esquemas e contratos de dados.
* **Segurança:** Autenticação via `JWT` e criptografia `Bcrypt`.

---

## ⚙️ Configuração do Ambiente

O sistema utiliza variáveis de ambiente para gerenciar as conexões. Crie um arquivo `.env` na raiz da pasta `backend` seguindo este modelo:

| Variável | Descrição | Exemplo / Sugestão |
| :--- | :--- | :--- |
| `PORT` | Porta de saída do servidor | `3000` |
| `MONGO_URI` | String de conexão MongoDB Atlas | `mongodb+srv://user:pass@cluster...` |
| `JWT_SECRET` | Chave de criptografia para tokens | `chave_longa_e_aleatoria` |
| `MASTER_RESET_CODE` | Código para redefinições críticas | `admin_master_code` |
| `NODE_ENV` | Ambiente da aplicação | `development` ou `production` |

> [!CAUTION]
> **Segurança:** Nunca comite o seu arquivo `.env`. Certifique-se de que ele esteja listado no seu `.gitignore`.

---

## 🛠️ Scripts de Desenvolvimento

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia em modo **Desenvolvimento** com hot-reload (Nodemon). |
| `npm run build` | Transpila o TS para JS e gera as rotas do **TSOA**. |
| `npm start` | Inicia o servidor em **Produção** a partir da pasta `/dist`. |

---

## ☁️ Notas de Deploy & Infraestrutura (Render)

Como o projeto é estruturado em um monorepo, a configuração correta no painel do **Render** é vital para o funcionamento da API. Siga as diretrizes abaixo:

### 📂 Configuração de Diretório
> [!IMPORTANT]
> O **Root Directory** deve ser definido como `backend`. O servidor falhará ao iniciar se tentar executar a partir da raiz do repositório principal.

### 🔑 Variáveis de Ambiente
Todas as chaves detalhadas na seção [Configuração do Ambiente](#-configuração-do-ambiente) precisam ser cadastradas manualmente na aba **Environment** do Render.

> [!NOTE]
> Se a API retornar erros de conexão ou `401 Unauthorized` em produção, a primeira causa a ser verificada deve ser a integridade destas chaves.

### 🛠️ Estratégia de Build Otimizada
Para operar dentro do limite de **512MB de RAM** do plano gratuito e evitar erros de `Out of Memory`, adotamos o fluxo de **Build Local**:

1. **Transpilação:** Execute `npm run build` localmente para gerar a pasta `/dist`.
2. **Sincronização:** Envie a pasta `/dist` atualizada para o GitHub.
3. **Provisionamento:** No painel do Render, utilize os seguintes comandos:
   - **Build Command:** `npm install`
   - **Start Command:** `node dist/src/app.js`

> [!TIP]
> Esta abordagem garante que o servidor utilize recursos apenas para a execução do código, deixando o processo pesado de compilação para a sua máquina local.

---

## 📂 Estrutura de Pastas

```text
├── dist/                # Artefatos compilados (Produção)
├── src/
│   ├── config/          # Configurações globais e DB
│   ├── controllers/     # Handlers com decoradores TSOA
│   ├── dtos/            # Data Transfer Objects & Schemas Zod
│   ├── middleware/      # Segurança, Auth e Tratamento de Erros
│   ├── models/          # Schemas do Mongoose
│   ├── services/        # Lógica de negócio (Business Logic)
│   └── app.ts           # Entry point do servidor
├── tsoa.json            # Configuração do motor TSOA
└── tsconfig.json        # Configuração do TypeScript
```

## 📖 Documentação Interativa

Acesse a interface do **Swagger** para explorar e testar os endpoints em tempo real:

* **🌐 Ambiente Local:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
* **🚀 Ambiente de Produção:** [API Usina Guará no Render](https://site-v5hr.onrender.com/api-docs/#/)

---

## 🛡️ Padrões de Desenvolvimento & Segurança

Para manter a consistência e segurança da API Engine, seguimos os seguintes protocolos:

* **Validação de Dados:** Utilizamos o `Zod` em conjunto com decorators do `TSOA`. Se um dado enviado não estiver no formato correto, a API retornará automaticamente um erro `400 (Bad Request)`.
* **Autenticação:** Endpoints sensíveis exigem o Header `Authorization: Bearer <JWT_TOKEN>`.

---

## 🛠️ Como Contribuir Localmente

1.  Clone o repositório principal.
2.  Navegue até a pasta do backend: `cd backend`.
3.  Instale as dependências: `npm install`.
4.  Configure seu `.env` com base no `.env.example`.
5.  Gere as rotas e inicie o servidor: `npm run dev`.

## 👥 Time de Desenvolvimento

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/Laysabernardes">
        <img src="https://github.com/Laysabernardes.png" width="100px;" alt="Laysa Bernardes Profile"/><br />
        <sub><b>Laysa Bernardes</b></sub>
      </a><br />
      🚀 Backend & Data Architect
    </td>
    <td align="center">
      <a href="https://github.com/LucasLoopsT">
        <img src="https://github.com/LucasLoopsT.png" width="100px;" alt="Lucas Lopes Profile"/><br />
        <sub><b>Lucas Lopes</b></sub>
      </a><br />
      🎨 Frontend & Fullstack
    </td>
  </tr>
</table>

<p align="center"> Desenvolvido voluntariamente para o projeto <b>Usina Guará</b>. </p>
