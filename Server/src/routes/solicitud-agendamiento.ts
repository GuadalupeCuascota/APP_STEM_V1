import { Router } from 'express';
import {agendarMentoriaController} from '../controllers/AgendarMentoriaController';

class SolicitudesMentoriaRoutes
{
public router: Router= Router();
// 
constructor(){
this.config();
}
config(): void{
this.router.get('/',agendarMentoriaController.listsolicitudes);


}
}
const solicitudesMentoriaRoutes=new SolicitudesMentoriaRoutes;
export default  solicitudesMentoriaRoutes.router;