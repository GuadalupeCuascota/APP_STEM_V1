"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//importar las rutas
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const archivosRoutes_1 = __importDefault(require("./routes/archivosRoutes"));
class Server {
    constructor() {
        this.app = express_1.default(); // inicializamos express
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); //asignar el puerto de valor predetermnad o el valor fijo 3000
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/archivos', archivosRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server(); //ejecuta la clase server 
server.start();
