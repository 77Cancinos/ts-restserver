import dotenv from 'dotenv';
import Server from './models/server';

//Configurar dotevn
dotenv.config();

const server = new Server(); 

server.listen();

//Para compilar TS y que verifique cualquier cambio: tsc --watch
//Para compilar node: nodemon app.js
