import { Injectable } from '@angular/core';
import { from } from 'rxjs';
//importar el módulo encargado de realizar peticiones http
import{HttpClient} from '@angular/common/http'
import { UsuarioListComponent } from '../Components/usuario-list/usuario-list.component';

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  API_URI='http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getUsuarios (){
    return this.http.get(`${this.API_URI}/usuarios`);
  
  }
}
