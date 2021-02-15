import { Request, Response , NextFunction} from "express";
import jwt from 'jsonwebtoken';

export const checkjwt=(req: Request, res: Response, next: NextFunction)=>{
    console.log("req", req.headers)
    const token =<string> req.headers['login']; //esperamos un parametro login en el que se envia el token de la validadcion de usuario y contraseña
    console.log("validar",token)
    let  jwtPayload;
    try {
        jwtPayload=<any>jwt.verify(token, 'TODO_SCRET');
        console.log("este es el " , jwtPayload)
        res.locals.jwtPayload=jwtPayload
    } catch (error) {
        console.log("erro",error)
        res.status(401).json({message: 'Not autorizado'})
    }
    const {correo_electronico, contrasenia}=jwtPayload;
    console.log("payloadd",jwtPayload)
    const newToken=jwt.sign({correo_electronico,contrasenia}, 'TODO_SCRET',{expiresIn: '1h'});
 res.setHeader('token',newToken);
console.log("nuevo toke", newToken)
 next();

}

