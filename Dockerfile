FROM node:20-alpine
WORKDIR /app

# Sadece gerekli dosyaları alıyoruz
COPY next/package*.json ./
COPY next/.next ./.next
COPY next/public ./public
COPY next/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "start"]