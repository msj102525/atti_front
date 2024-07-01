FROM node:20-alpine

# 작업 디렉토리를 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json을 복사하여 의존성을 설치합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm install

# 애플리케이션을 빌드합니다.
RUN npm run build

# 컨테이너가 바인딩할 포트를 지정합니다.
EXPOSE 3000

# 애플리케이션을 시작합니다.
CMD ["npm", "start"]
