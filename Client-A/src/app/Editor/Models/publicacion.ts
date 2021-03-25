export interface Publicacion {
    id_publicacion: number;
    titulo: string;
    fecha_publicacion: Date;
    descripcion:string;
    enlace:string;
    profesion:string;
    estado_profesion: string;
    ruta_archivo: string;
    id_tipo_publicacion:string;
    id_estado_publicacion : string;
    id_usuario : string;
}