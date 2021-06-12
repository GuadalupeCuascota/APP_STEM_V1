import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from "path";
import helmet from "helmet";

//importar las rutas
import rolesRoutes from './routes/rolesRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import publicacionRoutes from './routes/publicacionRoutes';
import  tipoPublicacionRoutes from './routes/tipo-publicaciónRoute';
import autenticacionRoutes from "./routes/autentificacionRoutes";
import eventoRoutes from './routes/registro-eventoRoutes'


class Server {
    public app: Application
    constructor(){ //crear el método constructor 
    this.app=express();// inicializamos express
    this.config();
    this.routes();
    }
    config():void{//método para establecer el puerto
    this.app.set('port', process.env.PORT || 3000); //asignar el puerto de valor predetermnad o el valor fijo 3000
    this.app.use(morgan('dev')) ;
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(express.urlencoded({extended:false}));
    }
    routes():void{//método para definir rutas del servidor
     this.app.use('/api/roles',rolesRoutes);
     this.app.use('/api/usuarios',usuariosRoutes);
     this.app.use('/api/tipoPublicacion',tipoPublicacionRoutes);
     this.app.use('/api/publicaciones',publicacionRoutes);
     this.app.use('/login',autenticacionRoutes);
     this.app.use('/uploads',express.static(path.resolve('uploads')));
     //carpeta para almacenar archivos publicos

    this.app.use('/api/registro-evento',eventoRoutes)
    
    }
    start(): void{//método para inicializar el servidor
     this.app.listen(this.app.get('port'),()=>{ 
         console.log('Server on port', this.app.get('port'));
         
     })
    }
}
 
const server=new Server(); //ejecuta la clase server 
server.start();