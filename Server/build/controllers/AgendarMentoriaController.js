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
exports.agendarMentoriaController = void 0;
const database_1 = __importDefault(require("../database"));
class AngerdarMentoriaController {
    // public async list(req: Request, res: Response) {
    //   const usuarios = await pool.query("SELECT * FROM usuario");
    //   res.json(usuarios);
    // }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("select r.fecha,r.hora_inicio,r.hora_fin,a.id_usuario,u.nombre,u.apellido,a.estado from registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=r.id_usuario", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log(rows);
                }
            });
        });
    }
    listsolicitudes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("select r.fecha,r.hora_inicio,r.hora_fin,r.id_usuario,u.nombre,u.apellido,a.estado from registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log(rows);
                }
            });
        });
    }
    getMentoriasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa usuario");
            const { id } = req.params;
            const registroMentoriasporUsuario = yield database_1.default.query("SELECT fecha, hora_inicio, hora_fin,tipo_mentoria from registro_mentoria WHERE id_usuario=?", [id]);
            console.log(registroMentoriasporUsuario);
            if (registroMentoriasporUsuario.length > 0) {
                return res.status(200).json(registroMentoriasporUsuario);
            }
            res.status(404).json({ text: "En este momento no existe mentorias disponibles" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PASA AQUIII");
            const { id } = req.params;
            const registroMentorias = yield database_1.default.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin, m.tipo_mentoria,m.id_estado_mentoria,u.nombre,u.apellido from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.id_registro_mentoria=?", [id]);
            console.log(registroMentorias);
            if (registroMentorias.length > 0) {
                return res.status(200).json(registroMentorias[0]);
            }
            res.status(404).json({ text: "El registro no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa crear");
            try {
                const { id_registro_mentoria, observacion, estado, id_usuario } = req.body;
                console.log("registro:" + req.body.id_registro_mentoria);
                console.log("usuario:" + req.body.id_usuario);
                const query = "INSERT INTO agendamiento_mentorias(id_registro_mentoria,observacion,estado,id_usuario) VALUES (?,?,?,?)";
                yield database_1.default.query(query, [id_registro_mentoria, observacion, estado, id_usuario]);
                res.status(201).json({ text: "mentoria agendada" });
            }
            catch (err) {
                res.json({ text: "Hubo un error " });
                console.log("hubo un errro" + err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("id_registro:" + id);
                yield database_1.default.query(" DELETE FROM registro_mentoria  WHERE id_registro_mentoria=?", [id]);
                res.status(201).json({ text: "el dato fue eliminado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error " });
                console.log("no se puede eliminar" + error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa actualizar");
            console.log("fecha:" + req.body.fecha);
            try {
                const { id } = req.params;
                console.log("id_mentoria: " + id);
                const fecha = req.body.fecha;
                const hora_inicio = req.body.hora_inicio;
                const hora_fin = req.body.hora_fin;
                const tipo_mentoria = req.body.tipo_mentoria;
                const id_estado_mentoria = req.body.id_estado_mentoria;
                const id_usuario = req.body.id_usuario;
                console.log("hora_inicio: " + req.body.hora_inicio);
                console.log("hora_inicio: " + req.body.hora_fin);
                console.log("hora_estado: " + req.body.id_estado_mentoria);
                console.log("hora_usuario: " + req.body.id_usuario);
                const query = "UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?,tipo_mentoria=?,id_estado_mentoria=?, id_usuario=? where id_registro_mentoria=?";
                database_1.default.query(query, [fecha, hora_inicio, hora_fin, tipo_mentoria, id_estado_mentoria, id_usuario, id]);
                res.status(200).json({ text: "registro actualizado" });
            }
            catch (error) {
                res.status(404).json({ text: "Hubo un error" });
            }
        });
    }
}
exports.agendarMentoriaController = new AngerdarMentoriaController(); //instanciar la clase
