FROM NODE:22.14.0

WORKDIR /myapp
COPY package.json .
RUN npm install

COPY . .

RUN npm run build

CMD ["node","dist/main"]
