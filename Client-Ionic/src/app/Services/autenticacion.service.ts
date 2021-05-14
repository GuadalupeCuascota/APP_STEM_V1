import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Usuario} from '../Models/usuario'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  API_URI='http://192.168.100.10:3000/login';

  constructor(private http: HttpClient,
    private router: Router) { }
  login (usuario:Usuario){
    return this.http.post(`${this.API_URI}`,usuario); 
  }
  
  logOut(){
    localStorage.clear();
    
    this.router.navigate(['/login'])
  }
  loggedIn(){ //metodo que devuelve un tipo boleano en caso de existir o no un token almacenado en el localstorage
    if(localStorage.getItem('Token')){
      
    }
     return  !!localStorage.getItem('Token');
    
  }
 
}
