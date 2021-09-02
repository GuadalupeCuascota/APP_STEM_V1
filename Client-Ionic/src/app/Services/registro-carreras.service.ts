import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carreras } from '../Models/carreras-fica';
import { CarrerasEstudiante} from '../Models/CarreraEstudiante';



@Injectable({
  providedIn: 'root'
})
export class RegistroCarrerasService {

  constructor(private httpClient: HttpClient) { }
  getCarreras(){
    return this.httpClient.get<Array<Carreras>>(environment.baseUrl+"/carrerasFica");
    }
    getCarrera(idCarrera:number){
      return this.httpClient.get<Carreras>(environment.baseUrl+"/carrerasFica/"+idCarrera);
    }
    saveCarrera(carrera:Carreras){
      return this.httpClient.post<Carreras>(environment.baseUrl+"/carrerasFica/",carrera);
    }
    deleteCarrera(idCarrera:number){
      return this.httpClient.delete<Carreras>(environment.baseUrl+"/carrerasFica/"+idCarrera);
    }
    getMateriaEstudiante(nombre_carrera:string){

      return this.httpClient.get<Array<CarrerasEstudiante>>(environment.baseUrl+"/materiasEstudiante/"+nombre_carrera);

    }
}
