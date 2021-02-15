import { Request, Response , NextFunction} from "express";
import pool from "../database";
export const checkRol=(roles:Array<string>)=>{
 
return async (req: Request, res: Response, next: NextFunction)=>{

 
    const correo_electronico=res.locals.jwtPayload.correo_electronico;
    const contrasenia=res.locals.jwtPayload.contrasenia;
    console.log("correo", correo_electronico)
    console.log("contrasenia ", contrasenia)
 try {
    const id_rol=await pool.query(
      "SELECT r.tipo_rol from usuario u, rol r where u.correo_electronico=? and u.contrasenia=? and u.id_rol=r.id_rol",
      [correo_electronico,contrasenia]);
      console.log(id_rol)
       const role=id_rol
       if(roles.includes(role)){
         next();
       }else{
         return res.status(401).json({message:'No autorizado1'});  
       }
      
         
      

    
        
      
 } catch (error) {
     return res.status(401).json({message:'No autorizado00'});
 }
 

 
 }
}
