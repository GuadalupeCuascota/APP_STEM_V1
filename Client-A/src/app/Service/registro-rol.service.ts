import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Rol} from '../Models/rol';
@Injectable({
  providedIn: 'root'
})
export class RegistroRolService {
  API_URI='http://localhost:3000/api';
  constructor( private http:HttpClient) { }
  getRoles(){
    return this.http.get(`${this.API_URI}/roles`);
 
  
  }
  getRol (id:String){
    return this.http.get(`${this.API_URI}/roles/${id}`);
  
  }
  saveRol (rol:Rol){
    return this.http.post(`${this.API_URI}/roles`,rol);
  
  }
  deleteURol (id:String){
    return this.http.delete(`${this.API_URI}/roles/${id}`);
  
  }
  updateRol (id:String, updateRol:Rol){
    return this.http.put(`${this.API_URI}/roles/${id}`,updateRol);
  
  }
}
