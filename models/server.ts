//Instalar el tipado: npm i --save-dev @types/express
import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';

import db from '../db/conecction';


class Server{


    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        //Métodos iniciales
        this.middlewares();
        
        //Definir las rutas
        this.routes();
    }

    //TODO: Conectar a la base de datos
    async dbConnection(){
      
       try {
        
        await db.authenticate();
        console.log('La base de datos esta online');

       } catch (error) {
            console.log(error);
       }


    }    

    //Son funciones que se ejecutan antes de las rutas
    middlewares(){
        // CORS
        this.app.use(cors());
        // Lectura del Body
        this.app.use(express.json());
        // Carpeta publica
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:' + this.port);
        } )
    }

}

//Exportación para una sola clase
export default Server;