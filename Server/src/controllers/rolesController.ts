import { Request, Response } from "express";
import pool from "../database";

class RolesController {

  public async list(req: Request, res: Response) {
    const roles = await pool.query("SELECT * FROM rol");
    res.json(roles);
  }

  public async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const roles = await pool.query("SELECT * FROM rol WHERE id_rol=?", [id]);
    console.log(roles);
    if (roles.length > 0) {
      return res.json(roles[0]);
    }
    res.status(404).json({ text: "el rol no existe" });
  }
  //res.json({ text: "rol encontrado" +req.params.id});


  public  create(req: Request, res: Response  ) {
  
    //console.log(req.body);
    // const tipo=req.body.tipo_rol;
    // console.log(tipo)
   pool.query("INSERT INTO rol set ?", [req.body]);
   
    res.json({ text: "rol guardado " });
  }

  public  create1(req: Request, res: Response  ) {
  
    //console.log(req.body);
    const tipo_rol=req.body.tipo_rol;
    const query="INSERT INTO rol(tipo_rol)VALUES (?)";
   pool.query(query,[tipo_rol]);
   
    res.json({ text: "rol guardado " });
  }

  
  public  async delete(req: Request, res: Response): Promise <void>
   {
    
    const {id} = req.params;
    await pool.query(" DELETE FROM rol WHERE id_rol=?", [id]);
    res.json({message: "el rol fue eliminado"});
    
 
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
  
    const {id} = req.params;
      const roles= await pool.query(" UPDATE rol set ? WHERE id_rol=?",[req.body,id]);
      res.json({ message: "actualizado"});
  
  }
}
export const rolesController = new RolesController(); //instanciar la clase
