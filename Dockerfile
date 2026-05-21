# 1. AŞAMA: İMAJIN TEMELİ
FROM node:20-alpine
# Next.js'in Alpine üzerinde çalışması için bu şart
RUN apk add --no-cache libc6-compat 
WORKDIR /app

# 2. AŞAMA: PAKETLERİ İÇERİ AL (Hız için önce bunlar)
COPY package*.json ./
# Woodpecker'daki build'den gelen node_modules'u kullanmak yerine temiz kurulum yapalım
RUN npm ci --network-timeout 600000 

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