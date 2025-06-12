FROM node:22.14.0-bullseye

WORKDIR /myapp
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install -g ngrok
RUN npm install

COPY . .

COPY wait-for-it/wait-for-it.sh /usr/local/bin/wait-for-it.sh

RUN chmod +x /usr/local/bin/wait-for-it.sh


#RUN npm run build


#Cambiar despues en produccion
CMD ["npm", "run", "start:dev"]
