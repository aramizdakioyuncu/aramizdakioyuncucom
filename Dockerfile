FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG PROJECT_PATH
# Bağımlılıkları kopyala
COPY ${PROJECT_PATH}/package*.json ./
RUN npm ci --network-timeout 600000

# Tüm kodu kopyala
COPY ${PROJECT_PATH} .

# Build al (Artık [username] hatası vermeyecek çünkü statik export yapmıyoruz)
RUN npm run build

# Next.js varsayılan olarak 3000 portunda çalışır
EXPOSE 3000
CMD ["npm", "run", "start"]