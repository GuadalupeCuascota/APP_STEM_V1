import { Request, Response } from "express";
import pool from "../database";
import { Archivo } from "../Models/archivo";
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
    const archivo = await pool.query(
      "SELECT * FROM archivo WHERE id_archivo=?",
      [id]
    );

    if (archivo.length > 0) {
      return res.json(archivo[0]);
    }
    res.status(404).json({ text: "el archivo no existe" });
  }
  //res.json({ text: "rol encontrado" +req.params.id});

  public async create(req: Request, res: Response) {
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
      console.log("id_tio_publicasion:" +req.body.id_tipo_publicacion)
      console.log("titulo:" +req.body.titulo)
      console.log(req.file); //file variable donde se guarda los datos del archivo
      const ruta_archivo = req.file.path;

      const query =
        "INSERT INTO publicacion (titulo,descripcion,enlace,profesion,estado_profesion,ruta_archivo,id_tipo_publicacion,id_usuario,id_estado_publicacion) VALUES (?,?,?,?,?,?,?,?,?)";
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
    } catch (error) {
      console.log("hubo un error" + error);
      res.json("NO se puede guardar");
    }
  }
  //console.log(req.body);

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const archivo = await pool.query(
      " DELETE FROM archivo WHERE id_archivo=?",
      [id]
    );

    res.json({ message: "el archivo fue eliminado" });
  }

  // res.json({ text: "eliminando" + req.params.id });

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const roles = await pool.query(" UPDATE archivo set ? WHERE id_archivo=?", [
      req.body,
      id,
    ]);

    res.json({ message: "actualizado" });
  }

  // ublic async list(req: Request, res: Response): Promise <void> {
  //   await pool.query("SELECT * FROM archivo", (err: any, rows: any) => {

  //       if (err) {
  //         res.json("error al cargar");
  //         console.log(err)
  //       } else {
  //         res.json(rows);
  //         console.log("Datos seleccionados");
  //       }
  //     });

  //   }

  //   public async getOne(req: Request, res: Response) {
  //     const { id } = req.params;
  //     const archivo = await pool.query("SELECT * FROM archivo WHERE id_archivo=?", [id]);

  //     if (archivo.length > 0) {
  //       return res.json(archivo[0]);
  //     }
  //     res.status(404).json({ text: "el archivo no existe" });
  //   }
  //   //res.json({ text: "rol encontrado" +req.params.id});

  //   public async create(req: Request, res: Response) {
  //     console.log(req.file) //file variable donde se guarda los datos del archivo
  //     try {
  //     const nombre_archivo=req.file.filename
  //     const tipo_archivo=req.file.mimetype
  //     const ruta=req.file.path

  //     const query="INSERT INTO archivo (nombre_archivo, tipo_archivo,ruta) VALUES (?,?,?)";
  //     pool.query(query,[nombre_archivo,tipo_archivo,ruta]);
  //     res.json({ text: "Archivo guardando" });
  //     } catch (error) {
  //       console.log("hubo un error"+error)
  //       res.json("NO se puede guardar");

  //     }

  //   }
  //     //console.log(req.body);

  //   public  async delete(req: Request, res: Response): Promise <void>
  //    {
  //     const {id} = req.params;

  //   const archivo =  await pool.query(" DELETE FROM archivo WHERE id_archivo=?", [id]);

  //   res.json({message: "el archivo fue eliminado"});

  //   }

  //    // res.json({ text: "eliminando" + req.params.id });

  //   public async update(req: Request, res: Response) {
  //     const {id} = req.params;
  //       const roles= await pool.query(" UPDATE archivo set ? WHERE id_archivo=?",[req.body,id]);

  //       res.json({ message: "actualizado"});

  //   }
}
export const archivosController = new ArchivosController(); //instanciar la clase
