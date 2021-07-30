import { Console } from "console";
import {  Request, Response } from "express";
import pool from "../database";

class AngerdarMentoriaController{
    // public async list(req: Request, res: Response) {
    //   const usuarios = await pool.query("SELECT * FROM usuario");
    //   res.json(usuarios);
    // }
    public async list(req: Request, res: Response) {
      
  
      await pool.query("select r.fecha,r.hora_inicio,r.hora_fin,a.id_usuario,u.nombre,u.apellido,a.estado from registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=r.id_usuario", (err: any, rows: any) => {
        
        if (err) {
          res.status(404).json("error al cargar");
          console.log(err)
        } else {
          res.status(200).json(rows);
          console.log(rows);
        }
      });
                           
    }
    public async listsolicitudes(req: Request, res: Response) {
      
  
      await pool.query("select r.fecha,r.hora_inicio,r.hora_fin,r.id_usuario,u.nombre,u.apellido,a.estado from registro_mentoria r, agendamiento_mentorias a, usuario u where r.id_registro_mentoria=a.id_registro_mentoria and u.id_usuario=a.id_usuario", (err: any, rows: any) => {
        
        if (err) {
          res.status(404).json("error al cargar");
          console.log(err)
        } else {
          res.status(200).json(rows);
          console.log(rows);
        }
      });
                           
    }
    public async getMentoriasUsuario(req: Request, res: Response) {
      console.log("pasa usuario")
      const {id} =  req.params;
      const registroMentoriasporUsuario = await pool.query("SELECT fecha, hora_inicio, hora_fin,tipo_mentoria from registro_mentoria WHERE id_usuario=?" , [id]);
      
      console.log(registroMentoriasporUsuario);
      if (registroMentoriasporUsuario.length > 0) {
        return res.status(200).json(registroMentoriasporUsuario);
      }
      res.status(404).json({ text: "En este momento no existe mentorias disponibles"});
    }
    
  
    
    public async getOne(req: Request, res: Response) {
      console.log("PASA AQUIII")
      const {id} =  req.params;
      const registroMentorias = await pool.query("SELECT m.id_registro_mentoria,m.fecha, m.hora_inicio, m.hora_fin, m.tipo_mentoria,m.id_estado_mentoria,u.nombre,u.apellido from registro_mentoria m, usuario u WHERE m.id_usuario=u.id_usuario and m.id_registro_mentoria=?" , [id]);
      
      console.log(registroMentorias);
      if (registroMentorias.length > 0) {
        return res.status(200).json(registroMentorias[0]);
      }
      res.status(404).json({ text: "El registro no existe" });
    }
    
    
    public   async create(req: Request, res: Response  ) {
      console.log("pasa crear")
      
      try{
     const {id_registro_mentoria,observacion,estado,id_usuario}=req.body;
     console.log("registro:" + req.body.id_registro_mentoria);
     console.log("usuario:" + req.body.id_usuario);
     const query="INSERT INTO agendamiento_mentorias(id_registro_mentoria,observacion,estado,id_usuario) VALUES (?,?,?,?)";
      await pool.query(query,[id_registro_mentoria,observacion,estado,id_usuario]);
      res.status(201).json({text: "mentoria agendada"})
      
      }catch(err){
       
        res.json({ text: "Hubo un error " });
        console.log("hubo un errro"+ err)
      }
    }
    public  async delete(req: Request, res: Response): Promise <void>
    {
      try {
       const {id} = req.params;
       console.log("id_registro:"+id)
       await pool.query(" DELETE FROM registro_mentoria  WHERE id_registro_mentoria=?", [id]);
       res.status(201).json({text: "el dato fue eliminado"});
      } catch (error) {
       res.status(404).json({ text: "Hubo un error " });
       console.log("no se puede eliminar"+ error)
      }
  
   }
  
    public async update(req: Request, res: Response) {
      console.log("pasa actualizar")
      console.log("fecha:"+req.body.fecha)
       try{
        const {id}=req.params;
        console.log("id_mentoria: "+id)
     
        const fecha =req.body.fecha;
        const hora_inicio =req.body.hora_inicio;
        const hora_fin =req.body.hora_fin;
        const tipo_mentoria=req.body.tipo_mentoria;
        const id_estado_mentoria =req.body.id_estado_mentoria;
        const id_usuario =req.body.id_usuario;
        console.log("hora_inicio: "+req.body.hora_inicio)
        console.log("hora_inicio: "+req.body.hora_fin)
        console.log("hora_estado: "+req.body.id_estado_mentoria)
        console.log("hora_usuario: "+req.body.id_usuario)
        const query="UPDATE registro_mentoria set fecha=?,hora_inicio=?,hora_fin=?,tipo_mentoria=?,id_estado_mentoria=?, id_usuario=? where id_registro_mentoria=?";
        pool.query(query,[fecha,hora_inicio,hora_fin,tipo_mentoria,id_estado_mentoria,id_usuario,id]);
        res.status(200).json({text: "registro actualizado"});
        
      }catch(error) 
      {
        res.status(404).json({ text: "Hubo un error" });
       
      }
     
    }
    
    
  }
  
  export const agendarMentoriaController = new AngerdarMentoriaController(); //instanciar la clase