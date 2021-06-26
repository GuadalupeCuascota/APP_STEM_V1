import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Carrera} from '../Models/carreras';

@Injectable({
  providedIn: 'root'
})
export class ResgitroCarrerasService {
  API_URI='http://localhost:3000/api';
  
  

  constructor(private http: HttpClient) { }

  getCarreras (){
    return this.http.get(`${this.API_URI}/carrerasFica`);
  
  }
  
  getCarrera (id:String){
    return this.http.get(`${this.API_URI}/carrerasFica/${id}`);
  
  }
  saveCarrera (carrera:Carrera){
    return this.http.post(`${this.API_URI}/usuarios`,carrera);
  
  }
  deleteCarrera (id:String){
    return this.http.delete(`${this.API_URI}/carrerasFica/${id}`);
  
  }
updateCarrera (id:String, updateCarrera:Carrera){
    return this.http.put(`${this.API_URI}/carrerasFica/${id}`,updateCarrera);
  
  }
}
