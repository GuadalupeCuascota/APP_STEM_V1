import { Request, Response } from "express";
import pool from "../database";
import path from "path";
import fs from "fs-extra";

class EventosController {
  public async list(req: Request, res: Response): Promise<void> {
    await pool.query("SELECT * FROM evento", (err: any, rows: any) => {
      if (err) {
        res.status(404).json("error al cargar");
        console.log(err);
      } else {
        res.status(200).json(rows);
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
      return res.status(200).json(publicacion[0]);
    }
    res.status(404).json({ text: "publicación no existe" });
  }
  //res.json({ text: "rol encontrado" +req.params.id});

  public async create(req: Request, res: Response) {
    console.log("CREAR");
    try {
      const {
       id_tipo_evento,
       id_publicacion,
       id_usuario,
      } = req.body;
   console.log("id_tipo_evento"+req.body.id_tipo_evento)
   console.log("id_publicación"+req.body.id_publicacion)
   console.log("id_publicación"+req.body.id_usuario)
      const query =
        "INSERT INTO evento (id_tipo_evento,id_publicacion,id_usuario) VALUES (?,?,?)";
        await pool.query(query,[id_tipo_evento,id_publicacion,id_usuario]);
        res.json({ text: "evento guardado" });
        }catch(err){
          res.json({ text: "Hubo un error " });
          console.log("hubo un errro"+ err)
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
export const eventosController = new EventosController(); //instanciar la clase
