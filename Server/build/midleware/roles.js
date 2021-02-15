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
exports.checkRol = void 0;
const database_1 = __importDefault(require("../database"));
const checkRol = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const correo_electronico = res.locals.jwtPayload.correo_electronico;
        const contrasenia = res.locals.jwtPayload.contrasenia;
        console.log("correo", correo_electronico);
        console.log("contrasenia ", contrasenia);
        try {
            const id_rol = yield database_1.default.query("SELECT r.tipo_rol from usuario u, rol r where u.correo_electronico=? and u.contrasenia=? and u.id_rol=r.id_rol", [correo_electronico, contrasenia]);
            console.log(id_rol);
            const role = id_rol;
            if (roles.includes(role)) {
                next();
            }
            else {
                return res.status(401).json({ message: 'No autorizado1' });
            }
        }
        catch (error) {
            return res.status(401).json({ message: 'No autorizado00' });
        }
    });
};
exports.checkRol = checkRol;
