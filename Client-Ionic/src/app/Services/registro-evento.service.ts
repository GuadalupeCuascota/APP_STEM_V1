import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Evento } from '../Models/evento';
@Injectable({
  providedIn: 'root'
})
export class RegistroEventoService {

  constructor(private httpClient: HttpClient) { }
  getEventos(){
    return this.httpClient.get<Array<Evento>>(environment.baseUrl+"/registro_evento");
    }
    getEvento(idEvento:number){
      return this.httpClient.get<Evento>(environment.baseUrl+"/registro-evento/"+idEvento);
    }
    saveEvento(evento:Evento){
      return this.httpClient.post<Evento>(environment.baseUrl+"/registro-evento/",evento);
    }
    deleteEvento(idEvento:number){
      return this.httpClient.delete<Evento>(environment.baseUrl+"/usuarios/"+idEvento);
    }
}
