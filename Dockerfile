FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 'next/' ekini sildik, çünkü dosyalar zaten burada:
COPY package*.json ./
RUN npm ci --network-timeout 600000

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]