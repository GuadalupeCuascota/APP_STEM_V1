import { constants } from "buffer";
import { Request, Response } from "express";
import pool from "../database";
import jwt from 'jsonwebtoken';
// import { getRepository } from 'typeorm';

class AutentificacionController {
   
    public async login (req: Request, res: Response) {
        
            const {correo_electronico, contrasenia,id_rol}=req.body;
            
            if(!(correo_electronico && contrasenia)){
                return res.status(400).json({message: 'correo y contraseña son requeridos'})
            }else{
              const usuario=await pool.query(
                "SELECT * FROM usuario WHERE correo_electronico=? and contrasenia=?",
                [correo_electronico,contrasenia]);
                if (usuario.length > 0) {
                    //return res.json(usuario[0]);
                     const Token=jwt.sign({correo_electronico,contrasenia}, 'TODO_SCRET',{expiresIn: '1h'})
                     res.json({message: 'OK', Token}) 

                
                  } else{
                    res.status(404).json({ text: "correo o contraseña es incorrecto" });
                  }
                 
              
            }

       

    }
    public async cambiarContrasenia (req: Request, res: Response) {

    }
    
    
}
export const autentificacionController = new AutentificacionController();