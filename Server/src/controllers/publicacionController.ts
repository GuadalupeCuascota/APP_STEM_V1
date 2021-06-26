import { Request, Response } from "express";
import pool from "../database";
import path from "path";
import fs from "fs-extra";

class ArchivosController {
  // public async list(req: Request, res: Response){
    
  //   await pool.query("SELECT *FROM  publicacion ", (err: any, rows: any) => {
  //     if (err) {
  //       res.status(404).json("error al cargar");
  //       console.log(err)
  //     } else {
  //       res.status(200).json(rows);
  //       console.log("Datos de publicaciones seleccionados");
  //     }
  //   });
  // }
  public async listP(req: Request, res: Response){
    await pool.query("SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera", (err: any, rows: any) => {
      if (err) {
        res.status(404).json("error al cargar");
        console.log(err)
      } else {
        res.status(200).json(rows);
        console.log("Datos de publicaciones seleccionados");
      }
    });
  }

  public async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const publicacion = await pool.query(
      "SELECT * FROM publicacion WHERE id_publicacion=?",
      [id]
    );

    if (publicacion.length > 0) {
      return res.status(200).json(publicacion[0]);
    }
    res.status(404).json({ text: "publicación no existe" });
  }
  public async getPublicacionC(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id)
    const publicacion = await pool.query(
      "SELECT u.id_publicacion, u.titulo, u.nombre_perfil, u.fecha_publicacion,u.descripcion,u.enlace,u.profesion,u.ruta_archivo,u.tipo_archivo,u.id_tipo_publicacion,u.id_usuario, u.id_estado_publicacion, r.nombre_carrera from publicacion u, carreras_fica r WHERE r.id_carrera=u.id_carrera and u.id_carrera=?",
      [id]
    );

    if (publicacion.length > 0) {
      return res.status(200).json(publicacion);
    }
    res.status(404).json({ text: "publicación no existe" });
  }

  
  public async create(req: Request, res: Response) {
    console.log("CREAR");
    try {
      const {
        titulo,
        nombre_perfil,
        descripcion,
        enlace,
        profesion,
        estado_profesion,
        id_tipo_publicacion,
        id_usuario,
        id_estado_publicacion,
        id_carrera
        
      } = req.body;
      console.log(req.file);
      console.log("titulo:" + req.body.estado_profesion);
      console.log("descripcion", req.body.descripcion);
      console.log("enlace", req.body.enlace);
      console.log("profeion", req.body.profesion);
      console.log("estado profesion", req.body.estado_profesion);
      console.log("id_tipo_publicacion:" + req.body.id_tipo_publicacion);
      console.log("usuario:" + req.body.id_usuario);
      console.log("id_estado_publicación:" + req.body.id_estado_publicacion);
      console.log("id_carrera",req.body.id_carrera)
      console.log("nombre_perfil",req.body.nombre_perfil)
      
      const query =
        "INSERT INTO publicacion (titulo,nombre_perfil,descripcion,enlace,profesion,estado_profesion,ruta_archivo,tipo_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion,id_carrera) VALUES (?,?,?,?,?,?,?,?,?,?,?,(select id_carrera from carreras_fica where nombre_carrera=?))";

      if (req.file) { 
        console.log("pasa1");
        const ruta_archivo = req.file.path;
        const tipo_archivo=req.file.mimetype
        console.log(req.file.path);
        console.log(req.file.mimetype)
        await pool.query(query, [
          titulo,
          nombre_perfil,
          descripcion,
          enlace,
          profesion,
          estado_profesion,
          ruta_archivo,
          tipo_archivo,
          id_tipo_publicacion,
          id_usuario,
          id_estado_publicacion,
          id_carrera
        ]);
        res.status(201).json({ text: "Archivo guardado" });
      } else {
        const ruta_archivo = null;
        await pool.query(query, [
          titulo,
          descripcion,
          enlace,
          profesion,
          estado_profesion,
          ruta_archivo,
          id_tipo_publicacion,
          id_usuario,
          id_estado_publicacion,
        ]);
        res.status(201).json({ text: "Archivo guardado" });
      }
    } catch (err) {
      console.log("hubo un error" + err);
      res.status(404).json({ text: "error" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const publicacion = await pool.query(
      "SELECT * FROM publicacion WHERE id_publicacion=?",
      [id]
    );

    if (publicacion.length > 0) {
      console.log("pasa");
      const archivo = await pool.query(
        " DELETE FROM publicacion WHERE id_publicacion=?",
        [id]
      );
      if (publicacion[0].ruta_archivo != null) {
        console.log("si hay ruta");
        if (!path.resolve(publicacion[0].ruta_archivo)) {
          console.log("segundo pasa");
          await fs.unlink(path.resolve(publicacion[0].ruta_archivo));
        } else {
          return res.json({ message: "No existe archivo en el servidor" });
        }
      }

      return res.status(204).json({ message: "el archivo fue eliminado" });
    }
    return res.status(404).json({ text: "el archivo no existe" });
  }

  

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      console.log("id: " + id);
      const {
        titulo,
        descripcion,
        enlace,
        profesion,
        estado_profesion,
      } = req.body;

      const query =
        "UPDATE publicacion set titulo=?,descripcion=?,enlace=?, profesion=?,estado_profesion=?, ruta_archivo=? WHERE id_publicacion=?";
      if (req.file) {
      const ruta_archivo = req.file.path;
      pool.query(query, [
        titulo,
        descripcion,
        enlace,
        profesion,
        estado_profesion,
        ruta_archivo,
        id,
      ]);
      return res.status(204).json({ text: "publicación actualizado" });

      }else{
        const ruta_archivo = null;
        pool.query(query, [
          titulo,
          descripcion,
          enlace,
          profesion,
          estado_profesion,
          ruta_archivo,
          id,
        ]);
        return res.status(204).json({ text: "publicación actualizado" });
      }
    } catch (err) {
      console.log("no se puede actualizar" + err);
      return res.status(404).json({ text: "Hubo un error " });
    }
  }
  
}
export const archivosController = new ArchivosController(); //instanciar la clase
