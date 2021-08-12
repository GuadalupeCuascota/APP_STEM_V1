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
exports.archivosController = void 0;
const database_1 = __importDefault(require("../database"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class ArchivosController {
    // public async list(req: Request, res: Response){
    //   await pool.query("SELECT *FROM  publicacion ", (err: any, rows: any) => {
    //     if (err) {
    //       res.status(404).json("error al cargar");
    //       console.log(err)
    //     } else {
    //       res.status(200).json(rows);
    //       console.log("Datos de publicaciones seleccionados");
    //     }
    //   });
    // }
    listP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.estado_profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("Datos de publicaciones seleccionados");
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
    getPublicacionC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const publicacion = yield database_1.default.query("SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera and u.id_carrera=?", [id]);
            if (publicacion.length > 0) {
                return res.status(200).json(publicacion);
            }
            res.status(404).json({ text: "publicación no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CREAR");
            try {
                const { titulo, nombre_perfil, descripcion, enlace, profesion, estado_profesion, id_tipo_publicacion, id_usuario, id_estado_publicacion, id_carrera } = req.body;
                console.log("el archivo", req.file);
                console.log("titulo:" + req.body.titulo);
                console.log("descripcion", req.body.descripcion);
                console.log("enlace", req.body.enlace);
                console.log("profeion", req.body.profesion);
                console.log("estado profesion", req.body.estado_profesion);
                console.log("id_tipo_publicacion:" + req.body.id_tipo_publicacion);
                console.log("usuario:" + req.body.id_usuario);
                console.log("id_estado_publicación:" + req.body.id_estado_publicacion);
                console.log("id_carrera", req.body.id_carrera);
                console.log("nombre_perfil", req.body.nombre_perfil);
                const query = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,ruta_archivo,tipo_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                if (req.file) {
                    console.log("pasa1");
                    const ruta_archivo = req.file.path;
                    const tipo_archivo = req.file.mimetype;
                    console.log(req.file.path);
                    console.log(req.file.mimetype);
                    yield database_1.default.query(query, [
                        titulo,
                        nombre_perfil,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        ruta_archivo,
                        tipo_archivo,
                        id_tipo_publicacion,
                        id_usuario,
                        id_estado_publicacion,
                        id_carrera
                    ]);
                    res.status(201).json({ text: "Archivo guardado" });
                }
                else {
                    const query1 = "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";
                    console.log("no tiene archivo");
                    yield database_1.default.query(query1, [
                        titulo,
                        nombre_perfil,
                        descripcion,
                        enlace,
                        profesion,
                        estado_profesion,
                        id_tipo_publicacion,
                        id_usuario,
                        id_estado_publicacion,
                        id_carrera
                    ]);
                    res.status(201).json({ text: "Archivo guardado" });
                }
            }
            catch (err) {
                console.log("hubo un error" + err);
                res.status(404).json({ text: "error no se puede guardar" });
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
exports.archivosController = new ArchivosController(); //instanciar la clase
