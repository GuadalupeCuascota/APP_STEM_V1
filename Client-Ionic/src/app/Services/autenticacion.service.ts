import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Usuario} from '../Models/usuario'

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  API_URI='http://localhost:3000/login';

  constructor(private http: HttpClient) { }
  login (usuario:Usuario){
    return this.http.post(`${this.API_URI}`,usuario); 
  }
}
