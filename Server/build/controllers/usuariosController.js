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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query("SELECT * FROM usuario");
            res.json(usuarios);
        });
    }
    list1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query("SELECT u.cedula, u.nombre, u.apellido,u.nivel_academico,u.carrera,u.unidad_educativa,u.contrasenia, r.tipo_rol from usuario u, rol r WHERE r.id_rol=u.id_rol");
            res.json(usuarios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const roles = yield database_1.default.query("SELECT * FROM usuario WHERE cedula=?", [id]);
            console.log(roles);
            if (roles.length > 0) {
                return res.json(roles[0]);
            }
            res.status(404).json({ text: "el rol no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO usuario set ?", [req.body]);
            res.json({ text: "usuario guardado" });
            console.log([req.body]);
        });
    }
    create1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cedula = req.body.cedula;
            const nombre = req.body.nombre;
            const apellido = req.body.apellido;
            const nivel_academico = req.body.nivel_academico;
            const carrera = req.body.carrera;
            const unidad_educativa = req.body.unidad_educativa;
            const contrasenia = req.body.contrasenia;
            const id_rol = req.body.id_rol;
            const query = "INSERT INTO usuario (cedula, nombre,apellido,nivel_academico,carrera,unidad_educativa,contrasenia, id_rol) VALUES (?,?,?,?,?,?,?,(select id_rol from rol where tipo_rol=?))";
            database_1.default.query(query, [cedula, nombre, apellido, nivel_academico, carrera, unidad_educativa, contrasenia, id_rol]);
            res.json({ text: "usuario guardado" });
            //console.log([req.body]);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(" DELETE FROM usuario WHERE cedula=?", [id]);
            res.json({ message: "el dato fue eliminado" });
        });
    }
    // res.json({ text: "eliminando" + req.params.id });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const roles = yield database_1.default.query(" UPDATE usuario set ? WHERE cedula=?", [req.body, id]);
            res.json({ message: "usuario actualizado" });
        });
    }
}
exports.usuariosController = new UsuariosController(); //instanciar la clase
