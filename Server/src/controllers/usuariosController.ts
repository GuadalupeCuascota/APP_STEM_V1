import { Request, Response } from "express";
import pool from "../database";

class UsuariosController {
  public async list(req: Request, res: Response) {
    const usuarios = await pool.query("SELECT * FROM usuario");
    res.json(usuarios);
  }
  public async getOne(req: Request, res: Response) {
    const {id} = req.params;
    const roles = await pool.query("SELECT * FROM usuario WHERE cedula=?", [id]);
    console.log(roles);
    if (roles.length > 0) {
      return res.json(roles[0]);
    }
    res.status(404).json({ text: "el rol no existe" });
  }
  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO usuario set ?",[req.body]);
    res.json({text: "usuario guardado"});
    console.log([req.body]);
  }
  public  async delete(req: Request, res: Response): Promise <void>
   {
    const {id} = req.params;
    await pool.query(" DELETE FROM usuario WHERE cedula=?", [id]);
    res.json({message: "el dato fue eliminado"});
    
 
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
    const {id} = req.params;
      const roles= await pool.query(" UPDATE usuario set ? WHERE cedula=?",[req.body,id]);
      res.json({ message: "usuario actualizado"});
  
  }
  
  
}

export const usuariosController = new UsuariosController(); //instanciar la clase
