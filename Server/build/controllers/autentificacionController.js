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
exports.autentificacionController = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { getRepository } from 'typeorm';
class AutentificacionController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo_electronico, contrasenia, id_rol } = req.body;
            if (!(correo_electronico && contrasenia)) {
                return res.status(400).json({ message: 'correo y contraseña son requeridos' });
            }
            else {
                const usuario = yield database_1.default.query("SELECT * FROM usuario WHERE correo_electronico=? and contrasenia=?", [correo_electronico, contrasenia]);
                if (usuario.length > 0) {
                    //return res.json(usuario[0]);
                    const Token = jsonwebtoken_1.default.sign({ usuario }, 'SCRET', { expiresIn: '1h' });
                    res.json({ message: 'OK', Token });
                }
                else {
                    res.status(404).json({ text: "correo o contraseña es incorrecto" });
                }
            }
        });
    }
    cambiarContrasenia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.autentificacionController = new AutentificacionController();
