import { Request, Response } from "express";
import pool from "../database";
import path from "path";
import fs from "fs-extra";

class ArchivosController {
  public async list(req: Request, res: Response): Promise<void> {
    await pool.query("SELECT * FROM publicacion", (err: any, rows: any) => {
      if (err) {
        res.json("error al cargar");
        console.log(err);
      } else {
        res.json(rows);
        console.log("Datos seleccionados");
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
      return res.json(publicacion[0]);
    }
    res.status(404).json({ text: "publicación no existe" });
  }
  //res.json({ text: "rol encontrado" +req.params.id});

  public async create(req: Request, res: Response) {
    console.log("CREAR");
    try {
      const {
        titulo,
        descripcion,
        enlace,
        profesion,
        estado_profesion,
        id_tipo_publicacion,
        id_usuario,
        id_estado_publicacion,
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
      const query =
        "INSERT INTO publicacion (titulo,descripcion,enlace,profesion,estado_profesion,ruta_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion) VALUES (?,?,?,?,?,?,?,?,?)";

      if (req.file) {
        console.log("pasa");
        const ruta_archivo = req.file.path;
        console.log(req.file.path);
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
        res.json({ text: "Archivo guardado" });
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
        res.json({ text: "Archivo guardado" });
      }
    } catch (err) {
      console.log("hubo un error" + err);
      err.json({ text: "error" });
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

      return res.json({ message: "el archivo fue eliminado" });
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
      return res.json({ text: "publicación actualizado" });

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
        return res.json({ text: "publicación actualizado" });
      }
    } catch (err) {
      console.log("no se puede actualizar" + err);
      return res.json({ text: "Hubo un error " });
    }
  }
}
export const archivosController = new ArchivosController(); //instanciar la clase
