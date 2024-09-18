# Documentação do Projeto de Visualização de Imagens

## Visão Geral

Este projeto é uma aplicação de visualização de imagens que utiliza React para o frontend e Node.js para o backend. O projeto é configurado para ser executado em containers Docker, com Docker Compose orquestrando o frontend e o backend.

## Sumário

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Requisitos](#requisitos)
4. [Passo a Passo para Configuração e Execução do Projeto](#passo-a-passo-para-configuração-e-execução-do-projeto)
   - [1. Instalar Docker e Docker Compose](#1-instalar-docker-e-docker-compose)
   - [2. Instalar Git](#2-instalar-git)
   - [3. Clonar o Repositório do Projeto](#3-clonar-o-repositório-do-projeto)
   - [4. Executar o Projeto com Docker](#4-executar-o-projeto-com-docker)
5. [Considerações Finais](#considerações-finais)


## Estrutura do projeto
```
image-visualizer/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── ... (outros arquivos do backend)
│
├── Dockerfile.frontend
├── docker-compose.yml
├── package.json
└── ... (outros arquivos do frontend)
```

## Requisitos

Para rodar este projeto, você precisará instalar:

- **Docker**
- **Docker Compose**
- **Git**

## Passo a Passo para Configuração e Execução do Projeto

### 1. Instalar Docker e Docker Compose

**Para Windows e Mac:**

1. **Baixar e Instalar o Docker Desktop:**

   - Acesse o [site do Docker](https://www.docker.com/products/docker-desktop) e baixe o Docker Desktop para o seu sistema operacional.
   - Siga as instruções para instalar o Docker Desktop. A instalação do Docker Desktop inclui o Docker Compose.

2. **Verificar a Instalação:**

   Abra o terminal e execute os seguintes comandos para garantir que o Docker e o Docker Compose estão instalados:

   ```bash
   docker --version
   docker-compose --version
   ```

   Ambos os comandos devem retornar a versão instalada.

**Para Linux:**

1. **Instalar Docker:**

   - Abra o terminal e execute os seguintes comandos para instalar o Docker:

     ```bash
     sudo apt-get update
     sudo apt-get install -y docker.io
     ```

   - Adicione seu usuário ao grupo Docker para evitar a necessidade de `sudo` para comandos Docker:

     ```bash
     sudo usermod -aG docker $USER
     ```

   - Reinicie o terminal para aplicar as mudanças.

2. **Instalar Docker Compose:**

   - Execute o comando abaixo para baixar o Docker Compose:

     ```bash
     sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
     ```

   - Dê permissão de execução ao Docker Compose:

     ```bash
     sudo chmod +x /usr/local/bin/docker-compose
     ```

   - Verifique a instalação:

     ```bash
     docker-compose --version
     ```

### 2. Instalar Git

Antes de rodar o projeto, você precisará do Git para clonar o repositório.

**Para Windows:**

1. Acesse o [site oficial do Git](https://git-scm.com/) e baixe o instalador para Windows.
2. Siga as instruções de instalação. Durante a instalação, certifique-se de selecionar a opção para adicionar o Git ao caminho do sistema (`PATH`).

**Para macOS:**

1. Abra o terminal e execute o seguinte comando para instalar o Git usando o Homebrew:

   ```bash
   brew install git
   ```

2. Caso não tenha o Homebrew instalado, siga as instruções de instalação [aqui](https://brew.sh/).

**Para Linux:**

1. Abra o terminal e execute o seguinte comando para instalar o Git:

   ```bash
   sudo apt-get update
   sudo apt-get install git
   ```

**Verificar a Instalação:**

Após a instalação, execute o seguinte comando no terminal para garantir que o Git está corretamente instalado:

```bash
git --version
```

O comando deve retornar a versão instalada do Git.


### 3. Clonar o Repositório do Projeto

1. **Abra o terminal e clone o repositório:**

   ```bash
   git clone <https://github.com/Jownao/nodeReactFront>
   cd image-visualizer
   ```

### 4. Executar o Projeto com Docker

Os arquivos Docker necessários (incluindo `Dockerfile` e `docker-compose.yml`) já estão presentes no repositório. Para rodar o projeto com Docker:

1. **No terminal, execute o seguinte comando para construir e iniciar os containers:**

   ```bash
   docker-compose up --build
   ```

   Esse comando vai:

   - Construir o container do backend (Node.js) e expor na porta 5000.
   - Construir o container do frontend (React) e expor na porta 3000.

2. **Acessar a Aplicação:**

   - Acesse o frontend no navegador através de `http://localhost:3000`.
   - O backend estará rodando em `http://localhost:5000`, mas não há necessidade de acessá-lo diretamente.

- **Frontend**: Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação de busca e visualização de imagens.
- **Backend**: O backend estará acessível em `http://localhost:5000`, mas geralmente não será necessário acessar diretamente.

## Considerações Finais

- Certifique-se de que Docker, Docker Compose, Node.js e npm estão instalados e funcionando corretamente no seu sistema.
- Se você fizer alterações no código, execute `docker-compose up --build` novamente para atualizar os containers com as mudanças.
- Caso enfrente algum problema, verifique os logs dos containers para diagnóstico:

  ```bash
  docker-compose logs
  ```
