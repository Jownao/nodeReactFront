# Usando uma imagem Node.js
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json da pasta backend para instalar as dependências
COPY ./backend/package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da pasta backend
COPY ./backend/ ./

# Expor a porta 5000
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
