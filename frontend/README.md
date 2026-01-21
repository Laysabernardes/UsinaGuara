<div align="center">
 <img 
    src="./src/assets/img.png" 
    alt="Header Usina Guará" 
    width="100%" 
    height="200px" 
    style="object-fit: cover; object-position: center;"
  />

  # 🎨 Usina Guará - Interface Web

  [![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)](https://pages.github.com/)

</div>

Este diretório contém o **Frontend** da aplicação. Trata-se de uma **Single Page Application (SPA)** moderna, desenvolvida para oferecer uma experiência fluida e responsiva aos administradores e visitantes do acervo da Usina Guará.

---

## ⚡ Tecnologias & Arquitetura

A interface foi construída priorizando performance, design responsivo e modularização:

* **Core:** `React` com `TypeScript` rodando sobre **Vite** (build ultra-rápido).
* **Estilização:** **`Tailwind CSS`**. Utilizamos a abordagem *utility-first* para criar layouts customizáveis, responsivos e consistentes sem sair do HTML/JSX.
* **Arquitetura:** **Feature-Based**. O código não é separado por tipo técnico, mas por domínio de negócio (ex: tudo sobre `Carrossel` fica na pasta `features/carousel`).
* **Validação:** `Zod` integrado aos formulários para garantir integridade antes do envio ao backend.

---

## 🚀 Executando o Frontend Localmente

Siga os passos abaixo para rodar a interface web em ambiente de desenvolvimento.

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **Backend em execução** (local ou produção)

> [!IMPORTANT]
> O frontend depende diretamente da API.  
> Certifique-se de que o backend esteja rodando antes de iniciar a aplicação.

---

### ▶️ Passo a Passo

1️⃣ **Acesse a pasta do frontend**
```bash
cd frontend
```
2️⃣ **Instale as dependências**

```bash
npm install
```
3️⃣ **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```
A aplicação estará disponível em:

- **Frontend:** http://localhost:5173  
  *(ou outra porta definida automaticamente pelo Vite)*

> [!TIP]
> Durante o desenvolvimento, o Vite oferece **Hot Module Replacement (HMR)**,  
> aplicando alterações em tempo real sem recarregar a página.


## 🛠️ Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local (geralmente na porta 5173). |
| `npm run build` | Gera os arquivos estáticos otimizados na pasta `/dist`. |
| `npm run preview` | Visualiza localmente a versão final de produção. |

---

## ☁️ CI/CD & Deploy (GitHub Actions)

A publicação deste frontend é **100% automatizada**. Não realizamos uploads manuais.

### Como funciona o Pipeline:
1. **Push na Main:** O GitHub Actions detecta alterações.
2. **Build Automático:** Um container Linux instala dependências e roda o `npm run build`.
3. **Deploy:** A pasta `/dist` gerada é enviada automaticamente para o **GitHub Pages**.

> [!IMPORTANT]
> O workflow de deploy encontra-se na raiz do repositório em `.github/workflows/deploy.yml`. Evite alterar a estrutura de pastas (`frontend/`) para não quebrar este script.

---

## 📂 Estrutura de Pastas (Feature-Based)

```text
frontend/src/
├── assets/          # Imagens e ícones estáticos
├── components/      # Componentes Globais (Header, Footer, Inputs)
├── features/        # Núcleo do Sistema (Lógica de Negócio)
│   ├── auth/        # Login e Recuperação de senha
│   ├── carousel/    # Gestão do Carrossel da Home
│   ├── people/      # Gestão de Membros
│   └── projects/    # Gestão de Projetos e Artigos
├── pages/           # Montagem das Telas (Roteamento)
├── lib/             # Configurações do Axios (API)
└── styles/          # Configurações globais do Tailwind

```

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
