import { Router } from 'express';
import {rolesController} from '../controllers/rolesController';
import {checkjwt}from '../midleware/jwt'
import {checkRol1} from '../midleware/roles'
class RolesRoutes
{
public router: Router= Router();

constructor(){
this.config();
}
config(): void{
this.router.get('/',rolesController.list);
this.router.get('/:id',rolesController.getOne);
this.router.post('/',rolesController.create);
this.router.delete('/:id',rolesController.delete);
this.router.put('/:id',rolesController.update);

}
}
const rolesRoutes=new RolesRoutes();
export default  rolesRoutes.router;


