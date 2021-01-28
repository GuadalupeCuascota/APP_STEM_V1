import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Archivo} from '../Models/archivo'

@Injectable({
  providedIn: 'root'
})
export class RegistroArchivoService {
  API_URI='http://localhost:3000/api';
  
  constructor(private http:HttpClient) { }
  getArchivos (){
    return this.http.get(`${this.API_URI}/archivos`);
  
  }
  
  getArchivo (id:String){
    return this.http.get(`${this.API_URI}/archivos/${id}`);
  
  }
  saveArchivo (formData){
    
    return this.http.post(`${this.API_URI}/archivos`,formData);
  
  }
  deleteArchivo (id:String){
    return this.http.delete(`${this.API_URI}/archivo/${id}`);
  
  }
updateUsuario (id:number, updateArcivo:Archivo){
    return this.http.put(`${this.API_URI}/usuarios/${id}`,updateArcivo);
  
  }
  
  

  
}
