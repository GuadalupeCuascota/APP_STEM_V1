import { Router } from "express";
import {archivosController} from "../controllers/publicacionController"
import multer from '../libs/multer';
class PublicacionRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/", archivosController.list);
    this.router.get("/:id", archivosController.getOne);
    this.router.post("/", multer.single('file') ,archivosController.create ); //antes de procesar pasa por multer para saber si hay un archivo 
    this.router.delete("/:id",archivosController.delete);
    this.router.put("/:id",archivosController.update );
  }
}
const publicacionRoutes=new PublicacionRoutes();
export default  publicacionRoutes.router;