FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Artık 'context' direkt 'next' olduğu için dosyalara direkt erişebiliriz:
COPY package*.json ./
RUN npm ci --network-timeout 600000

# Tüm kodu kopyala
COPY . .

# Build al
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]