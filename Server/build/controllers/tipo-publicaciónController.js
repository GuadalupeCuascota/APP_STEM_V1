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
exports.tipoPublicaciónController = void 0;
const database_1 = __importDefault(require("../database"));
class TipoPublicacionController {
    //   public async list(req: Request, res: Response) {
    //     const tipoPublicacion = await pool.query("SELECT * FROM tipo_publicacion");
    //     res.json(tipoPublicacion);
    //   }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            database_1.default.query("SELECT * FROM tipo_publicacion", (err, rows) => {
                if (err) {
                    res.json("error al cargar");
                    console.log("Error al cargar");
                }
                else {
                    res.json(rows);
                    console.log("Datos seleccionados");
                }
            });
        });
    }
}
exports.tipoPublicaciónController = new TipoPublicacionController(); //instanciar la clase
