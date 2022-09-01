"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        msg: "getUsuarios",
        usuarios,
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield usuario_1.default.findByPk(id);
    //Validamos si no existe el registro con dicho ID
    if (user) {
        res.json({
            msg: "getUsuario",
            id,
            user,
        });
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id} en la base de datos`,
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //Verificamos antes de insertar si ya existe un usuario con dicho email
        const emailExiste = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        //Si ya existe un usuario con el mismo correo manda el mensaje msg
        if (emailExiste) {
            return res.status(400).json({
                msg: "Ya existe un usuario con el Email: " + body.email,
            });
        }
        //Lo que mandamos en el body lo asignamos a la DB
        const user = yield usuario_1.default.create(body);
        res.json({
            msg: "postUsuario",
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el admin",
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        //Verificamos si el usuario existe
        const user = yield usuario_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: "No existe un usuario con el id " + id,
            });
        }
        //Verificamos antes de insertar si ya existe un usuario con dicho email
        const emailExiste = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        //Si ya existe un usuario con el mismo correo manda el mensaje msg
        if (emailExiste) {
            return res.status(400).json({
                msg: "Ya existe un usuario con el Email: " + body.email,
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el admin",
        });
    }
    res.json({
        msg: "putUsuario",
        id,
        body,
    });
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Verificamos si el usuario existe
    const user = yield usuario_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "No existe un usuario con el id " + id,
        });
    }
    // 1. Eliminación fisica (Borrar el registro directamente de la DB)
    //await user.destroy();
    // 2. Eliminación lógica (Cambiar el estado del usuario, deshabilitado)
    yield user.update({ estado: false });
    res.json({
        msg: "El usuario con el id " + id + " fue eliminado con exito"
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map