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
        pregunta:'Me gustaria que mi trabajo sirviese para?...',
        opciones:[
          {
            opcion:'Mejorar la vida de las personas ',
            puntos:0
          },
          {
            opcion:'Construir un mundo mejor ',
            puntos:0
          }
         
        ]
      },{
        pregunta:'Cual de estas crees que es tu mejor cualidad...',
        opciones:[
          {
            opcion:'Mi lógica ',
            puntos:0
          },
          {
            opcion:'Construir un mundo mejor ',
            puntos:0
          }
         
        ]
      },{
        pregunta:'Cual es tu eleccion futura...',
        opciones:[
          {
            opcion:'A ',
            puntos:0
          },
          {
            opcion:'B',
            puntos:0
          }
         
        ]
      }
    ]
  getTest(){
    return  this.test
  }
}
