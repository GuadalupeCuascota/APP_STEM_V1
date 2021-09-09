import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Publicacion} from '../Models/publicacion'


@Injectable({
  providedIn: 'root'
})
export class RegistroPublicacionService {

  constructor(private httpClient: HttpClient) { }
  getpublicaciones(){
    return this.httpClient.get<Array<Publicacion>>(environment.baseUrl+"/publicaciones");
    }
  getPublicacionesCarrera(idCarrera:number){
      return this.httpClient.get<Publicacion>(environment.baseUrl+"/publicacionesCarrera/"+idCarrera);
  }

  getPublicacion(idCarrera:number){
    return this.httpClient.get<Publicacion>(environment.baseUrl+"/publicaciones/"+idCarrera);
  }
  savePublicacion (formData){
    return this.httpClient.post<Publicacion>(environment.baseUrl+"/publicaciones",formData)
  }
  getPost(url:string){
    return this.httpClient.get<Publicacion>(url)
  }

  updatePublicacion(idPublicacion:number,formData){
    return this.httpClient.put<Publicacion>(environment.baseUrl+"/publicaciones/"+idPublicacion,formData);
  }
}
