import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  RegistroMentorias} from '../Models/registro-mentorias';

@Injectable({
  providedIn: 'root'
})
export class RegistroMentoriasService {

  constructor(private httpClient: HttpClient) { }
  getRegistroMentorias(){
    return this.httpClient.get<Array<RegistroMentorias>>(environment.baseUrl+"/registro-mentorias");
    }
    getRegistroMentoria(id_registro_mentoria:number){
      return this.httpClient.get<RegistroMentorias>(environment.baseUrl+"/registro-mentorias/"+id_registro_mentoria);
    }
    saveRegistroMentorias(registroMentoria:RegistroMentorias){
      return this.httpClient.post<RegistroMentorias>(environment.baseUrl+"/registro-mentorias/",registroMentoria);
    }
    deleteRegistroMentorias(id_registro_mentoria:number){
      return this.httpClient.delete<RegistroMentorias>(environment.baseUrl+"/registro-mentorias/"+id_registro_mentoria);
    }
    getRegistroMentoriasUsuario(id_usuario:number){
      return this.httpClient.get<RegistroMentorias>(environment.baseUrl+"/mentoriaUsuario/"+id_usuario);
    }
}
