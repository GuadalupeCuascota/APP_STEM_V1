import { Request, Response } from "express";
import pool from "../database";
import { Router } from "express";

class TipoPublicacionController {
 
//   public async list(req: Request, res: Response) {
//     const tipoPublicacion = await pool.query("SELECT * FROM tipo_publicacion");
//     res.json(tipoPublicacion);
//   }
public async list(req:Request,res:Response){
pool.query("SELECT * FROM tipo_publicacion",(err: any,rows: any)=>{
  if(err){
    res.json("error al cargar");
      console.log("Error al cargar")
  }else{
      res.json(rows);
      console.log("Datos seleccionados")
  }
})
 
}

}
export const tipoPublicaciónController = new TipoPublicacionController(); //instanciar la clase
