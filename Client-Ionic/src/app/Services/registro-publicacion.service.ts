import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Publicacion} from '../Models/publicacion'


@Injectable({
  providedIn: 'root'
})
export class RegistroPublicacionService {

  constructor(private httpClient: HttpClient) { }
  getUsuarios(){
    return this.httpClient.get<Array<Publicacion>>(environment.baseUrl+"/publicaciones");
    }
}
