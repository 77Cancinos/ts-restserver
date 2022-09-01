"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Nombre DB,  user,  password
const db = new sequelize_1.Sequelize('node', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
});
//Nota: Adicional a eso se puede utilizar las variables de entorno
exports.default = db;
//# sourceMappingURL=conecction.js.map