FROM node:18

WORKDIR /LiveSubtitleServer
COPY package.json ./
RUN npm install
COPY . .
ENV PORT=5000
EXPOSE 5000

CMD npm start

