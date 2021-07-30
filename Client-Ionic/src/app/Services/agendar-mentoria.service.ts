import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AgendarMentoria } from '../Models/agendarMentoria';

@Injectable({
  providedIn: 'root'
})
export class AgendarMentoriaService {

  constructor(private httpClient: HttpClient) { }
  getAgendarMentorias(){
    return this.httpClient.get<Array<AgendarMentoria>>(environment.baseUrl+"/agendarMentoria");
    }
    getAgendarMentoria(id_agendamiento_mentoria:number){
      return this.httpClient.get<AgendarMentoria>(environment.baseUrl+"/agendarMentoria/"+id_agendamiento_mentoria);
    }
    saveAgendarMentoria(agendarMentoria:AgendarMentoria){
      return this.httpClient.post<AgendarMentoria>(environment.baseUrl+"/agendarMentoria/",agendarMentoria);
    }
    deleteAgendarMentoria(id_agendamiento_mentoria:number){
      return this.httpClient.delete<AgendarMentoria>(environment.baseUrl+"/agendarMentoria/"+id_agendamiento_mentoria);
    }
}
