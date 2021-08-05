import { Router } from 'express';
import {usuariosController} from '../controllers/usuariosController';

class CambiarPassRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{

this.router.put('/:id',usuariosController.updatePass);

}
}
const cambiarPassRoutes=new CambiarPassRoutes();
export default  cambiarPassRoutes.router;
