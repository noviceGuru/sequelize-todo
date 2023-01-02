FROM node:gallium-slim
WORKDIR /app
COPY package.json .
RUN npm install
COPY ./build ./ 

EXPOSE 8080

CMD ["npm", "start"]