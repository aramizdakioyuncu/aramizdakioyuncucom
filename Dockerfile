FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dosyalar 'next' içinde olduğu için yolu belirtiyoruz
COPY next/package*.json ./
RUN npm ci --network-timeout 600000

# Tüm 'next' klasörünü konteynerin içine kopyala
COPY next/ .

# Build al
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]