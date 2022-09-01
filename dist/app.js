"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
//Configurar dotevn
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
//Para compilar node: nodemon app.js
//Para compilar TS y que verifique cualquier cambio: tsc --watch
//# sourceMappingURL=app.js.map