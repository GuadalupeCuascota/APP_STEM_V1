import { Router } from "express";
import {tipoPublicaciónController} from "../controllers/tipo-publicaciónController"
class  TipoPublicacionRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.get("/",tipoPublicaciónController.list);
    this.router.get("/:id", );
    this.router.post("/", );
    this.router.delete("/:id",);
    this.router.put("/:id", );
  }
}
const tipoPublicacionRoutes=new TipoPublicacionRoutes();
export default  tipoPublicacionRoutes.router;