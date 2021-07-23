import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }
  getUsuarios(){
  return this.httpClient.get<Array<Usuario>>(environment.baseUrl+"/usuarios");
  }
  getUsuario(idUsuario:number){
    return this.httpClient.get<Usuario>(environment.baseUrl+"/usuarios/"+idUsuario);
  }
  saveUsuario(usuario:Usuario){
    return this.httpClient.post<Usuario>(environment.baseUrl+"/usuarios/",usuario);
  }
  deleteUsuario(idUsuario:number){
    return this.httpClient.delete<Usuario>(environment.baseUrl+"/usuarios/"+idUsuario);
  }
  updateUsuario(idUsuario:number,usuario:Usuario){
    return this.httpClient.put<Usuario>(environment.baseUrl+"/usuarios/"+idUsuario,usuario);
  }
  
}
