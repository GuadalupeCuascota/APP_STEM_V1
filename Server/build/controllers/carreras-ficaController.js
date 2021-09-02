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
exports.carrerasficaController = void 0;
const database_1 = __importDefault(require("../database"));
class CarrerasFicaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const roles = await pool.query("SELECT * FROM rol");
            // res.json(roles);
            yield database_1.default.query("SELECT * FROM carreras_fica", (err, rows) => {
                if (err) {
                    res.status(404).json("error al cargar");
                    console.log(err);
                }
                else {
                    res.status(200).json(rows);
                    console.log("Datos seleccionados probando1");
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // pool.query("INSERT INTO rol set ?", [req.body]);
            const { id } = req.params;
            const carreras = yield database_1.default.query("SELECT * FROM carreras_fica WHERE id_carrera=?", [id]);
            console.log(carreras);
            if (carreras.length > 0) {
                return res.json(carreras[0]);
            }
            res.json({ text: "la carrera no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nombre_carrera = req.body.nombre_carrera;
                const query = "INSERT INTO carreras_fica(nombre_carrera)VALUES (?)";
                yield database_1.default.query(query, [nombre_carrera]);
                res.json({ text: "carrera guardado" });
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
                yield database_1.default.query(" DELETE FROM carreras_fica WHERE id_carrera=?", [id]);
                res.status(201).json({ text: "carrera guardado" });
            }
            catch (err) {
                res.status(404).json({ text: err });
                console.log("No se puede eliminar" + err);
            }
        });
    }
    // res.json({ text: "eliminando" + req.params.id });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("pasa actualizar");
            const { id } = req.params;
            const { id_carrera, nombre_carrera } = req.body;
            if (id_carrera) {
                try {
                    const roles = yield database_1.default.query(" UPDATE  carreras_fica set nombre_carrera=? WHERE id_carrera=?", [nombre_carrera, id]);
                    res.json({ message: "actualizado" });
                }
                catch (error) {
                    res.json({ text: "Hubo un error ", error });
                    console.log("No se puede actualizar" + error);
                }
            }
            else {
                res.json({ message: "Atributos requeridos" });
            }
        });
    }
}
exports.carrerasficaController = new CarrerasFicaController();
