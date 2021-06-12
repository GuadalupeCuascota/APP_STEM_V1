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
exports.eventosController = void 0;
const database_1 = __importDefault(require("../database"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class EventosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT * FROM evento", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("Datos seleccionados");
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const publicacion = yield database_1.default.query("SELECT * FROM publicacion WHERE id_publicacion=?", [id]);
            if (publicacion.length > 0) {
                return res.status(200).json(publicacion[0]);
            }
            res.status(404).json({ text: "publicación no existe" });
        });
    }
    //res.json({ text: "rol encontrado" +req.params.id});
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CREAR");
            try {
                const { id_tipo_evento, id_publicacion, id_usuario, } = req.body;
                console.log("id_tipo_evento" + req.body.id_tipo_evento);
                console.log("id_publicación" + req.body.id_publicacion);
                console.log("id_publicación" + req.body.id_usuario);
                const query = "INSERT INTO evento (id_tipo_evento,id_publicacion,id_usuario) VALUES (?,?,?)";
                yield database_1.default.query(query, [id_tipo_evento, id_publicacion, id_usuario]);
                res.json({ text: "evento guardado" });
            }
            catch (err) {
                res.json({ text: "Hubo un error " });
                console.log("hubo un errro" + err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const publicacion = yield database_1.default.query("SELECT * FROM publicacion WHERE id_publicacion=?", [id]);
            if (publicacion.length > 0) {
                console.log("pasa");
                const archivo = yield database_1.default.query(" DELETE FROM publicacion WHERE id_publicacion=?", [id]);
                if (publicacion[0].ruta_archivo != null) {
                    console.log("si hay ruta");
                    if (!path_1.default.resolve(publicacion[0].ruta_archivo)) {
                        console.log("segundo pasa");
                        yield fs_extra_1.default.unlink(path_1.default.resolve(publicacion[0].ruta_archivo));
                    }
                    else {
                        return res.json({ message: "No existe archivo en el servidor" });
                    }
                }
                return res.status(204).json({ message: "el archivo fue eliminado" });
            }
            return res.status(404).json({ text: "el archivo no existe" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log("id: " + id);
                const { titulo, descripcion, enlace, profesion, estado_profesion, } = req.body;
                const query = "UPDATE publicacion set titulo=?,descripcion=?,enlace=?, profesion=?,estado_profesion=?, ruta_archivo=? WHERE id_publicacion=?";
                if (req.file) {
                    const ruta_archivo = req.file.path;
                    database_1.default.query(query, [
                        titulo,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        id,
                    ]);
                    return res.status(204).json({ text: "publicación actualizado" });
                }
                else {
                    const ruta_archivo = null;
                    database_1.default.query(query, [
                        titulo,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        id,
                    ]);
                    return res.status(204).json({ text: "publicación actualizado" });
                }
            }
            catch (err) {
                console.log("no se puede actualizar" + err);
                return res.status(404).json({ text: "Hubo un error " });
            }
        });
    }
}
exports.eventosController = new EventosController(); //instanciar la clase
