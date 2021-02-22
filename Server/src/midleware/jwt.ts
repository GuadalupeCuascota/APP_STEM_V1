import { Request, Response , NextFunction} from "express";
import jwt from 'jsonwebtoken';

export const checkjwt=(req: Request, res: Response, next: NextFunction)=>{
    console.log("req", req.headers.login)

    if(!req.headers.login){
        return res.status(401).send ('no existe cabezera')
    }else{

   
    try {
        const token=<string>req.headers.login;
        const payload=jwt.verify(token, 'SCRET'); //obtener  los datos que se envio en el token
           console.log("este es el " , payload)
           res.locals.jwtPayload=payload
           //req.user_id=payload._id;
           next();
       } catch (error) {
           console.log("erro",error)
           res.status(401).json({message: 'Not autorizado'})
       }
    }
    // const token =<string> req.headers['login']; //esperamos un parametro login en el que se envia el token de la validadcion de usuario y contraseña
    // console.log("validar",token)
   
   
//     const {correo_electronico, contrasenia}=payload;
//     console.log("payloadd",jwtPayload)
//     const newToken=jwt.sign({correo_electronico,contrasenia}, 'SCRET',{expiresIn: '1h'});
//  res.setHeader('token',newToken);
// console.log("nuevo toke", newToken)


}

