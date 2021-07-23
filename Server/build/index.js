"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
//importar las rutas
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const mentoriasUsuarioRoutes_1 = __importDefault(require("./routes/mentoriasUsuarioRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const publicacionRoutes_1 = __importDefault(require("./routes/publicacionRoutes"));
const publicacionesCarreraRoutes_1 = __importDefault(require("./routes/publicacionesCarreraRoutes"));
'./routes/publicacionesCarreraRoutes';
const tipo_publicaci_nRoute_1 = __importDefault(require("./routes/tipo-publicaci\u00F3nRoute"));
const autentificacionRoutes_1 = __importDefault(require("./routes/autentificacionRoutes"));
const registro_eventoRoutes_1 = __importDefault(require("./routes/registro-eventoRoutes"));
const carrerasficaRoutes_1 = __importDefault(require("./routes/carrerasficaRoutes"));
const mentorias_registroRoutes_1 = __importDefault(require("./routes/mentorias-registroRoutes"));
'./routes/mentorias-registroRoutes';
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
        this.app.use(helmet_1.default());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/tipoPublicacion', tipo_publicaci_nRoute_1.default);
        this.app.use('/api/publicaciones', publicacionRoutes_1.default);
        this.app.use('/login', autentificacionRoutes_1.default);
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
        this.app.use('/api/carrerasFica', carrerasficaRoutes_1.default);
        this.app.use('/api/publicacionesCarrera', publicacionesCarreraRoutes_1.default);
        //carpeta para almacenar archivos publicos
        this.app.use('/api/registro-mentorias', mentorias_registroRoutes_1.default);
        this.app.use('/api/registro-evento', registro_eventoRoutes_1.default);
        this.app.use('/api/mentoriaUsuario', mentoriasUsuarioRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server(); //ejecuta la clase server 
server.start();
