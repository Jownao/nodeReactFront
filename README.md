# Documentação do Projeto de Visualização de Imagens

## Visão Geral

Este projeto é uma aplicação de visualização de imagens que utiliza React para o frontend e Node.js para o backend. O projeto é configurado para ser executado em containers Docker, com Docker Compose orquestrando o frontend e o backend.


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

- **Docker**: Uma plataforma para criar e rodar containers.
- **Docker Compose**: Uma ferramenta para definir e executar multi-containers Docker applications.
- **Node.js e npm**: Para desenvolvimento e gerenciamento de pacotes (não necessário se estiver utilizando Docker).

## Passo a Passo para Configuração e Execução do Projeto

### 1. Instalar Node.js e npm

**Para Windows e Mac:**

1. **Baixar e Instalar o Node.js:**

   - Acesse o [site oficial do Node.js](https://nodejs.org/).
   - Baixe o instalador adequado para seu sistema operacional. O instalador inclui o npm.
   - Siga as instruções de instalação.

2. **Verificar a Instalação:**

   Abra o terminal (Prompt de Comando no Windows ou Terminal no Mac) e execute os seguintes comandos para garantir que o Node.js e o npm estão instalados:

   ```bash
   node --version
   npm --version
   ```

   Ambos os comandos devem retornar a versão instalada.

**Para Linux:**

1. **Instalar Node.js e npm:**

   - Abra o terminal e execute os seguintes comandos para instalar o Node.js e npm:

     ```bash
     sudo apt-get update
     sudo apt-get install -y nodejs npm
     ```

   - Verifique a instalação:

     ```bash
     node --version
     npm --version
     ```

### 2. Instalar Docker e Docker Compose

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

### 3. Clonar o Repositório do Projeto

1. **Abra o terminal e clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd image-visualizer
   ```

### 4. Configurar o Backend

1. **No diretório `backend`, crie um arquivo chamado `Dockerfile` com o seguinte conteúdo:**

   ```dockerfile
   # Usando uma imagem Node.js
   FROM node:18-alpine

   # Diretório de trabalho dentro do container
   WORKDIR /app

   # Copiar o package.json e instalar dependências
   COPY package*.json ./
   RUN npm install

   # Copiar o restante dos arquivos
   COPY . .

   # Expor a porta 5000
   EXPOSE 5000

   # Comando para iniciar o servidor
   CMD ["node", "server.js"]
   ```

### 5. Configurar o Frontend

1. **No diretório principal do projeto, crie um arquivo chamado `Dockerfile.frontend` com o seguinte conteúdo:**

   ```dockerfile
   # Usar uma imagem Node.js
   FROM node:18-alpine

   # Definir o diretório de trabalho
   WORKDIR /app

   # Copiar package.json e instalar dependências
   COPY package*.json ./
   RUN npm install

   # Copiar o restante do código
   COPY . .

   # Build da aplicação
   RUN npm run build

   # Usar uma imagem de servidor Nginx para servir a aplicação
   FROM nginx:alpine
   COPY --from=0 /app/build /usr/share/nginx/html

   # Expor a porta 80
   EXPOSE 80

   # Iniciar o Nginx
   CMD ["nginx", "-g", "daemon off;"]
   ```

### 6. Configurar o Docker Compose

1. **No diretório principal do projeto, crie um arquivo chamado `docker-compose.yml` com o seguinte conteúdo:**

   ```yaml
   version: '3'
   services:
     backend:
       build:
         context: .
         dockerfile: backend/Dockerfile
       ports:
         - '5000:5000'
       volumes:
         - ./backend:/app
       container_name: image-visualizer-backend

     frontend:
       build:
         context: .
         dockerfile: Dockerfile.frontend
       ports:
         - '3000:80'
       container_name: image-visualizer-frontend
   ```

### 7. Build e Rodar os Containers

1. **No terminal, no diretório raiz do projeto, execute o comando para construir e iniciar os containers:**

   ```bash
   docker-compose up --build
   ```

   Este comando irá construir as imagens e iniciar os containers para o frontend e backend.

### 8. Acessar a Aplicação

- **Frontend**: Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação de busca e visualização de imagens.
- **Backend**: O backend estará acessível em `http://localhost:5000`, mas geralmente não será necessário acessar diretamente.

## Considerações Finais

- Certifique-se de que Docker, Docker Compose, Node.js e npm estão instalados e funcionando corretamente no seu sistema.
- Se você fizer alterações no código, execute `docker-compose up --build` novamente para atualizar os containers com as mudanças.
- Caso enfrente algum problema, verifique os logs dos containers para diagnóstico:

  ```bash
  docker-compose logs
  ```
