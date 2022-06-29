FROM node:16-alpine

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN ls /app
RUN npm install -g husky 
RUN npm install -g pnpm 
RUN pnpm config set registry https://registry.npm.taobao.org 
# 加入--ignore-scripts避免postinstall的错误
RUN pnpm fetch --ignore-scripts 
# --prod 

# Copy source
COPY . .

RUN pnpm install -r --offline 
# --prod

VOLUME ["/app/node_modules/", "/app/examples/mw-full/node_modules/", "/app/packages/mwcloud-moleculer/node_modules/"]

# 启动mw-full项目的开发环境
CMD cd examples/mw-full && pnpm run dev
EXPOSE 7001