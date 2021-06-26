import { validate } from "class-validator";
import { Request, Response } from "express";
import pool from "../database";

class CarrerasFicaController {

  public async list(req: Request, res: Response) {
    // const roles = await pool.query("SELECT * FROM rol");
    // res.json(roles);
    await pool.query("SELECT * FROM carreras_fica", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");
        console.log(err)
      } else {
        res.json(rows);
        console.log("Datos seleccionados probando1");
      }
    });
  }

  public async getOne(req: Request, res: Response) {
    // pool.query("INSERT INTO rol set ?", [req.body]);

    const { id } = req.params;
    const carreras = await pool.query("SELECT * FROM carreras_fica WHERE id_carrera=?", [id]);
    console.log(carreras);
    if (carreras.length > 0) {
      return res.json(carreras[0]);
    }
    res.json({ text: "la carrera no existe" });
  }
  

  public   async create(req: Request, res: Response  ) {
    
    try{
   const nombre_carrera=req.body.nombre_carrera;
   const  estado_carrera=req.body.estado_carrera
   const query="INSERT INTO carreras_fica(nombre_carrera, estado_carrera)VALUES (?,?)";
    await pool.query(query,[nombre_carrera,estado_carrera]);
    res.json({ text: "carrera guardado" });
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
    
      const {id} = req.params;
      const{id_rol,tipo_rol}=req.body
     
      
     if(tipo_rol){
       try {
        const roles= await pool.query(" UPDATE rol set ? WHERE id_rol=?",[req.body,id]);
        res.json({ message: "actualizado"});
       } catch (error) {
        res.json({ text: "Hubo un error " ,error});
        console.log("No se puede actualizar"+ error)
       }
      
    } else{
      res.json({ message: "Atributos requeridos"});
    }
    
      
   
    
   
  }
}
export const carrerasficaController = new CarrerasFicaController();