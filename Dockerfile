# 1. Aşama: Temel İmaj
FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 2. Aşama: Bağımlılıkları Yükle (Cache dostu)
# Sadece package.json kopyalıyoruz ki kod değişse bile npm install tekrar etmesin
COPY package*.json ./
RUN npm ci --network-timeout 600000

# 3. Aşama: Kodları Kopyala ve Build Al
COPY . .
RUN npm run build

# 4. Aşama: Çalıştırma Ayarları
EXPOSE 3000
ENV PORT 3000
# Next.js'in docker içinde düzgün çalışması için hostname'i sabitleyelim
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "start"]