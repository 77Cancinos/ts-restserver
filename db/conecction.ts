import { Sequelize } from "sequelize";
                    //Nombre DB,  user,  password
const db = new Sequelize('node', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
});

//Nota: Adicional a eso se puede utilizar las variables de entorno

export default db;