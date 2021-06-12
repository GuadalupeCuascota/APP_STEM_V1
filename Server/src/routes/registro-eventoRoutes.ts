import { Router } from "express";
import {eventosController} from "../controllers/registro-eventoController";
import multer from '../libs/multer';

class EventosRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
  
    this.router.get("/",eventosController.list);
    this.router.get("/:id", eventosController.getOne);
    this.router.post("/", eventosController.create ); 
    this.router.delete("/:id",eventosController.delete);
    this.router.put("/:id",eventosController.update );
  }
}
const eventoRoutes=new EventosRoutes();
export default  eventoRoutes.router;