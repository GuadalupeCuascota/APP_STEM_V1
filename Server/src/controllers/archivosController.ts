import { Request, Response } from "express";
import pool from "../database";

class ArchivosController {
  public async list(req: Request, res: Response) {
    const roles = await pool.query("SELECT * FROM archivo");
    res.json(roles);
  }

  public async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const roles = await pool.query("SELECT * FROM archivo WHERE id_archivo=?", [id]);
    console.log(roles);
    if (roles.length > 0) {
      return res.json(roles[0]);
    }
    res.status(404).json({ text: "el archivo no existe" });
  }
  //res.json({ text: "rol encontrado" +req.params.id});


  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO archivo set ?", [req.body]);
    res.json({ text: "archivo guardado " });
  }
    //console.log(req.body);
  
  public  async delete(req: Request, res: Response): Promise <void>
   {
    const {id} = req.params;
    await pool.query(" DELETE FROM archivo WHERE id_archivo=?", [id]);
    res.json({message: "el archivo fue eliminado"});
    
 
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
    const {id} = req.params;
      const roles= await pool.query(" UPDATE archivo set ? WHERE id_archivo=?",[req.body,id]);
      res.json({ message: "actualizado"});
  
  }
}
export const archivosController = new ArchivosController(); //instanciar la clase