FROM node:latest
WORKDIR /app 
COPY package.json . 
RUN npm i 
COPY . . 
EXPOSE 5174 
CMD ["npm", "run", "dev"] 