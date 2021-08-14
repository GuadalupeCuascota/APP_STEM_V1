import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {Usuario} from '../Models/usuario'
import {Router} from '@angular/router'
import { environmentLogin } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient,
    private router: Router) { }
  login (usuario:Usuario){
    return this.http.post(environmentLogin.baseUrl,usuario); 
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
