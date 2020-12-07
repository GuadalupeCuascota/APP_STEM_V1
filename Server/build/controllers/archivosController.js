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
class ArchivosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield database_1.default.query("SELECT * FROM archivo");
            res.json(roles);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const roles = yield database_1.default.query("SELECT * FROM archivo WHERE id_archivo=?", [id]);
            console.log(roles);
            if (roles.length > 0) {
                return res.json(roles[0]);
            }
            res.status(404).json({ text: "el archivo no existe" });
        });
    }
    //res.json({ text: "rol encontrado" +req.params.id});
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO archivo set ?", [req.body]);
            res.json({ text: "archivo guardado " });
        });
    }
    //console.log(req.body);
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(" DELETE FROM archivo WHERE id_archivo=?", [id]);
            res.json({ message: "el archivo fue eliminado" });
        });
    }
    // res.json({ text: "eliminando" + req.params.id });
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const roles = yield database_1.default.query(" UPDATE archivo set ? WHERE id_archivo=?", [req.body, id]);
            res.json({ message: "actualizado" });
        });
    }
}
exports.archivosController = new ArchivosController(); //instanciar la clase
