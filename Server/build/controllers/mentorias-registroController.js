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
exports.mentoriasController = void 0;
const database_1 = __importDefault(require("../database"));
class MentoriasController {
    // public async list(req: Request, res: Response) {
    //   const usuarios = await pool.query("SELECT * FROM usuario");
    //   res.json(usuarios);
    // }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin, m.tipo_mentoria,t.nombre_estado_mentoria,u.id_usuario from registro_mentoria m, tipo_estado_mentoria t, usuario u WHERE m.id_usuario=u.id_usuario and m.id_estado_mentoria=t.id_estado_mentoria", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("registro de mentorias registradas seleccionados");
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const registroMentorias = yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin, m.tipo_mentoria,t.nombre_estado_mentoria,u.id_usuario from registro_mentoria m, tipo_estado_mentoria t, usuario u WHERE m.id_usuario=u.id_usuario and m.id_estado_mentoria=t.id_estado_mentoria and m.id_registro_mentoria=?", [id]);
            console.log(registroMentorias);
            if (registroMentorias.length > 0) {
                return res.status(200).json(registroMentorias[0]);
            }
            res.status(404).json({ text: "El registro no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha, hora_inicio, hora_fin, tipo_mentoria, id_estado_mentoria, id_usuario } = req.body;
                const query = "INSERT INTO registro_mentoria( fecha, hora_inicio, hora_fin, tipo_mentoria, id_estado_mentoria, id_usuario) VALUES (?,?,?,(select id_estado_mentoria from tipo_estado_mentoria where nombre_estado_mentoria=?,?))";
                yield database_1.default.query(query, [fecha, hora_inicio, hora_fin, tipo_mentoria, id_estado_mentoria, id_usuario]);
                res.json({ text: "mentoria registrada" });
            }
            catch (err) {
                res.json({ text: "Hubo un error " });
                console.log("hubo un errro" + err);
            }
        });
    }
    // res.json({ text: "eliminando" + req.params.id });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("nombre:"+req.body.nombre)
            // console.log("cedula:"+req.body.cedula)
            try {
                const { id } = req.params;
                console.log("id: " + id);
                const nombre = req.body.nombre;
                const apellido = req.body.apellido;
                const nivel_academico = req.body.nivel_academico;
                const carrera = req.body.carrera;
                const unidad_educativa = req.body.unidad_educativa;
                const correo_electronico = req.body.correo_electronico;
                const contrasenia = req.body.contrasenia;
                const tipo_rol = req.body.tipo_rol;
                console.log("rol:" + req.body.tipo_rol);
                console.log("id_usuario:" + req.body.id_usuario);
                console.log("nombre:" + req.body.nombre);
                console.log("correo:" + req.body.correo_electronico);
                const query = "UPDATE usuario set nombre=?,apellido=?,nivel_academico=?,carrera=?,unidad_educativa=?,correo_electronico=?,contrasenia=?, id_rol=(select id_rol from rol where tipo_rol=?) WHERE id_usuario=?";
                database_1.default.query(query, [nombre, apellido, nivel_academico, carrera, unidad_educativa, correo_electronico, contrasenia, tipo_rol, id]);
                res.status(204).json({ text: "usuario actualizado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede actualizar" + error);
            }
        });
    }
}
exports.mentoriasController = new MentoriasController(); //instanciar la clase
