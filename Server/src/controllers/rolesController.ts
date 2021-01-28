import { Request, Response } from "express";
import pool from "../database";

class RolesController {

  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT * FROM rol", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");
        console.log(err)
      } else {
        res.json(rows);
        console.log("Datos seleccionados");
      }
    });
  }

  public async getOne(req: Request, res: Response) {
    // pool.query("INSERT INTO rol set ?", [req.body]);

    const { id } = req.params;
    const roles = await pool.query("SELECT * FROM rol WHERE id_rol=?", [id]);
    console.log(roles);
    if (roles.length > 0) {
      return res.json(roles[0]);
    }
    res.json({ text: "el rol no existe" });
  }
  

  public   async create(req: Request, res: Response  ) {
    
    try{
   const tipo_rol=req.body.tipo_rol;
   const query="INSERT INTO rol(tipo_rol)VALUES (?)";
    await pool.query(query,[tipo_rol]);
    res.json({ text: "rol guardado" });
    }catch(err){
      res.json({ text: "Hubo un error " });
      console.log("hubo un errro"+ err)
    }
  }



  public  async delete(req: Request, res: Response): Promise <void>
   {
    try{
      const {id} = req.params;
      await pool.query(" DELETE FROM rol WHERE id_rol=?", [id]);
      res.json({message: "el rol fue eliminado"});

    }catch (err){

      res.json({ text: "Hubo un error " });
      console.log("No se puede eliminar"+ err)
    }
    
    
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
    try{
      const {id} = req.params;
      const roles= await pool.query(" UPDATE rol set ? WHERE id_rol=?",[req.body,id]);
      res.json({ message: "actualizado"});
  
    }catch(err){
      res.json({ text: "Hubo un error " });
      console.log("No se puede actualizar"+ err)
    }
  
   
  }
}
export const rolesController = new RolesController(); //instanciar la clase
