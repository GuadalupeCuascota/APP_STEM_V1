import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
//importar el módulo encargado de realizar peticiones http
import{HttpClient} from '@angular/common/http'
import {Usuario} from '../Models/usuario'


@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  API_URI='http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsuarios (){
    return this.http.get(`${this.API_URI}/usuarios`);
  
  }
  getUsuario (id:String){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  
  }
  saveUsuario (usuario:Usuario){
    return this.http.post(`${this.API_URI}/usuarios`,usuario);
  
  }
  deleteUsuario (id:String){
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  
  }
updateUsuario (id:number, updateUsuario:Usuario){
    return this.http.put(`${this.API_URI}/usuarios/${id}`,updateUsuario);
  
  }
}
