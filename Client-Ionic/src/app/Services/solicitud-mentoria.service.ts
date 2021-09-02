import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  SolicitudMentoria} from '../Models/solicitudMentoria';

@Injectable({
  providedIn: 'root'
})
export class SolicitudMentoriaService {

  constructor(private httpClient: HttpClient) { }

  getSolicitudesMentoria(){
    return this.httpClient.get<Array<SolicitudMentoria>>(environment.baseUrl+"/solicitudesMentoria");
    }
    getSolicitudMentoria(id_usuario:number){
      return this.httpClient.get<SolicitudMentoria>(environment.baseUrl+"/solicitudesMentoria/"+id_usuario);
    }
    saveSolicitudMentoria(solicitudMentoria:SolicitudMentoria){
      return this.httpClient.post<SolicitudMentoria>(environment.baseUrl+"/solicitudesMentoria/",solicitudMentoria);
    }
    deleteSolicitudMentoria(id_registro_mentoria:number){
      return this.httpClient.delete<SolicitudMentoria>(environment.baseUrl+"/solicitudesMentoria/"+id_registro_mentoria);
    }
    getSolicitudMentoriaUsuario(id_usuario:number){
      return this.httpClient.get<SolicitudMentoria>(environment.baseUrl+"/solicitudesMentoria/"+id_usuario);
    }
}
