import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Usuario} from '../../Administrador/Models/usuario'
import {Router} from '@angular/router'
import { JwtHelperService } from "@auth0/angular-jwt";
const helper=new JwtHelperService

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI='http://localhost:3000/login';
  constructor(private http: HttpClient,
    private router: Router) { }

  login (usuario:Usuario){
    return this.http.post(`${this.API_URI}`,usuario); 
  }

  loggedIn(){ //metodo que devuelve un tipo boleano en caso de existir o no un token almacenado en el localstorage
    if(localStorage.getItem('token')){
      
      
    }
     return  !!localStorage.getItem('token');

  }
  logOut(){
    localStorage.clear();
   
    this.router.navigate(['/login'])
  }
 
  getToken(){
    return localStorage.getItem('token')
  }
  }
