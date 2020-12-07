import { Router } from "express";
import {archivosController} from "../controllers/archivosController"
class ArchivosRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/", archivosController.list);
    this.router.get("/:id", archivosController.getOne);
    this.router.post("/", archivosController.create );
    this.router.delete("/:id",archivosController.delete);
    this.router.put("/:id",archivosController.update );
  }
}
const archivosRoutes=new ArchivosRoutes();
export default  archivosRoutes.router;