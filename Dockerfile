# 1. AŞAMA: İMAJIN TEMELİ
FROM node:20-alpine
# Next.js'in Alpine üzerinde çalışması için bu şart
RUN apk add --no-cache libc6-compat 
WORKDIR /app

# 2. AŞAMA: PAKETLERİ İÇERİ AL (Hız için önce bunlar)
COPY package*.json ./
# Woodpecker'daki build'den gelen node_modules'u kullanmak yerine temiz kurulum yapalım
RUN npm ci --network-timeout 600000 
# Lock dosyası Mac'te üretildiği için yerel ikili paketlerin Linux sürümleri eksik kalıyor (npm hatası);
# aynı sürümü bu makinenin işlemcisine göre yeniden kur (x64 / arm64 fark etmez)
RUN npm install --no-save --no-audit --no-fund \
    lightningcss@$(node -p "require('./node_modules/lightningcss/package.json').version") \
    @tailwindcss/oxide@$(node -p "require('./node_modules/@tailwindcss/oxide/package.json').version")

# 3. AŞAMA: KODLARI VE BUILD ÇIKTILARINI AL
COPY . .
# Eğer Woodpecker içinde build aldıysak bunu atlayabiliriz ama 
# en garantisi imajın içinde bir kez daha build almaktır:
RUN npm run build

# 4. AŞAMA: ÇALIŞTIRMA
EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "start"]