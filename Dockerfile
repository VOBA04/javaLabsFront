FROM node:20-alpine

WORKDIR /src

COPY . .

RUN npm install \
    npm install -g http-server \
    npm install vite@5.2.10 @vitejs/plugin-vue@5.0.4 esbuild@0.20.2 \
    npm run build

EXPOSE 5173

CMD ["http-server", "dist", "-p", "5173"]