import { Request, Response } from "express";
import pool from "../database";

class UsuariosController {
  // public async list(req: Request, res: Response) {
  //   const usuarios = await pool.query("SELECT * FROM usuario");
  //   res.json(usuarios);
  // }
  public async list1(req: Request, res: Response) {

    await pool.query("SELECT u.cedula, u.nombre, u.apellido,u.nivel_academico,u.carrera,u.unidad_educativa,u.contrasenia, r.tipo_rol from usuario u, rol r WHERE r.id_rol=u.id_rol", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");
        console.log(err)
      } else {
        res.json(rows);
        console.log("Datos de usuarios seleccionados");
      }
    });
    
  }
  public async getOne(req: Request, res: Response) {

    const {id} =  req.params;
    const usuarios = await pool.query("SELECT u.cedula, u.nombre, u.apellido,u.nivel_academico,u.carrera,u.unidad_educativa,u.contrasenia, r.tipo_rol from usuario u, rol r WHERE  r.id_rol=u.id_rol and u.cedula=?", [id]);
    
    console.log(usuarios);
    if (usuarios.length > 0) {
      return res.json(usuarios[0]);
    }
    res.status(404).json({ text: "el usuario no existe" });
  }
  // public async create(req: Request, res: Response) {
 
  //   await pool.query("INSERT INTO usuario set ?",[req.body]);
  //   res.json({text: "usuario guardado"});
  //   console.log([req.body]);
  // }

  public async create1(req: Request, res: Response,) {
    const cedula =req.body.cedula;
    const nombre =req.body.nombre;
    const apellido =req.body.apellido;
    const nivel_academico =req.body.nivel_academico;
    const carrera=req.body.carrera;
    const unidad_educativa =req.body.unidad_educativa;
    const contrasenia =req.body.contrasenia;
    const id_rol =req.body.id_rol;
    try {
      const query="INSERT INTO usuario (cedula, nombre,apellido,nivel_academico,carrera,unidad_educativa,contrasenia, id_rol) VALUES (?,?,?,?,?,?,?,(select id_rol from rol where tipo_rol=?))";
    pool.query(query,[cedula, nombre,apellido,nivel_academico,carrera,unidad_educativa,contrasenia,id_rol]);
    res.json({text: "usuario guardado"});

    } catch (error) {
      res.json({ text: "Hubo un error " });
      console.log("no se puede guardar"+ error)
    }
    
    
    //console.log([req.body]);
  }
  public  async delete(req: Request, res: Response): Promise <void>
   {
     try {
      const {id} = req.params;
      console.log("cedula:"+id)
      await pool.query(" DELETE FROM usuario WHERE cedula=?", [id]);
      res.json({message: "el dato fue eliminado"});
     } catch (error) {
      res.json({ text: "Hubo un error " });
      console.log("no se puede eliminar"+ error)
     }
   
    
  
  }

   // res.json({ text: "eliminando" + req.params.id });
  
  public async update(req: Request, res: Response) {
    // console.log("nombre:"+req.body.nombre)
    // console.log("cedula:"+req.body.cedula)
    const {id}=req.params;
    const cedula =req.body.cedula;
     const nombre =req.body.nombre;
    const apellido =req.body.apellido;
    const nivel_academico =req.body.nivel_academico;
    const carrera=req.body.carrera;
    const unidad_educativa =req.body.unidad_educativa;
    const contrasenia =req.body.contrasenia;
    const tipo_rol =req.body.tipo_rol;
     console.log("rol:"+req.body.tipo_rol)
     console.log("cedula:"+req.body.cedula)
     console.log("nombre:"+req.body.nombre)
    const query="UPDATE usuario set cedula=?,nombre=?,apellido=?,nivel_academico=?,carrera=?,unidad_educativa=?,contrasenia=?, id_rol=(select id_rol from rol where tipo_rol=?) WHERE cedula=?";
    pool.query(query,[ cedula,nombre,apellido,nivel_academico,carrera,unidad_educativa,contrasenia, tipo_rol,id]);
    res.json({text: "usuario actualizado"});
  }
  
  
}

export const usuariosController = new UsuariosController(); //instanciar la clase
