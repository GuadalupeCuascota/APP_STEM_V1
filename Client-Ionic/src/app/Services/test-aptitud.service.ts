import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { testAptitud } from '../Models/testAptitud';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestAptitudService {



  constructor(private httpClient: HttpClient) { }
  gettest(){
    return this.httpClient.get<Array<testAptitud>>(environment.baseUrl+"/testAptitud")
  
    }
  
    
   
    test: testAptitud[]=[
      {
        pregunta:'Me gusta todo aquello exacto que se puede tocar.',
        carrera:'Textil',
        opciones:[
          {
            opcion:'Sí, todo lo tangible.',
            puntos:20,
            id_opcion: 1
          },
          {
            opcion:'No es importante para mí que se pueda tocar ',
            puntos:10,
            id_opcion: 2
          },
          {
            opcion:'No, no es necesario para mí',
            puntos:5,
            id_opcion: 3
          },
        ]
      },{
        pregunta:'Me gusta trabajar con calculadoras y entretenerme con juegos electrónicos',
        carrera:'Electricidad',
        opciones:[
          {
            opcion:'Si ',
            puntos:20,
            id_opcion: 1

          },
          {
            opcion:'No',
            puntos:5,
            id_opcion: 2
            


          }
         
        ]
      },{
        pregunta:'Me gusta involucrarme con la evaluación de forma eficiente la fabricación de productos y prestación de servicios.',
        carrera:'Industrial',
        opciones:[
          {
            opcion:'Si',
            puntos:20,
            id_opcion: 1
          },
          {
            opcion:'No',
            puntos:5,
            id_opcion: 2
          }
         
        ]
      }
    ]
  getTest(){
    return  this.test
  }
}
