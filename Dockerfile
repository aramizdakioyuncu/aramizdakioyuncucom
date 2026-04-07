FROM node:20-alpine
WORKDIR /app

# Klasör yolu vermeden direkt kopyala
COPY package*.json ./
COPY .next ./.next
COPY public ./public
COPY node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "start"]