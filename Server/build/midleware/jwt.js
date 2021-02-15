"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkjwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkjwt = (req, res, next) => {
    console.log("req", req.headers);
    const token = req.headers['login']; //esperamos un parametro login en el que se envia el token de la validadcion de usuario y contraseña
    console.log("validar", token);
    let jwtPayload;
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, 'TODO_SCRET');
        console.log("este es el ", jwtPayload);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        console.log("erro", error);
        res.status(401).json({ message: 'Not autorizado' });
    }
    const { correo_electronico, contrasenia } = jwtPayload;
    console.log("payloadd", jwtPayload);
    const newToken = jsonwebtoken_1.default.sign({ correo_electronico, contrasenia }, 'TODO_SCRET', { expiresIn: '1h' });
    res.setHeader('token', newToken);
    console.log("nuevo toke", newToken);
    next();
};
exports.checkjwt = checkjwt;
